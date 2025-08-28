import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TrackerProvider } from './context/TrackerContext.jsx'
import { JournalMoodProvider } from './context/JournalMoodContext.jsx'
import { AiProvider } from './context/AiContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>   
    <TrackerProvider>
    <JournalMoodProvider>
      <AiProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AiProvider>      
    </JournalMoodProvider>
    </TrackerProvider>
  </StrictMode>
)
