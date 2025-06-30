import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import ViewToDos from "./subComponents/ViewToDos";
import SearchToDo from "./subComponents/SearchToDo";

export default function ToDos({ selectedList }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);
  const [uncheckOpen, setUncheckOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [checkingTodo, setCheckingTodo] = useState(null);
  const [uncheckingTodo, setUncheckingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchTodos() {
      if (!selectedList?.id) return;
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `http://localhost:5000/fetch_todos?listId=${selectedList.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch todos");
        setTodos(data.todos);
      } catch (error) {
        alert("❌ " + error.message);
      }
    }
    fetchTodos();
  }, [selectedList]);

  function handleOpenDialog() {
    if (!selectedList?.id) return alert("Please select a list first.");
    setOpen(true);
  }

  function handleCloseDialog() {
    setOpen(false);
    setTaskName("");
  }

  async function handleSaveTask() {
    const token = Cookies.get("token");
    if (!taskName.trim()) return alert("Task name is required");
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
      setTodos((prev) => [data.task || { name: taskName.trim() }, ...prev]);
      alert("✅ Task created successfully");
      handleCloseDialog();
    } catch (error) {
      alert("❌ " + error.message);
    }
  }

  function handleEdit(todo) {
    setEditingTodo(todo);
    setTaskName(todo.name);
    setEditOpen(true);
  }

  async function handleUpdateTask() {
    const token = Cookies.get("token");
    try {
      const response = await fetch("http://localhost:5000/edit_todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ todoId: editingTodo.id, name: taskName.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Update failed");
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, name: taskName.trim() } : todo
        )
      );
      alert("✅ Task updated");
      setEditOpen(false);
      setEditingTodo(null);
      setTaskName("");
    } catch (err) {
      alert("❌ " + err.message);
    }
  }

  function handleRequestDelete(todo) {
    setDeletingTodo(todo);
    setDeleteOpen(true);
  }

  async function handleConfirmDelete() {
    const token = Cookies.get("token");
    try {
      const response = await fetch("http://localhost:5000/delete_todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ todoId: deletingTodo.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed");
      setTodos((prev) => prev.filter((t) => t.id !== deletingTodo.id));
      setDeleteOpen(false);
      setDeletingTodo(null);
      alert("✅ Task deleted");
    } catch (err) {
      alert("❌ " + err.message);
    }
  }

  function handleRequestCheck(todo) {
    setCheckingTodo(todo);
    setCheckOpen(true);
  }

  async function handleConfirmCheck() {
    const token = Cookies.get("token");
    try {
      const response = await fetch("http://localhost:5000/check_todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ todoId: checkingTodo.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Check failed");
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === checkingTodo.id ? { ...todo, status: true } : todo
        )
      );
      setCheckOpen(false);
      setCheckingTodo(null);
      alert("✅ Task marked complete");
    } catch (err) {
      alert("❌ " + err.message);
    }
  }

  function handleRequestUncheck(todo) {
    setUncheckingTodo(todo);
    setUncheckOpen(true);
  }

  async function handleConfirmUncheck() {
    const token = Cookies.get("token");
    try {
      const response = await fetch("http://localhost:5000/uncheck_todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ todoId: uncheckingTodo.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Uncheck failed");
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === uncheckingTodo.id ? { ...todo, status: false } : todo
        )
      );
      setUncheckOpen(false);
      setUncheckingTodo(null);
      alert("✅ Task unmarked complete");
    } catch (err) {
      alert("❌ " + err.message);
    }
  }

  return (
    <div>
      <h2 style={{ color: "white", justifyContent: "center", display: "flex" }}>
        {selectedList
          ? "TASK : " + selectedList.listName
          : "Please Select the List"}
      </h2>

      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}
      >
        <button onClick={handleOpenDialog}>ADD NEW TODO</button>
      </div>

      <SearchToDo value={searchTerm} onChange={setSearchTerm} />
      <ViewToDos
        todos={filteredTodos}
        onEdit={handleEdit}
        onDelete={handleRequestDelete}
        onCheck={handleRequestCheck}
        onUnCheck={handleRequestUncheck}
      />

      <Dialog open={open} onClose={handleCloseDialog}>
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveTask}
            disabled={!taskName.trim()}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
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
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateTask}
            disabled={!taskName.trim()}
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{deletingTodo?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={checkOpen} onClose={() => setCheckOpen(false)}>
        <DialogTitle>Mark as Complete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to mark "{checkingTodo?.name}" as complete?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmCheck}
            color="success"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={uncheckOpen} onClose={() => setUncheckOpen(false)}>
        <DialogTitle>Undo Completion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to undo complete for "{uncheckingTodo?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUncheckOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmUncheck}
            color="warning"
            variant="contained"
          >
            Undo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
