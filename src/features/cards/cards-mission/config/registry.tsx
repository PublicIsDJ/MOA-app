import React from 'react'

type CardComp = React.LazyExoticComponent<React.ComponentType>

function lazyCard(slug: string): CardComp {
  // Dynamic import per card for code-splitting
  return React.lazy(() => import(`../ui/cards/${slug}.tsx`))
}

// Register all 15 cards (CD-001 .. CD-015)
export const cardRegistry: Record<string, CardComp> = {
  'CD-001': lazyCard('CD-001'),
  'CD-002': lazyCard('CD-002'),
  'CD-003': lazyCard('CD-003'),
  'CD-004': lazyCard('CD-004'),
  'CD-005': lazyCard('CD-005'),
  'CD-006': lazyCard('CD-006'),
  'CD-007': lazyCard('CD-007'),
  'CD-008': lazyCard('CD-008'),
  'CD-009': lazyCard('CD-009'),
  'CD-010': lazyCard('CD-010'),
  'CD-011': lazyCard('CD-011'),
  'CD-012': lazyCard('CD-012'),
  'CD-013': lazyCard('CD-013'),
  'CD-014': lazyCard('CD-014'),
  'CD-015': lazyCard('CD-015'),
}

