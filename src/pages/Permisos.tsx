import { Outlet } from "react-router-dom";
import { NavbarUser } from "../components/NavbarUser";

export const Permisos = () => {

  return (
    <>
      <NavbarUser />
      <Outlet/>
    </>
  );
};
