import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Home/>    
    </div>
  )
}

export default App
