import React, { useEffect, useState } from "react";

function StockForm({ onUpdate }) {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [action, setAction] = useState("OUT");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items/")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/stocklogs/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("access"),
  },
  body: JSON.stringify({
    item: itemId,
    action: action,
    quantity: quantity,
  }),
})
      .then(res => {
        if (!res.ok) {
          throw new Error("Stock update failed");
        }
        return res.json();
      })
      .then(() => {
        alert("Stock updated successfully");
        setQuantity("");
        onUpdate(); // refresh items
      })
      .catch(err => alert(err.message));
  };

  return (
  <div className="card card-body mb-4">
    <h5 className="mb-3">Stock IN / OUT</h5>

    <form onSubmit={handleSubmit} className="row g-2">
      <div className="col-md-4">
        <select
          className="form-control"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        >
          <option value="">Select Item</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-control"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="IN">Stock IN</option>
          <option value="OUT">Stock OUT</option>
        </select>
      </div>

      <div className="col-md-3">
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="col-md-2">
        <button className="btn btn-primary w-100">
          Submit
        </button>
      </div>
    </form>
  </div>
);
}

export default StockForm;
