export default function roundToFixedLength(num: number, length: number) {
  if (Number.isInteger(num)) {
    return num;
  }

  const digits = Math.floor(Math.log10(num)) + 1;

  if (digits >= length) {
    return Math.round(num);
  }

  const decimalPlaces = length - digits;
  const factor = 10 ** decimalPlaces;

  return Math.round(num * factor) / factor;
}
