import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignUp() {
    let userData;
    Yup.object({
        name: Yup.string().required("name is req")
    })
    if (phoneNumber == "") {
      alert("Please enter phone");
    }
    if (password == "") {
      alert("Please enter password");
    }
    if (confirmPassword == "") {
      alert("Please enter confirmPassword");
    }
    if (password == confirmPassword) {
      userData = {
        name,
        phoneNumber,
        password: confirmPassword,
      };
      alert(JSON.stringify(userData));
    } else {
      alert("PASSWORD NOT MATCHED");
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
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
        <input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button onClick={() => handleSignUp()}>SignUp</button>
      </div>
    </div>
  );
}
