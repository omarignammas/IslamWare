import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import IslamWareLanding from './pages/IslamWareLanding'
import './App.css'

function App() {

  return (

       <BrowserRouter>
        <ThemeProvider>

          <Routes>
            <Route path="/" element={<IslamWareLanding />} />
          </Routes>

        </ThemeProvider>

      </BrowserRouter>
  )
}

export default App
