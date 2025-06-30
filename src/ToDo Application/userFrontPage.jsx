import Lists from "./components/Lists";
import ToDos from "./components/ToDos";
import { useState } from "react";

export default function UserFrontPage() {
  const [selectedList, setSelectedList] = useState(null);
  return (
    <div
      style={{
        paddingTop: 75,
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        height: "auto",
        backgroundColor: "black",
      }}
    >
      <div style={{ width: "30vw", backgroundColor: "wheat" }}>
        <Lists setSelectedList={setSelectedList} />
      </div>
      <div style={{ width: "70vw", backgroundColor: "green" }}>
        <ToDos selectedList={selectedList} />
      </div>
    </div>
  );
}
