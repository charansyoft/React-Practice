import { useState } from "react";

const products = [
  { category: "fruit", name: "apple", price: 10, stockStatus: true },
  { category: "fruit", name: "pineApple", price: 20, stockStatus: false },
  { category: "vegetable", name: "tomato", price: 30, stockStatus: true },
  { category: "vegetable", name: "potato", price: 40, stockStatus: false },
  { category: "sweet", name: "sugar", price: 50, stockStatus: true },
];

export default function Products() {
  const categories = [...new Set(products.map((item) => item.category))];
  const [stockStatus, setStockStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  function handleStockStatus() {
    setStockStatus(!stockStatus);
  }

  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.3)",
        borderStyle: "solid",
        borderRadius: 20,
        padding: 20,
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        margin: 20,
        borderColor: "black",
        borderWidth: 1,
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "black" }}>🛒 Cart</h1>

      <input
        type="text"
        placeholder="Search product..."
        value={searchInput}
        onChange={handleSearchChange}
        style={{
          paddingLeft: 15,
          borderRadius: 10,
          border: "1px solid #999",
          height: 35,
          width: "60%",
          marginBottom: 15,
        }}
      />

      <div style={{ marginBottom: 20 }}>
        <input
          type="checkbox"
          id="stockOnly"
          onChange={handleStockStatus}
          style={{ marginRight: 8 }}
        />
        <label htmlFor="stockOnly">Show only in-stock items</label>
      </div>

      {categories.map((cat, index) => {
        const filteredProducts = products.filter(
          (p) =>
            p.category === cat &&
            (!stockStatus || p.stockStatus) &&
            p.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        if (filteredProducts.length === 0) return null;

        return (
          <div key={index} style={{ marginBottom: 20 }}>
            <h2 style={{ marginBottom: 10 }}>{cat.toUpperCase()}</h2>
            {filteredProducts.map((item, i) => (
              <p
                key={i}
                style={{
                  margin: 5,
                  color: !item.stockStatus ? "red" : "black",
                }}
              >
                - {item.name.toUpperCase()} ({item.price}₹)
                {/* {!item.stockStatus && (
                  <span style={{ color: "rgb(255, 146, 146)", marginLeft: 8 }}>
                    OUT OF STOCK
                  </span>
                )} */}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
