import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const metadata = {
  title: "Zapas",
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
