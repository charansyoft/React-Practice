import { useState, useEffect } from "react";
import ListSection from "./components/Lists";

export default function ToDo() {
  const [selected, setSelected] = useState(null);
  const [Lists, setLists] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleDeleteList(eachList) {
    const confirmDelete = window.confirm(`Delete List ?\n${eachList.ListName}`);
    if (!confirmDelete) return;

    const UpdatedLists = Lists.filter((list) => list.id !== eachList.id);
    setLists(UpdatedLists);
    localStorage.setItem("Lists", JSON.stringify(UpdatedLists));

    const UpdatedToDos = Todos.filter((todo) => todo.id !== eachList.id);
    setTodos(UpdatedToDos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedToDos));
  }

  function handleDeleteToDo(eachToDo) {
    const confirmDelete = window.confirm(
      `Delete this task?\n\n ${eachToDo.ToDo}`
    );
    if (!confirmDelete) return;

    const UpdatedToDos = Todos.filter((todo) => todo.id !== eachToDo.id);
    setTodos(UpdatedToDos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedToDos));
  }

  function handleAddTask() {
    if (!selected) {
      alert("No list selected");
      return;
    }

    const TaskText = prompt(`Enter new task for list: ${selected.ListName}`);
    if (!TaskText) return;

    const now = new Date();
    const id =
      String(now.getDate()).padStart(2, "0") +
      String(now.getMonth() + 1).padStart(2, "0") +
      now.getFullYear() +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const newTodo = {
      ListId: selected.id,
      id: id,
      ToDo: TaskText,
    };

    const UpdatedToDos = [...Todos, newTodo];
    setTodos(UpdatedToDos);
    localStorage.setItem("Todos", JSON.stringify(UpdatedToDos));
  }

  function handleAddList() {
    const now = new Date();
    const id =
      String(now.getDate()).padStart(2, "0") +
      String(now.getMonth() + 1).padStart(2, "0") +
      now.getFullYear() +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const ListName = prompt("Enter New List Name:");
    if (!ListName) return;

    const newList = { id, ListName };
    const updatedLists = [...Lists, newList];
    setLists(updatedLists);
    localStorage.setItem("Lists", JSON.stringify(updatedLists));
  }

  useEffect(() => {
    const savedLists = localStorage.getItem("Lists");
    const savedTodos = localStorage.getItem("Todos");
    if (savedLists) setLists(JSON.parse(savedLists));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

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

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "Segoe UI, Inter, sans-serif",
        backgroundColor: "#1e1e2f",
        color: "#f5f5f5",
      }}
    >
      <ListSection
        Lists={Lists}
        onListClick={setSelected}
        selected={selected}
        onAddList={handleAddList}
        DeleteList={handleDeleteList}
      />

      <div
        style={{
          width: "70%",
          padding: "24px 32px",
          backgroundColor: "#2a2a3b",
          borderLeft: "1px solid #444",
          overflowY: "auto",
        }}
      >
        {!selected && (
          <h4 style={{ color: "#ff7f7f", fontWeight: 500 }}>
            Select Any List To See Your TODO's
          </h4>
        )}

        {selected &&
          Todos.filter((eachToDo) => eachToDo.ListId === selected.id).map(
            (eachToDo) => (
              <div
                key={`${eachToDo.ListId}-${eachToDo.id}-${eachToDo.ToDo}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  backgroundColor: "#3a3a4d",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  marginBottom: "16px",
                }}
              >
                {editId === eachToDo.id ? (
                  <>
                    <input
                      style={{
                        flex: 1,
                        fontSize: 16,
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #555",
                        outline: "none",
                        backgroundColor: "#2e2e40",
                        color: "#fff",
                      }}
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      style={{
                        padding: "8px 14px",
                        fontSize: "14px",
                        fontWeight: 500,
                        backgroundColor: "#4a90e2",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5
                      style={{
                        flex: 1,
                        fontSize: "16px",
                        fontWeight: 500,
                        color: editId === eachToDo.id ? "#aaff88" : "#ffffff",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {eachToDo.ToDo}
                    </h5>
                    <button
                      style={{
                        padding: "8px 14px",
                        fontSize: "14px",
                        fontWeight: 500,
                        backgroundColor: "#4a4a5d",
                        border: "none",
                        borderRadius: "6px",
                        color: "#f0f0f0",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(eachToDo)}
                    >
                      Edit
                    </button>
                  </>
                )}

                <button
                  style={{
                    padding: "8px 14px",
                    fontSize: "14px",
                    fontWeight: 500,
                    backgroundColor: "#e74c3c",
                    border: "none",
                    borderRadius: "6px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteToDo(eachToDo)}
                >
                  Delete
                </button>
              </div>
            )
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
          fontSize: "16px",
          fontWeight: 600,
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
        }}
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
}
