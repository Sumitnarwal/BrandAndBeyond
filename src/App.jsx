import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Auth from './component/auth/auth'
import { Route, Routes } from 'react-router-dom'
import Profile from './component/profile/Profile'
import AdminPage from './component/admin/admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

    </div>
  )
}

export default App
