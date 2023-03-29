import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/prueba6.png";
import { loginRequest } from '../api/auth'
import {useAuthStore} from '../store/authStore'


export const LoginAdmin = () => {

  const setToken = useAuthStore(state => state.setToken)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cedula = (e.currentTarget.elements[0] as HTMLInputElement).valueAsNumber
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value

    const resLogin = await loginRequest(cedula, password)
    setToken(resLogin.data.token)

    navigate('/dashboard')

    setTimeout(() => {
      logout()
      navigate('/login-admin')
    }, 1800000)

    // const resProfile = await listRequest()
    // console.log(resProfile)
    
  }

  return (
    <div className="flex min-h-full items-center mt-8 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Ingresa en tu cuenta de Administrador
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="cedula">
              <label htmlFor="cedula" className="sr-only">
                Cedula
              </label>
              <input
                id="cedula"
                name="cedula"
                type="number"
                required
                className="cedula relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Cedula"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-center ">
            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};