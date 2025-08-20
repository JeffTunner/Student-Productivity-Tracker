import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TrackerProvider } from './context/TrackerContext.jsx'
import { JournalMoodProvider } from './context/JournalMoodContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <TrackerProvider>
    <JournalMoodProvider>
      <App />
    </JournalMoodProvider>
    </TrackerProvider>
  </StrictMode>
)
