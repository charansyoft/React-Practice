import { useState } from "react";
export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    let userData;
    if (phoneNumber != "" && password != "") {
      userData = {
        phoneNumber,
        password,
      };
      alert(JSON.stringify(userData));
    } else {
      alert("some field is missing !");
    }
  }
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100vw",
      }}
    >
      <div style={{ flexDirection: "column", display: "flex", gap: 10 }}>
        <input
          placeholder="PhoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <input
          placeholder=" Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={() => handleSignUp()}>SignUp</button>
      </div>
    </div>
  );
}
