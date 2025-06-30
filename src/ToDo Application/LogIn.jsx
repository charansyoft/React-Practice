import { useState } from "react";
import { logInApi } from "../API/auth/LogInApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSignUp() {
    let userData;
    if (phoneNumber != "" && password != "") {
      userData = {
        phone: phoneNumber,
        password,
      };
      try {
        const response = await logInApi(userData);
        if (response.error) {
          alert(response.error);
        } else {
          alert(
            `${JSON.stringify(response)} response from backend login function`
          );

          // ✅ store token in cookie (valid for 7 days)
          Cookies.set("token", response.token, {
            expires: 7, // 7 days
            secure: true, // ⚠️ only works on HTTPS (skip in dev if needed)
            sameSite: "Strict",
          });

          Cookies.set("user_id", response.user_id, {
            expires: 7,
          });

Cookies.set("user_name", response.user_name, {
  expires: 7,
});


          // Navigate or do something
          navigate("/userFrontPage");
        }
      } catch (err) {
  console.error("Login error:", err);
  alert(err.message || "Login failed!");
}

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
        <button onClick={() => handleSignUp()}>Login</button>
      </div>
    </div>
  );
}
