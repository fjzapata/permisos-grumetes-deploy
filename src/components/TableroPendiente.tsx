import {
  aprobarRequest,
  deleteRequest,
  useFetchRequest,
} from "../hooks/useRequest";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/authStore";

const tableEmty = [
  {
    id: "1",
    header: "Nombre",
  },
  {
    id: "2",
    header: "Departamento",
  },
  {
    id: "3",
    header: "Division",
  },
  {
    id: "4",
    header: "Grado",
  },
  {
    id: "5",
    header: "Estado",
  },
  {
    id: "6",
    header: "Fecha",
  },
  {
    id: "7",
    header: "Asunto",
  },
  {
    id: "8",
    header: "Objeto",
  },
  {
    id: "9",
    header: "Lugar",
  },
  {
    id: "10",
    header: "Tiempo desde",
  },
  {
    id: "11",
    header: "Hasta",
  },
  {
    id: "12",
    header: "No. Peticion",
  },
];

export const TableroPendiente = () => {
  const { data, isLoading, isError, error } = useFetchRequest();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(error);
  const username = useAuthStore.getState().username;
  
 
  const levelBadge = (state: string) => {
    if (state === "Aprobado") {
      return (
        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
           Aprobado
        </span>
      );
    } else if (state === "Denegado") {
      return (
        
        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
          Denegado
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
         'Pendiente'
        </span>
      );
    }
  };

  const filtro = data?.filter((request: any) => request.estado === 'Pendiente');

  

  return (
    <section className="container mx-auto p-5 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                {tableEmty.map((map) => (
                  <th key={map.id} className="px-4 py-3">
                    {map.header}
                  </th>
                ))}
                <th>Decisión</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtro.map((request: any) => (
                <tr key={request._id} className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">
                          {request.nombre}{" "}
                        </p>
                        <p className="text-xs text-gray-600">
                          Guardia {request.guardia}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {request.departamento}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {request.division}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {request.grado}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {levelBadge(request.estado)}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {request.createdAt}
                  </td>
                  <td className="px-4 py-3 text-sm border">{request.asunto}</td>
                  <td className="px-4 py-3 text-sm border">{request.objeto}</td>
                  <td className="px-4 py-3 text-sm border">{request.lugar}</td>
                  <td className="px-4 py-3 text-sm border">
                    {request.tiempoDesde}
                  </td>
                  <td className="px-4 py-3 text-sm border">{request.hasta}</td>
                  <td className="px-4 py-3 text-sm border">{request._id}</td>
                  <td className="px-4 py-3 text-sm border">
                    <button
                      className="mx-3 hover:text-green-500"
                      onClick={() => {
                        aprobarRequest(request._id, 'Aprobado');
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <button
                      className="mx-3 hover:text-yellow-600"
                      onClick={() => {
                        aprobarRequest(request._id, 'Denegado');
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <button
                      className="mx-3 hover:text-red-500"
                      onClick={() => {
                        Swal.fire({
                          title: "¿Estás seguro?",
                          text: " No podrás revertir esto.!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Eliminar",
                          cancelButtonText: "Cancelar",
                        }).then((result: any) => {
                          if (result.isConfirmed) {
                            deleteRequest(request._id);
                            Swal.fire(
                              "Eliminado",
                              "La petición ha sido eliminada",
                              "success"
                            );
                          }
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
