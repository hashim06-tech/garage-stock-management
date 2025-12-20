import React, { useEffect, useState } from "react";
import StockForm from "./StockForm";
import ItemForm from "./ItemForm";
import { getAccessToken } from "../utils/auth";

const API_URL = "https://garage-stock-management.onrender.com";

function ItemList({ role }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/items/`, {
        headers: {
          Authorization: "Bearer " + getAccessToken(),
        },
      });

      if (!res.ok) {
        console.error("Failed to load items:", res.status);
        return;
      }

      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (itemId, itemName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${itemName}"?`
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${API_URL}/api/items/${itemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      loadItems();
    } catch {
      alert("Unable to delete item");
    }
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

      {/* IMPORTANT: prop name fixed */}
      <StockForm onUpdated={loadItems} />

      <h2 className="mt-4">Available Items</h2>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Status</th>
            {role === "Owner" && <th>Action</th>}
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
              {role === "Owner" && (
                <td>
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
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
