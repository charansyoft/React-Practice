import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";

export default function ViewToDos({ todos, onEdit, onDelete, onCheck, onUnCheck }) {
  function handleDeleteToDo(eachTodo) {
    onDelete(eachTodo);
  }

  function handleCheckToDo(eachTodo) {
    onCheck(eachTodo); 
  }

  function handleUncheckToDo(eachTodo) {
    onUnCheck(eachTodo);
  }

  const currentTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  const renderCurrentTodoItem = (eachTodo) => (
    <Box
      key={eachTodo.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 1.5,
        backgroundColor: "#f9f9f9",
        p: 2,
        borderRadius: 2,
        width: "75%",
      }}
    >
      <Typography sx={{ flexGrow: 1, color: "black", fontWeight: 500 }}>
        {eachTodo.name}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Edit">
          <IconButton color="primary" size="small" onClick={() => onEdit(eachTodo)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" size="small" onClick={() => handleDeleteToDo(eachTodo)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mark Complete">
          <IconButton color="success" size="small" onClick={() => handleCheckToDo(eachTodo)}>
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  const renderCompletedTodoItem = (eachTodo) => (
    <Box
      key={eachTodo.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 1.5,
        backgroundColor: "#e0f7e9",
        p: 2,
        borderRadius: 2,
        width: "75%",
      }}
    >
      <Typography
        sx={{
          flexGrow: 1,
          color: "#2e7d32",
          textDecoration: "line-through",
          fontWeight: 500,
        }}
      >
        {eachTodo.name}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Delete">
          <IconButton color="error" size="small" onClick={() => onDelete(eachTodo)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo Complete">
          <IconButton color="warning" size="small" onClick={() => handleUncheckToDo(eachTodo)}>
            <UndoIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 3, width: "100%" }}>
      <Typography variant="h5" sx={{ color: "white", mb: 1 }}>Current Tasks</Typography>
      {currentTodos.length === 0 ? (
        <Typography sx={{ color: "white", mb: 4 }}>No current tasks found.</Typography>
      ) : (
        currentTodos.map(renderCurrentTodoItem)
      )}

      <Typography variant="h5" sx={{ color: "lightgreen", mt: 4, mb: 1 }}>Completed Tasks</Typography>
      {completedTodos.length === 0 ? (
        <Typography sx={{ color: "white" }}>No completed tasks found.</Typography>
      ) : (
        completedTodos.map(renderCompletedTodoItem)
      )}
    </Box>
  );
}
