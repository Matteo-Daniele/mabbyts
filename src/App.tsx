import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HabitPage from './pages/HabitPage'

function App() {

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

          <Route path='/habits' element={

            <ProtectedRoute>

              <HabitPage />

            </ProtectedRoute>

          }></Route>

          <Route path='/register' element={<RegisterPage />}></Route>

          <Route path='*' element={<Navigate to="/login" replace />}></Route>

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
