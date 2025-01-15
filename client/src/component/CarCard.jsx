import React, { useState } from 'react';
import './CarCard.css';
import UpdateCar from './updateCar.jsx';

function CarCard({ cars, handleDelete, handelUpdate }) {
  const [show, setShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
    setSelectedCar(null);
  };

  return (
    <div className="car-card">
      {cars.map((el) => (
        <div key={el.id}>
          <img src={el.image} alt={`${el.brand} ${el.model}`} />
          <h3>{el.brand} {el.model}</h3>
          <p>Year: {el.year}</p>
          <p>Price: ${el.price}</p>
          <p>{el.description}</p>
          <div className="car-card-actions">
            <button onClick={() => handleEditClick(el)}>Edit</button>
            <button onClick={() => handleDelete(el.id)}>Delete</button>
          </div>
          {show && selectedCar && selectedCar.id === el.id && (
            <UpdateCar
              car={selectedCar}
              handelUpdate={handelUpdate}
              onCancel={handleCancel}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CarCard;