import type { AdminBusLine } from '@mobouzer/shared';
import { GeoPoint } from 'firebase-admin/firestore';
import { set } from 'lodash';
import { getBusLine } from '../../api/overpass';
import { firebaseStore } from '../../firebase/config';
import type { NodeElement, RelationElement, WayElement } from '../../interfaces/overpass';
import { ElementType } from '../../interfaces/overpass';
import { getForwardDirectionRelationId } from '../../utils/bus-line';
import ora from '../../utils/ora';
import updateAggregateBusLine from './updateAll';

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

  // by default, update both the bus-stops and ways
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
    return spinner.fail(`No bus line ${id} can be found`);
  }

  const busLineRef = firebaseStore.doc(
    `bus-lines/${id}`
  ) as FirebaseFirestore.DocumentReference<AdminBusLine.DocumentData>;

  const isNewBusLine = !(await busLineRef.get()).exists;

  // set the id here since new bus lines won't have any data in their document
  const updatedData = { id };
  // use this to force the individual bus-stop/way entries to be replaced,
  // but keep the "top" level keys
  const mergeFields: string[] = ['id'];

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
        .info(`${updatedBusLineStops.length} bus stops will be added to the bus line ${id}`)
        .start('Working...');

      set(updatedData, `direction.${direction}.bus-stops`, updatedBusLineStops);
      set(updatedData, `direction.${direction}.origin`, origin);
      set(updatedData, `direction.${direction}.destination`, destination);

      mergeFields.push(
        `direction.${direction}.bus-stops`,
        `direction.${direction}.origin`,
        `direction.${direction}.destination`
      );
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
        .info(`${updatedBusLineWays.length} ways will be set for the bus line ${id}`)
        .start(`Working...`);

      set(updatedData, `direction.${direction}.ways`, updatedBusLineWays);

      mergeFields.push(`direction.${direction}.ways`);
    }

    await busLineRef.set(updatedData as AdminBusLine.DocumentData, {
      mergeFields: mergeFields,
    });

    if (isNewBusLine) {
      spinner
        .info(`Bus line ${id} is a new bus line, also updating the aggregate doc`)
        .start('Working...');
      await updateAggregateBusLine({ force: false });
    }

    spinner.succeed('Done');
  } catch (error) {
    spinner.fail(`Failed to update bus line ${id}: ${error}`);
  }
};

export default updateBusLine;
