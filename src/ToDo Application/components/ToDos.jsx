import ViewToDos from "./subComponents/ViewToDos";
import AddNewToDo from "./subComponents/AddNewToDo";
import SearchToDo from "./subComponents/SearchToDo";
export default function ToDos({ selectedList }) {
  return (
    <div>
      <h2 style={{ color: "white",justifyContent:"center",display:"flex" }}>
        Tasks : {selectedList?.listName}
      </h2>
      <AddNewToDo />
      <SearchToDo />
      <ViewToDos />
    </div>
  );
}
