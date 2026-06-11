import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/i18next.tsx'
import './index.css'

const App = lazy(() => import('./App.tsx'))

document.documentElement.setAttribute('translate', 'no')
document.documentElement.classList.add('notranslate')
document.body.setAttribute('translate', 'no')
document.body.classList.add('notranslate')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
