function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function getPageItems(currentPage, totalPages, siblingCount = 1) {
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
