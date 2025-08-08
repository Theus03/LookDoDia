import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Looks from './pages/Looks'
import Configuration from './pages/Configuration'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/looks' element={<Looks />}></Route>
        <Route path='/configuration' element={<Configuration />}></Route>
      </Routes>
    </Router>
  )
}

