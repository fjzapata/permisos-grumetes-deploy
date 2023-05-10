import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  isAuth: boolean;
  username: string;
  idUser: string;
  id: string;
};

type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
  setUsername: (username: string) => void;
  setUserId: (id: string) => void;
  setRole: (idUser: string) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: " ",
      isAuth: false,
      username: "",
      idUser: "",
      id: "",
      setToken: (token: string) =>
        set((state) => ({
          token,
          isAuth: true,
        })),
      logout: () =>
        set((state) => ({
          id: '',
          token: " ",
          isAuth: false,
          username: "",
          idUser: ''
        })),
      setUsername: (username: string) =>
        set((state) => ({
          username,
        })),
      setUserId: (id: string) =>
        set((state) => ({
          id
        })),
      setRole: (idUser: string) =>
        set((state) => ({
          idUser
        })),
    }),
    {
      name: "auth",
    }
  )
);
