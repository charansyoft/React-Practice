import { useState } from "react";

export default function SearchList() {
  const [value, setValue] = useState("");

  return (
    <div style={{justifyContent:"center",display:"flex",paddingTop:5}}>
      <input
      style={{
        borderRadius:5,
        padding:6,
      }}
        placeholder="Search List.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
