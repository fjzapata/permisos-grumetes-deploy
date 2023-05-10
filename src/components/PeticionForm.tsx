import { createRequest, getReqAdmin } from '../hooks/useRequest'
import Swal from 'sweetalert2'
import { useAuthStore } from '../store/authStore';
import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';

export const PeticionForm = () => {

  const initialStateValues = {
    departamento: '',
    division: '',
    lugar: '',
    objeto: '',
    grado: '',
    asunto: '',
    guardia: '',
    admin: 0
  }

  const [dataAdmin, setDataAdmin] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any>({})
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? dataAdmin
      : dataAdmin.filter((person) => {
        return person.username.toLowerCase().includes(query.toLowerCase())
      })

  /**
   * OBTENER LISTADO DE ADMINISTRADORES.
   */
  const getDataAdmin = async () => {
    try {
      const resRequest: any = await getReqAdmin();

      console.log(resRequest.data)

      setDataAdmin(resRequest.data);

    } catch (error) {
      console.log(error)
    }
  }

  const username = useAuthStore((state: any) => state.username)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const nombre = (e.currentTarget.elements[0] as HTMLInputElement).value
    const departamento = (e.currentTarget.elements[1] as HTMLInputElement).value
    const division = (e.currentTarget.elements[2] as HTMLInputElement).value
    const lugar = (e.currentTarget.elements[3] as HTMLInputElement).value
    const objeto = (e.currentTarget.elements[4] as HTMLInputElement).value
    const grado = (e.currentTarget.elements[5] as HTMLInputElement).value
    const asunto = (e.currentTarget.elements[6] as HTMLInputElement).value
    const guardia = (e.currentTarget.elements[7] as HTMLInputElement).value
    const tiempoDesde = (e.currentTarget.elements[9] as HTMLInputElement).value
    const hasta = (e.currentTarget.elements[10] as HTMLInputElement).value

    try {
      const resFormRequest = await createRequest(nombre, departamento, division, lugar, objeto, grado, asunto,
        guardia, tiempoDesde, hasta, (selectedPerson?._id || ''))
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Peticion creada con exito'
      })

    } catch (error: any) {
      if (error.response) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: error.response.data.message
        })
      }
    }

  }

  useEffect(() => {
    getDataAdmin();
  }, []);

  return (
    <div className="border-b border-gray-900/10 pb-12 m-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion de Permiso</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">La informacion proporcionada debe ser verídica</p>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Nombre Completo
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              name="name"
              id="name"
              disabled
              value={username}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="departamento" className="block text-sm font-medium leading-6 text-gray-900">
            Departamento
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              name="departamento"
              id="departamento"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="division" className="block text-sm font-medium leading-6 text-gray-900">
            Divison
          </label>
          <div className="mt-2">
            <input
              id="division"
              name="division"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lugar" className="block text-sm font-medium leading-6 text-gray-900">
            Lugar
          </label>
          <div className="mt-2">
            <input
              id="lugar"
              name="lugar"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="objeto" className="block text-sm font-medium leading-6 text-gray-900">
            Objeto
          </label>
          <div className="mt-2">
            <input
              id="objeto"
              name="objeto"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="grado" className="block text-sm font-medium leading-6 text-gray-900">
            Grado
          </label>
          <div className="mt-2">
            <input
              id="grado"
              name="grado"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="asunto" className="block text-sm font-medium leading-6 text-gray-900">
            Asunto
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              name="asunto"
              id="asunto"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="guardia" className="block text-sm font-medium leading-6 text-gray-900">
            Guardia
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              name="guardia"
              id="guardia"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="guardia" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Solicitado a:
          </label>
          <Combobox value={selectedPerson?.username || ''} onChange={setSelectedPerson}>
            <Combobox.Input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
              onChange={(event) => setQuery(event.target.value)} />
            <Combobox.Options>
              {filteredPeople.map((person) => (
                <Combobox.Option key={person._id} value={person}>
                  {person.username}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="desde" className="block text-sm font-medium leading-6 text-gray-900">
            Tiempo desde
          </label>
          <div className="mt-2">
            <input
              type="datetime-local"
              required
              name="desde"
              id="desde"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="hasta" className="block text-sm font-medium leading-6 text-gray-900">
            Hasta
          </label>
          <div className="mt-2">
            <input
              type="datetime-local"
              required
              name="hasta"
              id="hasta"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
            />
          </div>
        </div>
        <div className="col-span-full">
          <button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Enviar peticion
          </button>
        </div>
      </form>
    </div>

  )
}