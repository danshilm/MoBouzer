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
    `bus-line/${id}`
  ) as FirebaseFirestore.DocumentReference<AdminBusLine.DocumentData>;

  const dataToUpdate: Partial<AdminBusLine.DocumentData> = {
    id,
  };

  try {
    const forwardDirectionRelationId = getForwardDirectionRelationId(busLineData);
    const relationData =
      direction === 'forward'
        ? (busLineData.find((v) => v.id === forwardDirectionRelationId) as RelationElement)
        : (busLineData.find(
            (v) => v.type === 'relation' && v.id !== forwardDirectionRelationId
          ) as RelationElement);

    if (toUpdate === 'busStops' || toUpdate === 'both') {
      let busStopsToUpdate = dataToUpdate.direction?.[direction]['bus-stops'];

      if (busStopsToUpdate) {
        busStopsToUpdate = relationData.members
          .filter((element) => element.type === ElementType.Node)
          .map((nodeElement) => {
            const nodeDetails = busLineData.find(
              (element) => element.type === ElementType.Node && element.id === nodeElement.ref
            ) as NodeElement;

            return {
              id: nodeElement.ref.toString(),
              location: new GeoPoint(nodeDetails.lat, nodeDetails.lon),
              ref: firebaseStore.doc(`bus-stop/${nodeElement.ref.toString()}`),
              name: nodeDetails.tags?.name,
            };
          });
      }

      spinner
        .info(`${busStopsToUpdate?.length ?? 0} bus stops will be added to the ${id} bus line`)
        .start('Working...');
    }

    if (toUpdate === 'ways' || toUpdate === 'both') {
      let waysToUpdate = dataToUpdate.direction?.[direction]['ways'];

      if (waysToUpdate) {
        waysToUpdate = relationData.members
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
      }

      spinner
        .info(`${waysToUpdate?.length ?? 0} ways will be added to the ${id} bus line`)
        .start('Working...');
    }

    await busLineRef.set(dataToUpdate as AdminBusLine.DocumentData);
    spinner.succeed('Done');
  } catch (error) {
    spinner.fail(`Failed to update ${id} bus line: ${error}`);
  }
};

export default updateBusLine;
