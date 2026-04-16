export default function Menu() {
  const items = [
    { name: "Espresso", price: "₹120" },
    { name: "Cappuccino", price: "₹180" },
    { name: "Latte", price: "₹200" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Our Menu</h2>
      {items.map((item, index) => (
        <div key={index}>
          {item.name} - {item.price}
        </div>
      ))}
    </div>
  );
}