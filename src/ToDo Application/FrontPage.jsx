import { motion } from "framer-motion";

export default function FrontPage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "radial-gradient(circle at center, #141E30, #243B55)",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "'Segoe UI', sans-serif",
        textAlign: "center",
        overflow: "hidden",
        padding: "0 20px",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "4.5rem",
          marginBottom: "20px",
          background: "linear-gradient(90deg, #00dbde 0%, #fc00ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ToDo Master
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ fontSize: "1.4rem", maxWidth: "650px", marginBottom: "40px" }}
      >
        Simplify your life. Organize everything. Dominate your day.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          fontSize: "1rem",
          position: "absolute",
          bottom: 30,
          textAlign: "center",
          width: "100%",
          color: "#aaa",
        }}
      >
        Welcome to your productivity journey
      </motion.div>
    </div>
  );
}
