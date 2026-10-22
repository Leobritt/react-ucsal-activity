// Cria uma lista de números de "start" até "end" (inclusive): range(2, 5) → [2, 3, 4, 5]
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

/**
 * Decide quais botões de página mostrar.
 * Com poucas páginas, mostra todas. Com muitas, mostra a primeira, a última,
 * a atual com seus vizinhos e reticências no meio: 1 … 4 5 6 … 12
 */
export function getPageItems(currentPage, totalPages, siblingCount = 1) {
  // primeira + última + atual + 2 vizinhos + 2 reticências
  const maxVisibleItems = siblingCount * 2 + 5

  if (totalPages <= maxVisibleItems) {
    return range(1, totalPages)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)
  const showStartEllipsis = leftSibling > 2
  const showEndEllipsis = rightSibling < totalPages - 1
  const edgeRangeSize = 3 + siblingCount * 2

  if (!showStartEllipsis && showEndEllipsis) {
    return [...range(1, edgeRangeSize), 'end-ellipsis', totalPages]
  }

  if (showStartEllipsis && !showEndEllipsis) {
    return [1, 'start-ellipsis', ...range(totalPages - edgeRangeSize + 1, totalPages)]
  }

  return [1, 'start-ellipsis', ...range(leftSibling, rightSibling), 'end-ellipsis', totalPages]
}
