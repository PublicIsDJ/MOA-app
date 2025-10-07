import React from 'react'

type CardComp = React.LazyExoticComponent<React.ComponentType>

// Use Vite's import.meta.glob to create a stable map of all card modules at build time.
const modules = import.meta.glob('../ui/cards/CD-*.tsx')

// Build registry: key is slug (e.g., CD-001), value is lazy component
export const cardRegistry: Record<string, CardComp> = Object.fromEntries(
  Object.keys(modules).map((path) => {
    const file = path.split('/').pop() || ''
    const slug = file.replace('.tsx', '').toUpperCase()
    const loader = modules[path] as () => Promise<{ default: React.ComponentType }>
    return [slug, React.lazy(loader)]
  }),
) as Record<string, CardComp>
