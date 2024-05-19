export function snakeCaseToNormal(str: string) {
  const result = str
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ` ${c.toUpperCase()}`);
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

export function camelCaseToNormal(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

export function formatStringToNumber(str: string) {
  return Number(str.replace(/[^0-9]/g, ''));
}
