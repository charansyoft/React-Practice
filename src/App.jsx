import { useState } from "react";
import Challenges from "./Practice/Challenges";
import Syntax from "./Practice/Syntax";
import Products from "./Practice/Products";
import Game from "./Practice/Game";
import Text from "./Practice/Text";

export default function App() {
  const [selected, setSelected] = useState(1);

  const getSelectedComponent = () => {
    switch (selected) {
      case 1:
        return <Challenges />;
      case 2:
        return <Syntax />;
      case 4:
        return <Products />;
      case 5:
        return <Game />;
      case 3:
      default:
        return <Text />;
    }
  };

  return (
    <div>
      {getSelectedComponent()}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#f0f0f0",
          borderTop: "1px solid #ccc",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            padding: "10px",
            gap: "10px",
            minWidth: "max-content",
          }}
        >
          <button onClick={() => setSelected(1)}>Practice 1</button>
          <button onClick={() => setSelected(2)}>Practice 2</button>
          <button onClick={() => setSelected(3)}>Practice 3</button>
          <button onClick={() => setSelected(4)}>Practice 4</button>
          <button onClick={() => setSelected(5)}>Practice 5</button>
          {/* Add more if needed */}
        </div>
      </div>
    </div>
  );
}
