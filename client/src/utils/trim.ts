/* eslint-disable import/prefer-default-export */
export function trim(str: string, maxLength: number): string {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}
