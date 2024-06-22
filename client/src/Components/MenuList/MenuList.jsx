import st from "./MenuList.module.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  InboxOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MenuList = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      className={st.menu_bar}
      defaultSelectedKeys={[path]}
    >
      <Menu.Item
        key="dashboard"
        icon={<HomeOutlined style={{ fontSize: "23px" }} />}
      >
        <Link to="/dashboard">Home</Link>
      </Menu.Item>
      <Menu.Item
        key="estoques"
        icon={<InboxOutlined style={{ fontSize: "23px" }} />}
      >
        <Link to="/estoques">Estoques</Link>
      </Menu.Item>
      <Menu.Item
        key="itens"
        icon={<PlusOutlined style={{ fontSize: "23px" }} />}
      >
        <Link to="/itens">Itens</Link>
      </Menu.Item>
      <Menu.Item
        key="usuarios"
        icon={<UsergroupAddOutlined style={{ fontSize: "23px" }} />}
      >
        <Link to="/usuarios">Usuários</Link>
      </Menu.Item>
      <Menu.Item
        key="historico"
        icon={<HistoryOutlined style={{ fontSize: "23px" }} />}
      >
        <Link to="/historico">Histórico</Link>
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined style={{ fontSize: "23px" }} />}
        onClick={handleLogout} // Chamada para a função de logout
      >
        <span>Sair</span>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
