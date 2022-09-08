import distance from '@turf/distance';
import type { NodeElement, RelationElement, WayElement } from '../interfaces/overpass';
import { ElementType } from '../interfaces/overpass';

const capitalCoordinates = [57.501438, -20.161313];

/**
 * The bus line with its origin closer to the capital is the one that goes
 * in the "forward" direction
 * @param busLineData
 */
export const getForwardDirectionRelationId = (
  busLineData: (RelationElement | NodeElement | WayElement)[]
): number => {
  const busLineDirections = busLineData.filter(
    (element) => element.type === ElementType.Relation
  ) as RelationElement[];

  if (busLineDirections.length < 2) {
    throw new Error('Cannot determine if line is in the forwards direction');
  }

  // todo use a reducer?
  const distancesToCapitalCity = busLineDirections.map((element) => {
    const firstNode = busLineData.find(
      (node) => node.type === ElementType.Node && node.id === element.members[0].ref
    ) as NodeElement;

    if (!firstNode) {
      throw new Error('No coordinates for first node in relation');
    }

    return {
      element,
      distance: distance(capitalCoordinates, [firstNode.lon, firstNode.lat]),
    };
  });

  const forwardDirectionBusLine =
    distancesToCapitalCity[0].distance > distancesToCapitalCity[1].distance
      ? distancesToCapitalCity[1].element
      : distancesToCapitalCity[0].element;

  return forwardDirectionBusLine.id;
};
