import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const metadata = {
  title: "Zapas",
  description: "Zapas é uma plataforma de doações de roupas",
  image: "https://zapas.vercel.app/assets/img/LogoZ.svg",
};

function App() {

  useEffect(() => {
    document.title = metadata.title;
  }, []);
  return (
    
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
