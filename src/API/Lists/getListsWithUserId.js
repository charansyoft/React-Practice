// src/API/Lists/getListsWithUserId.js
import Cookies from "js-cookie";

export async function getListsWithUserId() {
  const token = Cookies.get("token");

  if (!token) throw new Error("User is not authenticated");

  try {
    const response = await fetch("http://127.0.0.1:5000/fetch_lists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch lists");
    }

    // 🔁 Convert backend keys to frontend expected format
    const formattedLists = data.lists.map((item) => ({
      id: item.listId,
      listName: item.listName,
    }));

    return formattedLists;
  } catch (error) {
    throw error;
  }
}
