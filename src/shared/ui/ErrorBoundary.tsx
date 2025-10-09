import React from 'react'

type Props = {
  fallback?: React.ReactNode
  children: React.ReactNode
}

type State = { hasError: boolean; error?: any }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{ padding: 16, color: 'crimson' }}>
          오류가 발생했습니다.
        </div>
      )
    }
    return this.props.children
  }
}

