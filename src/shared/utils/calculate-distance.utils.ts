// Caculating the distance
export function calculateDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const radiusOfEarth = 6371e3;
  const φ1 = (latitude1 * Math.PI) / 180;
  const φ2 = (latitude2 * Math.PI) / 180;
  const deltaLatitude = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLongitude = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radiusOfEarth * c;

  return Math.round(distance);
}
