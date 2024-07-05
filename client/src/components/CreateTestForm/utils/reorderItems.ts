export default function reorderItems<T>(items: T[], indexToMove: number, targetIndex: number) {
  const itemToMove = items[indexToMove];
  const itemsWithoutItemToMove = items.filter((_, index) => index !== indexToMove);

  return [
    ...itemsWithoutItemToMove.slice(0, targetIndex),
    itemToMove,
    ...itemsWithoutItemToMove.slice(targetIndex),
  ];
}
