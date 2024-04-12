interface LatLng {
  myLat: number;
  myLng: number;
  targetLat: number;
  targetLng: number;
}

export function calculateDistance({
  myLat,
  myLng,
  targetLat,
  targetLng,
}: LatLng): number {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const earthRadius = 6371; // 지구 반지름(km)

  const dLat = toRadian(targetLat - myLat);
  const dLng = toRadian(targetLng - myLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(myLat)) *
      Math.cos(toRadian(targetLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c; // 결과는 킬로미터 단위로 반환
}
