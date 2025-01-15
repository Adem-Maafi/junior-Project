const { User, Car } = require('../config/database');
const bcrypt = require('bcrypt');


module.exports = {
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            if (!username || !password || !email) {
                return res.status(400).send({ message: "All fields are required" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword, email });

            res.status(201).send({ message: "User registered", user });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).send({ message: "Username and password are required" });
            }
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).send({ message: "Invalid password" });
            }
            res.status(200).send({ message: "Login successful", user: { id: user.id, username: user.username } });
    
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    getUserCars: async (req, res) => {
        try {
            const userId = req.user.id;
            const cars = await Car.findAll({ where: { userId } });
            res.status(200).json(cars);
        } catch (error) {
            console.error("Error fetching user cars:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
};
