import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import PaletteSwitcher from './components/PaletteSwitcher'
import './styles/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* Dev only: compare colour palettes. Not included in production builds. */}
      {import.meta.env.DEV && <PaletteSwitcher />}
    </BrowserRouter>
  </StrictMode>,
)
