// src/api/createListsWithUserId.js
import Cookies from "js-cookie";

export async function createListsWithUserId(listName) {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/create_lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token in header
      },
      body: JSON.stringify({ name: listName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create list");
    }

    return data;
  } catch (err) {
    throw err;
  }
}
