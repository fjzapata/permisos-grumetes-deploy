import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import { Dashboard } from './pages/Dashboard'
import { Permisos } from './pages/Permisos'
import { LoginAdmin } from './pages/LoginAdmin'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import {useAuthStore} from './store/authStore'

function App() {

  const isAuth = useAuthStore(state => state.isAuth)

  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/login-admin' element={<LoginAdmin/>} />
        <Route path='/register' element={<Register/>} />

        <Route element={<ProtectedRoutes isAllowed={isAuth}/>}>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/permisos' element={<Permisos/>} />
        </Route>

        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
