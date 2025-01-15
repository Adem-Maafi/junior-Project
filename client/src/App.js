import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios"

import SearchBar from "./component/SearchBar.jsx";
import AddCar from "./component/AddCar.jsx"
import CarCard from "./component/CarCard.jsx"



function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  
  // const [editingCar, setEditingCar] = useState(null);

  

  const fetchCars = () => {
    axios.get('http://localhost:5000/api/cars')
      .then(res => {
        setCars(res.data);
        setFilteredCars(res.data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  };

  const handleSearch = (searchTerm) => {
    const filtered = cars.filter(car =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const handelAddCar = async (body) => {
    console.log("car add", body);
    try {
      await axios.post("http://localhost:5000/api/cars/add", body, {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set
        },
      });
      fetchCars();
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please check the data and try again."); // User-friendly error message
    }
  };



  const handelUpdate = (id,body) => {
    console.log("id",id);
    
    axios
      .put(`http://localhost:5000/api/cars/${id}`, body)
      .then((res) => {
        console.log("updated successfully");
        fetchCars();
      })
      .catch((error) => {
       throw error
      });
  };

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`);
     
      fetchCars()
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };
  
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="container">
      <div className="header-actions">
        <SearchBar onSearch={handleSearch} />
    
      </div>

      <AddCar handelAddCar={handelAddCar} />
      
      <CarCard cars={filteredCars} handleDelete={handleDelete} handelUpdate={handelUpdate} />
       
   
    </div>
  );
}

export default App;