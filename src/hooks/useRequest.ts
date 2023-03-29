import api from "../api/apiConnet";
import { useAuthStore } from "../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { Request } from "./types";

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
  desde: string,
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
    desde,
    hasta,
  }, {
    withCredentials: true,
    headers: {
        "x-access-token": token
    }
  });
};

export const useFetchRequest = () => {
  return useQuery(["request"], fetchRequest);
};
