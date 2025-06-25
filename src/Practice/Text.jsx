const people = [
  { name: "A", number: 1, profession: "Telugu" , image:"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"},
  { name: "B", number: 2, profession: "Hindi", image:"" },
  { name: "C", number: 3, profession: "English", image:"" },
];
export default function Text() {
  const individualData = people.map((eachPeople) => (
    <li>
      <ui key={eachPeople.number}>{eachPeople.name}</ui>
      <ol>
        <div>{eachPeople.profession}</div>
        <div>{eachPeople.number}</div>
        {eachPeople.image ? 
        <img style={{height:30, width:30}} src={eachPeople.image}/>
        : "Image Not Found"}
      </ol>
    </li>
  ));
  return <>{individualData}</>;
}
