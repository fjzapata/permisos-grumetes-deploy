import api from "../api/apiConnet";
import { useAuthStore } from "../store/authStore";
import {  useQuery } from "@tanstack/react-query";

const token = useAuthStore.getState().token;
export const fetchRequest = async () => {
  const { data } = await api.get("/api/request", {
    withCredentials: true,
    headers: {
      "x-access-token": token,
    },
  });

  return data;
};

export const createRequest = async(
  nombre: string,
  departamento: string,
  division: string,
  lugar: string,
  objeto: string,
  grado: string,
  asunto: string,
  guardia: string,
  tiempoDesde: string,
  hasta: string
) => {
   return await api.post("api/request", {
    nombre,
    departamento,
    division,
    lugar,
    objeto,
    grado,
    asunto,
    guardia,
    tiempoDesde,
    hasta,
  }, {
    withCredentials: true,
    headers: {
        "x-access-token": token
    }
  });
};

export const deleteRequest = async(id:string) => {
  return await api.delete(`api/request/${id}`, {
    withCredentials: true,
    headers: {
      "x-access-token" : token
    }
  })
}

export const aprobarRequest = async(id:string, estado:string) => {
  const { data } = await api.put(`api/request/${id}`, {
    estado,
  },
  {
    withCredentials: true,
    headers: {
      "x-access-token": token
    }
  } 
  )
  return data
}



export const useFetchRequest = () => {
  return useQuery(["request"], fetchRequest);
};

export const useDeleteRequest = () => {
  return useQuery
}
