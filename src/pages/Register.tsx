import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/prueba6.png";
import { registerRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import Swal from "sweetalert2";
import '../App.css'

export const Register = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUsername = useAuthStore((state) => state.setUsername);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setRole = useAuthStore((state) => state.setRole)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const cedula = (e.currentTarget.elements[1] as HTMLInputElement)
      .valueAsNumber;
    const password = (e.currentTarget.elements[2] as HTMLInputElement).value;

    try {
      const resRegister = await registerRequest(username, cedula, password);
      setToken(resRegister.data.token);
      setUsername(resRegister.data.response.username)
      setRole(resRegister.data.response.idUser)
      setUserId(resRegister.data.response.id);
      navigate("/permisos");
    } catch (error: any) {
      if (error.response) {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    }
  };

  return (
    <div className="flex min-h-full items-center mt-8 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link to="/">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Your Company"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Crea una cuenta
          </h2>

          <form className="mt-8 space-y-6 mb-5" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="cedula" className="sr-only">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Nombre Completo"
                />
              </div>
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
                Crear Cuenta
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 my-4"
            >
              ¿Ya tienes una Cuenta?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
