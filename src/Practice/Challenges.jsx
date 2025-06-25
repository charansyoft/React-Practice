const recipes = [
  {
    id: "greek-salad",
    name: "Greek Salad",
    ingredients: ["tomatoes", "cucumber", "onion", "olives", "feta"],
  },
  {
    id: "hawaiian-pizza",
    name: "Hawaiian Pizza",
    ingredients: [
      "pizza crust",
      "pizza sauce",
      "mozzarella",
      "ham",
      "pineapple",
    ],
  },
  {
    id: "hummus",
    name: "Hummus",
    ingredients: ["chickpeas", "olive oil", "garlic cloves", "lemon", "tahini"],
  },
];

export default function () {
  return (
<div>
          {recipes.map((person) => (
          <div>
            <h2>{person.name}</h2>
          <ul>
            {person.ingredients.map(ing => 
                <li>{ing}</li>
            )}
        </ul>
          </div>
        ))}
</div>
  );
}
