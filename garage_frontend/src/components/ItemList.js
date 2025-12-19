import React, { useEffect, useState } from "react";
import StockForm from "./StockForm";
import ItemForm from "./ItemForm";

function ItemList({ role }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = () => {
  fetch("http://127.0.0.1:8000/api/items/", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access"),
    },
  })
    .then(res => res.json())
    .then(data => setItems(data));
};


  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = (itemId, itemName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${itemName}"?`
  );

  if (!confirmDelete) return;

  fetch(`https://garage-stock-management.onrender.com/api/items/${itemId}/`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access"),
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Delete failed");
      loadItems(); // refresh list
    })
    .catch(() => alert("Unable to delete item"));
};

  return (
    <div>
      {role === "Owner" && (
  <ItemForm
    selectedItem={selectedItem}
    onSaved={() => {
      setSelectedItem(null);
      loadItems();
    }}
  />
)}

      <StockForm onUpdate={loadItems} />

      <h2>Available Items</h2>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
  {item.low_stock ? (
    <span className="badge bg-danger">LOW</span>
  ) : (
    <span className="badge bg-success">OK</span>
  )}
</td>
              <td>
  {role === "Owner" && (
    <>
      <button
        className="btn btn-sm btn-warning me-2"
        onClick={() => setSelectedItem(item)}
      >
        Edit
      </button>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(item.id, item.name)}
      >
        Delete
      </button>
    </>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
