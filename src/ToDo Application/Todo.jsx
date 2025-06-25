// --- ToDo.jsx ---
import { Check, Search } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ListSection from "./components/Lists";

export default function ToDo() {
  const [selected, setSelected] = useState(null);
  const [Lists, setLists] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchToDo, setSearchToDO] = useState("");
  const editRef = useRef(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const [openListDialog, setOpenListDialog] = useState(false);
  const [newListName, setNewListName] = useState("");

  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const [openTodoConfirm, setOpenTodoConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [openCheckDialog, setOpenCheckDialog] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setEditId(null);
      }
    }
    if (editId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editId]);

  useEffect(() => {
    const savedLists = localStorage.getItem("Lists");
    const savedTodos = localStorage.getItem("Todos");
    if (savedLists) setLists(JSON.parse(savedLists));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  function handleDeleteToDo(eachToDo) {
    setTodoToDelete(eachToDo);
    setOpenTodoConfirm(true);
  }

  // function handleDeleteToDo(eachToDo) {
  // }

  function confirmDeleteToDo() {
    const UpdatedToDos = Todos.filter((todo) => todo.id !== todoToDelete.id);
    setTodos(UpdatedToDos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedToDos));
    setOpenTodoConfirm(false);
    setTodoToDelete(null);
  }

  function handleEdit(eachToDo) {
    setEditId(eachToDo.id);
    setEditText(eachToDo.ToDo);
  }

  function handleSave() {
    const updateTodos = Todos.map((todo) =>
      todo.id === editId ? { ...todo, ToDo: editText } : todo
    );
    setTodos(updateTodos);
    localStorage.setItem("Todos", JSON.stringify(updateTodos));
    setEditId(null);
    setEditText("");
  }

  //   function handleSave() {
  //   const updateTodos = Todos.map((todo) =>
  //     todo.id == editId ? { ...todo, ToDo: editText } : todo
  //   );
  //  (updateTodos);
  //   localStorage.setItem("Todos", JSON.stringify(updateTodos));
  //   setEditId(null);
  //   setEditText("");
  // }

  function handleSearchToDo(event) {
    setSearchToDO(event.target.value);
  }

  function handleAddList() {
    setNewListName("");
    setOpenListDialog(true);
  }

  function handleCheck(eachToDo) {
    setOpenCheckDialog(true);
    alert(JSON.stringify(eachToDo));
  }

  function saveNewList() {
    if (!newListName.trim()) return;
    const now = new Date();
    const id =
      String(now.getDate()).padStart(2, "0") +
      String(now.getMonth() + 1).padStart(2, "0") +
      now.getFullYear() +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");
    const newList = { id, ListName: newListName.trim() };
    const updatedLists = [...Lists, newList];
    setLists(updatedLists);
    localStorage.setItem("Lists", JSON.stringify(updatedLists));
    setOpenListDialog(false);
  }

  function handleAddTask() {
    if (!selected) return alert("No list selected");
    setNewTaskText("");
    setOpenTaskDialog(true);
  }

  function saveNewTask() {
    if (!newTaskText.trim()) return;
    const now = new Date();
    const id =
      String(now.getDate()).padStart(2, "0") +
      String(now.getMonth() + 1).padStart(2, "0") +
      now.getFullYear() +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");
    const newTodo = { ListId: selected.id, id, ToDo: newTaskText.trim() };
    const UpdatedToDos = [...Todos, newTodo];
    setTodos(UpdatedToDos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedToDos));
    setOpenTaskDialog(false);
  }

  const filteredTodos = selected
    ? Todos.filter(
        (eachToDo) =>
          eachToDo.ListId === selected.id &&
          eachToDo.ToDo.toLowerCase().includes(searchToDo.toLowerCase())
      )
    : [];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1e1e2f",
        color: "#f5f5f5",
      }}
    >
      <ListSection
        Lists={Lists}
        onListClick={setSelected}
        selected={selected}
        onAddList={handleAddList}
        DeleteList={(list) => {
          setListToDelete(list);
          setOpenConfirm(true);
        }}
      />

      <div
        style={{
          width: "70%",
          padding: "24px 32px",
          backgroundColor: "#2a2a3b",
          overflowY: "auto",
        }}
      >
        {!selected && (
          <h4 style={{ color: "#ff7f7f" }}>
            Select Any List To See Your TODO's
          </h4>
        )}

        {selected && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 10,
                border: "1px solid white",
                padding: "6px 12px",
                marginBottom: 16,
              }}
            >
              <Search />
              <input
                placeholder="Search tasks..."
                style={{
                  marginLeft: 10,
                  outline: "none",
                  background: "transparent",
                  border: "none",
                  color: "#f5f5f5",
                  flex: 1,
                }}
                value={searchToDo}
                onChange={handleSearchToDo}
              />
              {/* <h2>{searchToDo}</h2> */}
            </div>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((eachToDo) => (
                <div
                  key={eachToDo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    backgroundColor: "#3a3a4d",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                >
                  {editId === eachToDo.id ? (
                    <div ref={editRef} style={{ flex: 1 }}>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{
                          width: "100%",
                          padding: 8,
                          borderRadius: 6,
                          border: "1px solid #555",
                          backgroundColor: "#2e2e40",
                          color: "#fff",
                        }}
                      />
                      <button
                        onClick={handleSave}
                        style={{
                          marginTop: 6,
                          padding: "6px 12px",
                          backgroundColor: "#4a90e2",
                          border: "none",
                          borderRadius: 6,
                          color: "#fff",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <h5 style={{ flex: 1 }}>{eachToDo.ToDo}</h5>
                      <button
                        onClick={() => handleEdit(eachToDo)}
                        style={{
                          backgroundColor: "#4a4a5d",
                          border: "none",
                          color: "#f0f0f0",
                          padding: 8,
                          borderRadius: 6,
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteToDo(eachToDo)}
                    style={{
                      backgroundColor: "#e74c3c",
                      border: "none",
                      color: "white",
                      padding: 8,
                      borderRadius: 6,
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleCheck(eachToDo)}
                    style={{
                      backgroundColor: "rgb(157, 249, 221)",
                      border: "none",
                      color: "black",
                      padding: 6,
                      borderRadius: 50,
                    }}
                  >
                    <Check
                      style={{ paddingTop: 4, paddingRight: 5, paddingLeft: 5 }}
                    />
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: "#bbb" }}>
                {searchToDo
                  ? "No matching tasks found."
                  : "No tasks in this list yet."}
              </p>
            )}
          </>
        )}
      </div>

      <button
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          padding: "14px 24px",
          backgroundColor: "#4a90e2",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
        }}
        onClick={handleAddTask}
      >
        Add Task
      </button>

      <Dialog open={openListDialog} onClose={() => setOpenListDialog(false)}>
        <DialogTitle>Add New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenListDialog(false)}>Cancel</Button>
          <Button
            onClick={saveNewList}
            variant="contained"
            disabled={!newListName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button
            onClick={saveNewTask}
            variant="contained"
            disabled={!newTaskText.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete List Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the list "{listToDelete?.ListName}"?
            All its tasks will also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (!listToDelete) return;
              const UpdatedLists = Lists.filter(
                (list) => list.id !== listToDelete.id
              );
              setLists(UpdatedLists);
              localStorage.setItem("Lists", JSON.stringify(UpdatedLists));
              const UpdatedToDos = Todos.filter(
                (todo) => todo.ListId !== listToDelete.id
              );
              setTodos(UpdatedToDos);
              localStorage.setItem("Todos", JSON.stringify(UpdatedToDos));
              setOpenConfirm(false);
              setListToDelete(null);
              if (selected?.id === listToDelete.id) setSelected(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Todo Dialog */}
      <Dialog open={openTodoConfirm} onClose={() => setOpenTodoConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTodoConfirm(false)}>Cancel</Button>
          <Button onClick={confirmDeleteToDo} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCheckDialog} onClose={() => setOpenCheckDialog(false)}>
        <DialogTitle>Checked</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You just clicked the check icon. Customize this dialog as needed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
