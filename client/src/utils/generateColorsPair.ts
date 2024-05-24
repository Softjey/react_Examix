import getContrastYIQ from './getContrastYIQ';
import stringToColor from './stringToColor';

export default function generateColorsPair(slug: string) {
  const bgColor = stringToColor(slug);
  const textColor = getContrastYIQ(bgColor);

  return [bgColor, textColor] as const;
}
