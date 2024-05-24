/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
const pastel = (value: number) => Math.floor((value + 255) / 2);
const toHex = (value: number) => value.toString(16).padStart(2, '0');

export default function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i);
  }

  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  const pastelR = pastel(r);
  const pastelG = pastel(g);
  const pastelB = pastel(b);

  return `#${toHex(pastelR)}${toHex(pastelG)}${toHex(pastelB)}`;
}
