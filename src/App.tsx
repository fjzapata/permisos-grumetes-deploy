import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { Permisos } from "./pages/Permisos";
import { LoginAdmin } from "./pages/LoginAdmin";
import {
  ProtectedRoutes,
  ProtectedRoutesAdmin,
} from "./components/ProtectedRoutes";
import { useAuthStore } from "./store/authStore";
import { TableroPendiente } from "./components/TableroPendiente";
import { TableroAprobado } from "./components/TableroAprobado";
import { TableroDenegado } from "./components/TableroDenegado";
import { SearchUser } from "./components/SearchUser";
import { PeticionForm } from "./components/PeticionForm";
import { TableroUser } from "./components/TableroUser";
import { InicioDashboar } from "./components/InicioDashboar";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes isAllowed={isAuth} />}>
          <Route path="/permisos/*" element={<Permisos />}>
            <Route path="formulario" element={<PeticionForm />} />
            <Route path="peticiones-realizadas" element={<TableroUser />} />
            <Route path="" element={<InicioDashboar />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutesAdmin isAllowed={isAuth} />}>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="pendiente" element={<TableroPendiente />} />
            <Route path="aprobado" element={<TableroAprobado />} />
            <Route path="denegado" element={<TableroDenegado />} />
            <Route path="search" element={<SearchUser />} />
            <Route path="" element={<InicioDashboar />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
