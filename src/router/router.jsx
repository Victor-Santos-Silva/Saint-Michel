// router.jsx
import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../Pages/Home/HomePage.jsx';
import Sobre from '../Pages/Sobre/SobrePage.jsx';
import Servicos from '../Pages/Serviços/Servicos.jsx';
import Doutores from '../Pages/Medicos/Medico.jsx';
import Agendamentos from '../Pages/Agendamentos/Agendamentos.jsx';
import Contatos from '../Pages/Contatos/Contato.jsx';
import Cadastro from '../Pages/Cadastro/Cadastro.jsx';
import Login from '../Pages/Login/LoginPage.jsx';
import ErroPage from '../components/PaginaDeErro/ErrorPage.jsx';
import AgendamentosDependentes from "../Pages/Agendamentos/dependente/dependente.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErroPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/servicos", element: <Servicos /> },
      { path: "/doutores", element: <Doutores /> },
      { path: "/contato", element: <Contatos /> },
      { path: "/agendamentos", element: <Agendamentos /> },
      { path: "/agendamentos/dependente", element: <AgendamentosDependentes /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/login", element: <Login /> }
    ]
  }
]);

export default router;
