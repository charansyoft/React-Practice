import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  InputBase,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export default function ListSection({
  Lists,
  onListClick,
  selected,
  onAddList,
  DeleteList,
}) {
  const [searchText, setSearchText] = useState("");

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <Box
      sx={{
        width: "30%",
        height: "100vh",
        bgcolor: "#1e1e2f",
        color: "#f5f5f5",
        padding: 2,
        borderRight: "1px solid #444",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onAddList}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            borderRadius: 2,
          }}
        >
          + Add List
        </Button>
      </Box>

      {/* Search Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#2a2a3b",
          border: "1px solid #555",
          borderRadius: 2,
          padding: "4px 10px",
          mb: 2,
        }}
      >
        <SearchIcon sx={{ color: "#aaa", mr: 1 }} />
        <InputBase
          placeholder="Search lists..."
          value={searchText}
          onChange={handleSearchText}
          sx={{
            color: "#f5f5f5",
            flex: 1,
            fontSize: 14,
          }}
        />
      </Box>

      {/* Filter Info */}
      <Typography
        variant="caption"
        sx={{ color: "#aaa", fontStyle: "italic", mb: 1, display: "block" }}
      >
        Showing results for: {searchText || "All"}
      </Typography>

      {/* List Cards */}
      {Lists.filter((list) =>
        list.ListName.toLowerCase().includes(searchText.toLowerCase())
      ).map((eachList) => (
        <Paper
          key={eachList.id}
          elevation={selected?.id === eachList.id ? 6 : 1}
          sx={{
            backgroundColor:
              selected?.id === eachList.id ? "#3a3a4d" : "#2e2e40",
            borderLeft:
              selected?.id === eachList.id
                ? "4px solid #4a90e2"
                : "4px solid transparent",
            padding: "10px 14px",
            mb: 2,
            borderRadius: 3,
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#3c3c50",
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => onListClick(eachList)}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "#fff",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              
            >
              {eachList.ListName}
            </Typography>

            <IconButton
              onClick={() => {
                onListClick(eachList);
                setTimeout(() => {
                  DeleteList(eachList);
                }, 0);
              }}
              size="small"
              sx={{
                color: "#f44336",
                "&:hover": { color: "#ff7961" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
