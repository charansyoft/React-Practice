import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";

export default function AddNewList({ lists, setLists }) {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  function handleAddNewList() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  async function handleSave() {
    const token = Cookies.get("token"); // or localStorage.getItem("token")
    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/create_lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: listName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create list");
      }

      setLists([...lists, { id: data.listId, listName: data.name }]);
      setListName("");
      handleClose(); // close modal on success
    } catch (error) {
      alert("❌ " + error.message);
    }
  }
  return (
    <div style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}>
      <button onClick={() => handleAddNewList()}>ADD NEW LIST</button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>ADD NEW LIST </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            label="List Name"
            fullWidth
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!listName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
