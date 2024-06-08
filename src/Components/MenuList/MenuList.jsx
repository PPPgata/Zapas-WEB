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

const MenuList = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      className={st.menu_bar}
      defaultSelectedKeys={["home"]}
    >
      <Menu.Item
        key="home"
        icon={<HomeOutlined style={{ fontSize: "23px" }} />}
      >
        Home
      </Menu.Item>
      <Menu.Item
        key="stock"
        icon={<InboxOutlined style={{ fontSize: "23px" }} />}
      >
        Estoques
      </Menu.Item>
      <Menu.Item
        key="itens"
        icon={<PlusOutlined style={{ fontSize: "23px" }} />}
      >
        Itens
      </Menu.Item>
      <Menu.Item
        key="users"
        icon={<UsergroupAddOutlined style={{ fontSize: "23px" }} />}
      >
        Usuários
      </Menu.Item>
      <Menu.Item
        key="history"
        icon={<HistoryOutlined style={{ fontSize: "23px" }} />}
      >
        Histórico
      </Menu.Item>
      <Menu.Item
        key="logOut"
        icon={<LogoutOutlined style={{ fontSize: "23px" }} />}
      >
        Sair
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
