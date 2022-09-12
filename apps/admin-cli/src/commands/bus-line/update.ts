import type { AdminBusLine } from '@mobouzer/shared';
import { GeoPoint } from 'firebase-admin/firestore';
import { getBusLine } from '../../api/overpass';
import { firebaseStore } from '../../firebase/config';
import type { NodeElement, RelationElement, WayElement } from '../../interfaces/overpass';
import { ElementType } from '../../interfaces/overpass';
import { getForwardDirectionRelationId } from '../../utils/bus-line';
import ora from '../../utils/ora';

const updateBusLine = async ({
  id,
  direction,
  options,
}: {
  id: string;
  direction: 'forward' | 'reverse';
  options: {
    busStops: boolean;
    ways: boolean;
  };
}) => {
  const spinner = ora('Working...').start();

  const toUpdate =
    !options.ways && !options.busStops
      ? 'both'
      : options.ways && !options.busStops
      ? 'ways'
      : !options.ways && options.busStops
      ? 'busStops'
      : 'both';

  const busLineData = await getBusLine(id);

  if (busLineData.length === 0) {
    return spinner.fail(`No bus lines with the id ${id} can be found`);
  }

  const busLineRef = firebaseStore.doc(
    `bus-lines/${id}`
  ) as FirebaseFirestore.DocumentReference<AdminBusLine.DocumentData>;

  try {
    const forwardDirectionRelationId = getForwardDirectionRelationId(busLineData);
    const relationData =
      direction === 'forward'
        ? (busLineData.find((v) => v.id === forwardDirectionRelationId) as RelationElement)
        : (busLineData.find(
            (v) => v.type === ElementType.Relation && v.id !== forwardDirectionRelationId
          ) as RelationElement);

    if (toUpdate === 'busStops' || toUpdate === 'both') {
      const updatedBusLineStops = relationData.members
        .filter((element) => element.type === ElementType.Node)
        .map((nodeElement) => {
          const nodeDetails = busLineData.find(
            (element) => element.type === ElementType.Node && element.id === nodeElement.ref
          ) as NodeElement;

          return {
            id: nodeElement.ref.toString(),
            location: new GeoPoint(nodeDetails.lat, nodeDetails.lon),
            ref: firebaseStore.doc(`bus-stops/${nodeElement.ref.toString()}`),
            name: nodeDetails.tags?.name,
          };
        });

      const firstBusStop = updatedBusLineStops[0];
      const lastBusStop = updatedBusLineStops[updatedBusLineStops.length - 1];

      const origin: AdminBusLine.DocumentDirectionData['origin'] = {
        id: firstBusStop.id,
        name: relationData.tags.from ?? firstBusStop.name ?? 'Unknown',
        ref: firebaseStore.doc(`bus-stops/${firstBusStop.id}`),
      };

      const destination: AdminBusLine.DocumentDirectionData['destination'] = {
        id: lastBusStop.id,
        name: relationData.tags.to ?? lastBusStop.name ?? 'Unknown',
        ref: firebaseStore.doc(`bus-stops/${lastBusStop.id}`),
      };

      spinner
        .info(`${updatedBusLineStops.length} bus stops will be added to the ${id} bus line`)
        .start('Working...');

      await Promise.all([
        busLineRef.update(`direction.${direction}.bus-stops`, updatedBusLineStops),
        busLineRef.update(`direction.${direction}.origin`, origin),
        busLineRef.update(`direction.${direction}.destination`, destination),
      ]);
    }

    if (toUpdate === 'ways' || toUpdate === 'both') {
      const updatedBusLineWays = relationData.members
        .filter((element) => element.type === ElementType.Way)
        .map((wayElement) => {
          const wayDetails = busLineData.find(
            (element) => element.type === ElementType.Way && element.id === wayElement.ref
          ) as WayElement;

          const nodesDetails = wayDetails.nodes.map((nodeId) =>
            busLineData.find((elem) => elem.type === ElementType.Node && elem.id === nodeId)
          ) as NodeElement[];

          return {
            id: wayElement.ref.toString(),
            nodes: nodesDetails.map((node) => ({
              id: node.id.toString(),
              location: new GeoPoint(node.lat, node.lon),
            })),
          };
        });

      spinner
        .info(`${updatedBusLineWays.length} ways will be set for the ${id} bus line`)
        .start(`Working...`);

      await busLineRef.update(`direction.${direction}.ways`, updatedBusLineWays);
    }

    spinner.succeed('Done');
  } catch (error) {
    spinner.fail(`Failed to update ${id} bus line: ${error}`);
  }
};

export default updateBusLine;
