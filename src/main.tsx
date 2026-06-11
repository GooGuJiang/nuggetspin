import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/i18next.tsx'
import './index.css'

const App = lazy(() => import('./App.tsx'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
