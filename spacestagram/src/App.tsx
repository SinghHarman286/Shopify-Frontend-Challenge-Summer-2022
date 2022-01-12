import { useState } from "react";
import Wrapper from "./components/Wrapper/Wrapper";
import Home from "./components/Home/Home";
import LikedPost from "./components/LikedPost/LikedPost";
import "./App.css";

function App() {
  const [menuIdx, setMenuIdx] = useState("1");
  const handleMenuChange = ({ key }: { key: string }) => {
    setMenuIdx(key);
  };
  const menuObj: Record<string, JSX.Element> = {
    "1": <Home />,
    "2": <LikedPost />,
  };
  return (
    <div className="App">
      <Wrapper handleMenuChange={handleMenuChange}>{menuObj[menuIdx]}</Wrapper>
    </div>
  );
}

export default App;
