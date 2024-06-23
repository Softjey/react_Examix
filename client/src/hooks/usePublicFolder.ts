export default function usePublicFolder(dynamicPath: string) {
  const assets = import.meta.glob('/public/**/*.gif', { eager: true });
  const gifSrc = `/public/${dynamicPath}`;
  const gif = assets[gifSrc] as { default: string };

  return gif.default;
}
