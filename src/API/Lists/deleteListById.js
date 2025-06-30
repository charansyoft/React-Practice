import Cookies from "js-cookie";

export async function deleteListById(listId) {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/delete_lists", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete list");
    }

    return data;
  } catch (err) {
    throw err;
  }
}
