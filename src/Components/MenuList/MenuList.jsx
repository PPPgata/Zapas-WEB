import { Menu } from "antd";
import { HomeOutlined, InboxOutlined, PlusOutlined, UsergroupAddOutlined, LogoutOutlined } from "@ant-design/icons";
 
const MenuList = () => {
  return (
    <Menu theme="dark">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="home" icon={<InboxOutlined />}>
        Estoques
      </Menu.Item>
      <Menu.Item key="home" icon={<PlusOutlined />}>
        Items
      </Menu.Item>
      <Menu.Item key="home" icon={<UsergroupAddOutlined />}>
        Usuários
      </Menu.Item>
      <Menu.Item key="home" icon={<LogoutOutlined />}>
        Sair
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
