import { useState } from "react";
import {
  useFetchRequest,
} from "../hooks/useRequest";

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

export const SearchUser = () => {
  const { data, isLoading, isError, error } = useFetchRequest();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(error);

  const levelBadge = (state: string) => {
    if (state === "Aprobado") {
      return (
        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
          Aprobado
        </span>
      );
    } else if (state === "Pendiente") {
      return (
        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
          Pendiente
        </span>
      );
    } else {
      return (
        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
          Denegado
        </span>
      );
    }
  };

  const [search, setSearch] = useState();

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  let result = [];
  if (!search) {
    result = data;
  } else {
    result = data.filter((dato: any) => dato.nombre.includes(search));
  }

  return (
    <section className=" container mx-auto p-5 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <div className="p-4">
            <label htmlFor="table-search" className="sr-only">
              Buscar
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                value={search}
                onChange={handleSearch}
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar peticion"
              />
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                {tableEmty.map((map) => (
                  <th key={map.id} className="px-4 py-3">
                    {map.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {result.map((request: any) => (
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
                  <td className="px-4 py-3 text-sm border"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
