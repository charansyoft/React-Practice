import React from "react";
import { Box, Button, Typography, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListSection({
  Lists,
  onListClick,
  selected,
  onAddList,
  DeleteList,
}) {
  return (
    <Box
      sx={{
        width: "30%",
        height: "100vh",
        bgcolor: "#2a2a3b",
        color: "#f5f5f5",
        padding: 2,
        borderRight: "1px solid #444",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          ToDO Lists
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onAddList}
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          + Add List
        </Button>
      </Box>

      {Lists.map((eachList) => (
        <Paper
          key={eachList.id}
          elevation={selected?.id === eachList.id ? 4 : 1}
          sx={{
            backgroundColor:
              selected?.id === eachList.id ? "#3a3a4d" : "#2e2e40",
            borderLeft:
              selected?.id === eachList.id
                ? "4px solid #4a90e2"
                : "4px solid transparent",
            padding: "8px 12px",
            mb: 2,
            borderRadius: 2,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                color: "#fff",
              }}
              onClick={() => onListClick(eachList)}
            >
              {eachList.ListName}
            </Typography>

            <IconButton
              onClick={() => {
                onListClick(eachList); // Activate the list immediately
                setTimeout(() => {
                  DeleteList(eachList); // ✅ Call your delete function with list info
                }, 1000);
              }}
              size="small"
              sx={{ color: "#e57373" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
