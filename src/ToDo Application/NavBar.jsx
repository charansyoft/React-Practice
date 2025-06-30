import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const userId = Cookies.get("user_id");
  const userName = Cookies.get("user_name");


  function handleSignUp() {
    navigate("/signup");
  }

  function handleLogIn() {
    navigate("/login");
  }

  function handleHome() {
    navigate("/");
  }

  function handleLogOut() {
    Cookies.remove("token");
    Cookies.remove("user_id");
    navigate("/", { replace: true });
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 75,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",      // translucent background
        backdropFilter: "blur(20px)",                      // ✅ frosted glass effect
        WebkitBackdropFilter: "blur(20px)",                // ✅ Safari support
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",          // subtle shadow
      }}
    >
      <h2
        style={{
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          margin: 0,
        }}
        onClick={handleHome}
      >
        TODO'S
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {token ? (
          <>
            <h3 style={{ margin: 0, color: "white" }}>{userName}</h3>
            <button
              onClick={handleLogOut}
              style={{
                padding: "5px 10px",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                padding: "5px 10px",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={handleSignUp}
            >
              SignUp
            </button>
            <button
              style={{
                padding: "5px 10px",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={handleLogIn}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
