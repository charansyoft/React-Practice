export async function logInApi(userData) {
  try {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      // 💥 Real error message passed back to UI
      throw new Error(data.error || "Unknown signup error");
    }

    return data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
}
