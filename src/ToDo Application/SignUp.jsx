import { useState } from "react";
import * as Yup from "yup";
import { signUpAPI } from "../API/auth/SignUpApi";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  async function handleSignUp() {
    let userData;
    Yup.object({
      name: Yup.string().required("name is req"),
    });
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
        phone: phoneNumber,
        password: confirmPassword,
      };

      try {
        const res = await signUpAPI(userData);

        if (res.error) {
          alert(res.error);
        } else {
alert(`${res.message}`);
navigate("/login");
        }
      } catch (err) {
        console.error("Signup failed:", err);
        alert("Signup error");
      }

      // alert(JSON.stringify(userData));
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
