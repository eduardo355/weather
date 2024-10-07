export function convertMphToKmh(mph: number) {
  const kmh = mph * 1.60934
  return kmh.toFixed(2)
}
