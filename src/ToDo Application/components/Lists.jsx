import AddNewList from "./subComponents/AddNewList";
import SearchList from "./subComponents/SearchList";
import ViewLists from "./subComponents/ViewLists";
import { getListsWithUserId } from "../../API/Lists/getListsWithUserId";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Lists({ setSelectedList }) {
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");

  const [editDialog, setEditDialog] = useState(false);
  const [editList, setEditList] = useState(null);
  const [newName, setNewName] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  useEffect(() => {
    async function fetchLists() {
      try {
        const userLists = await getListsWithUserId();
        setLists(userLists);
      } catch (error) {
        alert("Failed to fetch lists");
      }
    }
    fetchLists();
  }, []);

  function handleListDelete(list) {
    setListToDelete(list);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!listToDelete) return;

    try {
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:5000/delete_lists", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listId: listToDelete.id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete list");

      setLists((prev) => prev.filter((l) => l.id !== listToDelete.id));
    } catch (error) {
      alert("❌ " + error.message);
    } finally {
      setDeleteDialogOpen(false);
      setListToDelete(null);
    }
  }

  function cancelDelete() {
    setDeleteDialogOpen(false);
    setListToDelete(null);
  }

  function handleListEdit(list) {
    setEditList(list);
    setNewName(list.listName);
    setEditDialog(true);
  }

  async function submitListEdit() {
    if (!newName.trim()) {
      alert("List name can't be empty");
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:5000/edit_lists", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listId: editList.id,
          name: newName.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to edit list");

      const updated = lists.map((l) =>
        l.id === editList.id ? { ...l, listName: newName.trim() } : l
      );
      setLists(updated);
      setEditDialog(false);
      setEditList(null);
      setNewName("");
    } catch (error) {
      alert("❌ " + error.message);
    }
  }

  function handleSelected(list) {
    setSelectedList(list);
  }

  function handleEditDialogClose() {
    setEditDialog(false);
    setEditList(null);
    setNewName("");
  }

  const filteredLists = lists.filter((list) =>
    list.listName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AddNewList lists={lists} setLists={setLists} />
      <SearchList value={search} onChange={setSearch} />
      <ViewLists
        lists={filteredLists}
        onDelete={handleListDelete}
        onEdit={handleListEdit}
        onSelected={handleSelected}
      />

      <Dialog open={editDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit List Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="New Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button
            onClick={submitListEdit}
            disabled={!newName.trim()}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {" "}
            <strong>{listToDelete?.listName}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}