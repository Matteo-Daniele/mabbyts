import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          <Route path='/login' element={<LoginPage />}></Route>

          <Route path='/dashboard' element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }></Route>

          <Route path='*' element={<Navigate to="/login" replace />}></Route>

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
