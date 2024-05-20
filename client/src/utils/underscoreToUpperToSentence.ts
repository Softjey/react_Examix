export default function underscoreToUpperToSentence(text: string): string {
  let convertedText = text.replace(/_/g, ' ').toLowerCase();

  convertedText = convertedText.charAt(0).toUpperCase() + convertedText.slice(1);

  return convertedText;
}
