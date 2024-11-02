import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import './App.css'
import Dashboard from './pages/Dashboard'
import ViewCard from './pages/ViewCard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cards/:id" element={<ViewCard />} />
      </Routes>
    </>
  )
}

export default App
