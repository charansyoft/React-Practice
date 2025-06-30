import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Cookies from "js-cookie";

export default function AddNewToDo({ selectedList }) {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");

  function handleClose() {
    setOpen(false);
    setTaskName("");
  }

  function handleAddToDo() {
    if (!selectedList?.id) {
      alert("No list selected");
      return;
    }
    setOpen(true);
  }

  async function handleSave() {
    const token = Cookies.get("token");

    if (!taskName.trim()) {
      alert("Task name is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/create_todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskName: taskName.trim(),
          listId: selectedList.id,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create task");

      alert("✅ Task created successfully");
      handleClose(); // close dialog on success
    } catch (error) {
      alert("❌ " + error.message);
    }
  }

  return (
    <div style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}>
      <button onClick={handleAddToDo}>ADD NEW TODO</button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Task Name"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={!taskName.trim()}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
