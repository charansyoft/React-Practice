export default function SearchToDo({ value, onChange }) {
  return (
    <div style={{ justifyContent: "center", display: "flex", paddingTop: 5 }}>
      <input
        style={{
          borderRadius: 5,
          padding: 6,
        }}
        placeholder="Search ToDo..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
