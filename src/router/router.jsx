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
import AgendamentosDependentess from "../Pages/Agendamentos/dependente/dependente.jsx";
import Perfil from '../Pages/Perfil/Perfil.jsx';
import ServicosExtras from '../Pages/Agendamentos/servico/ServicosExtras.jsx';
import AgendamentoDependenteCadastrado from '../Pages/Agendamentos/AgendamentoDependenteCadastrado/AgendamentoDependenteCadastrado.jsx';

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
      { path: "/agendamentos/dependente", element: <AgendamentosDependentess /> },
      { path: "/agendamentos/AgendamentoDependente", element: <AgendamentoDependenteCadastrado /> },
      { path: "/agendamentos/servico", element: <ServicosExtras /> },
      { path: "/cadastro", element: <Cadastro /> },
      { path: "/login", element: <Login /> },
      { path: "/Perfil", element: <Perfil /> }
    ]
  }
]);

export default router;
