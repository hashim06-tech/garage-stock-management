import React, { useEffect, useState } from "react";

function ItemForm({ selectedItem, onSaved }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "engine",
    quantity: "",
    min_quantity: 5,
    price: "",
    supplier: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = selectedItem
      ? `https://garage-stock-management.onrender.com/api/items/${selectedItem.id}/`
      : "https://garage-stock-management.onrender.com/api/items/";

    const method = selectedItem ? "PUT" : "POST";

    fetch(url, {
  method: method,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("access"),
  },
  body: JSON.stringify(formData),
})
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        return res.json();
      })
      .then(() => {
        alert("Item saved successfully");
        onSaved();
        setFormData({
          name: "",
          category: "engine",
          quantity: "",
          min_quantity: 5,
          price: "",
          supplier: "",
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
  <div className="card card-body mb-4">
    <h5 className="mb-3">
      {selectedItem ? "Edit Item" : "Add Item"}
    </h5>

    <form onSubmit={handleSubmit} className="row g-2">
      <div className="col-md-3">
        <input
          name="name"
          className="form-control"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-2">
        <select
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="engine">Engine</option>
          <option value="oil">Oil</option>
          <option value="electrical">Electrical</option>
          <option value="tools">Tools</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="col-md-1">
        <input
          type="number"
          name="quantity"
          className="form-control"
          placeholder="Qty"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-1">
        <input
          type="number"
          name="min_quantity"
          className="form-control"
          placeholder="Min"
          value={formData.min_quantity}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-2">
        <input
          type="number"
          name="price"
          className="form-control"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-2">
        <input
          name="supplier"
          className="form-control"
          placeholder="Supplier"
          value={formData.supplier}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-1">
        <button className="btn btn-success w-100">
          {selectedItem ? "Update" : "Add"}
        </button>
      </div>
    </form>
  </div>
);
}

export default ItemForm;
