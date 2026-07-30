import { Route, Routes } from "react-router";

import Inicio from "./pages/Inicio/Inicio";
import Servicos from "./pages/Servicos/Servicos";
import Login from "./pages/Login/Login";
import Estudante from "./pages/Estudante/Estudante";
import Secretaria from "./pages/Secretaria/Secretaria";
import AcompanharEstudante from "./pages/AcompanharEstudante/AcompanharEstudante";
import AcompanharSecretaria from "./pages/AcompanharSecretaria/AcompanharSecretaria";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />

            <Route
                path="/servicos"
                element={<Servicos />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/estudante"
                element={<Estudante />}
            />

            <Route
                path="/secretaria"
                element={<Secretaria />}
            />

            <Route
                path="/acompanhar-estudante"
                element={<AcompanharEstudante />}
            />

            <Route
                path="/acompanhar-secretaria"
                element={<AcompanharSecretaria />}
            />
        </Routes>
    );
}

export default App;