import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios"
import Register from "./component/Regiter.jsx"
import  Login from "./component/Login.jsx"
import SearchBar from "./component/SearchBar.jsx";
import AddCar from "./component/AddCar.jsx"
import CarCard from "./component/CarCard.jsx"
import Navbar from "./component/Navbar.jsx";


function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [view, setView] = useState("home"); // 'home', 'login', 'register', 'addCar'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchCars = () => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => {
        setCars(res.data);
        setFilteredCars(res.data);
      })
      .catch((err) => console.error("Error fetching cars:", err));
  };

  const handleSearch = (searchTerm) => {
    const filtered = cars.filter(
      (car) =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const handleAddCar = async (body) => {
    try {
      await axios.post("http://localhost:5000/api/cars/add", body, {
    
      });
      fetchCars(); 
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car. Please check the data and try again.");
    }
  };

  const handleUpdate = async (id, body) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, body);
      console.log("Updated successfully");
      fetchCars(); 
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car. Please try again.");
    }
  };

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`);
      fetchCars();
    } catch (err) {
      console.error("Error deleting car:", err);
      alert("Failed to delete car. Please try again.");
    }
  };

  const handleLogin = (username, password) => {
    setIsAuthenticated(true);
    setView("home");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView("home");
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="container">
      <Navbar
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        setView={setView}
      />

      {view === "home" && (
        <>
          <div className="header-actions">
            <SearchBar onSearch={handleSearch} />
          </div>
          <CarCard
            cars={filteredCars}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </>
      )}

      {view === "login" && <Login onLogin={handleLogin} />}
      {view === "register" && <Register />}
      {view === "addCar" && <AddCar handleAddCar={handleAddCar} />}
    </div>
  );
}

export default App;