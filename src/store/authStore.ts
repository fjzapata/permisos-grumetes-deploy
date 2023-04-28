import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  isAuth: boolean;
  username: string;
  idUser: string;
};

type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
  setUsername: (username: string) => void;
  setRole: (idUser: string) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: " ",
      isAuth: false,
      username: "",
      idUser: "",
      setToken: (token: string) =>
        set((state) => ({
          token,
          isAuth: true,
        })),
      logout: () =>
        set((state) => ({
          token: " ",
          isAuth: false,
          username: "",
          idUser: ''
        })),
      setUsername: (username: string) =>
        set((state) => ({
          username,
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
