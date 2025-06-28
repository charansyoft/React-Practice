import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/signup");
  }

  function handleLogIn() {
    navigate("/login");
  }

  function handleHome() {
    navigate("/")
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 100, // stay above other content
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor:"rgba(0, 0, 0, 0.25)",
        boxShadow: "0 2px 5px rgba(255, 255, 255, 0.1)", // nice bottom shadow
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={handleHome}>TODO'S</h2>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          style={{ borderWidth: 0.5, borderColor: "rgba(255, 255, 255, 0.25)" }}
          onClick={handleSignUp}
        >
          SignUp
        </button>
        <button
          style={{ borderWidth: 0.5, borderColor: "rgba(255, 255, 255, 0.25)" }}
          onClick={handleLogIn}
        >
          Login
        </button>
      </div>
    </div>
  );
}
