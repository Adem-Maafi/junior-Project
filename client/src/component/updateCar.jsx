import React, { useState } from 'react';
// import axios from "axios";

function UpdateCar({ car, handelUpdate, onCancel }) {
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);
  const [description, setDescription] = useState(car.description);
  const [image, setImage] = useState(car.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCar = { brand, model, year, price, description, image };
    handelUpdate(car.id, updatedCar); 
  };

  return (
    <div className="update-car-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="brand" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <input type="text" name="model" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
        <input type="number" name="year" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <input type="number" name="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit">Update Car</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateCar;