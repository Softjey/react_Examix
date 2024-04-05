import { Transform } from 'class-transformer';

export function TransformToArray() {
  return Transform(({ value }) => (Array.isArray(value) ? value : [value]), { toClassOnly: true });
}
