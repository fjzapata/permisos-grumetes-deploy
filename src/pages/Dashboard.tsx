import { NavbarAdmin } from "../components/NavbarAdmin";
import {Outlet} from 'react-router-dom'

export const Dashboard = () => {
  return (
    <>
      <NavbarAdmin />
      <Outlet/>
    </>
  );
};
