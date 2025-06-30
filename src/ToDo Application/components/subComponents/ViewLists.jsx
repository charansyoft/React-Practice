export default function ViewLists({ lists, onDelete, onEdit, onSelected }) {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>View Lists</h3>
      {lists.map((list) => (
        <div
          onClick={() => onSelected(list)}
          key={list.id}
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 5,
            marginBottom: 10,
            cursor: "pointer",
            backgroundColor: "black",
            padding: 8,
            borderRadius: 15,
            width: "25vw",
          }}
        >
          <div
            style={{
              padding: 10,
              background: "#f0f0f0",
              borderRadius: 6,
              borderColor: "black",
              borderWidth: 1,
              borderStyle: "solid",
              flexGrow: 1,
            }}
            onClick={() => console.log("List clicked:", list)}
          >
            {list.listName}
          </div>
          <button
            style={{
              height: 40,
              width: "30px",
              borderColor: "gray",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onClick={() => onDelete(list)}
          >
            D
          </button>
          <button
            style={{
              height: 40,
              width: "30px",
              borderColor: "gray",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onClick={() => onEdit(list)}
          >
            E
          </button>
        </div>
      ))}
    </div>
  );
}
