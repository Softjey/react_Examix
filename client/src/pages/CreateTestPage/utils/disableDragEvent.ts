export default function disableDragEvent(e: React.DragEvent<HTMLDivElement>) {
  e.preventDefault();
  e.stopPropagation();
}
