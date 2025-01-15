const {Car}=require('../config/database')


module.exports={
    getAllCars:async(req,res)=>{
        try{
            const cars=await Car.findAll();
            return res.status(200).json(cars);
        }catch(err){
           throw err
        }
    },
    AddCar: async (req, res) => {
        try {
          const { brand, model, year, price, description, image } = req.body;
      
         
          if (!brand || !model || !year || !price || !description || !image) {
            return res.status(400).send({ message: "All fields are required" });
          }
      
          const addCar = await Car.create({ brand, model, year, price, description, image });
          res.status(201).send({ message: "Car added", Car: addCar });
        } catch (error) {
          console.error("Error adding car:", error);
          res.status(500).send({ message: "Internal server error" });
        }
      },
    FindOneCar:async(req,res)=>{
        const {id}=req.params
        try {
            const oneCar=await Car.findOne({where:{id:id}})
          res.status(201).send(oneCar)
        } catch (err) {
            throw err
        }
    },
    DeleteCar: async (req, res) => {
        const { id } = req.params;
    
        try {
            const car = await Car.findOne({ where: { id } });
            if (!car) {
                return res.status(404).send({ message: "Car not found" });
            }
    
            await Car.destroy({ where: { id } });
            res.send({ message: "Car deleted" });
        } catch (error) {
            console.error("Error deleting car:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    },

    UpdateCar: async (req, res) => {
        const { id } = req.params;
        const { brand, model, year, price, description, image } = req.body;
    
        try {
            
            if (!model) {
                return res.status(400).send({ message: "Model is required" });
            }
    
            const car = await Car.findOne({ where: { id } });
            if (!car) {
                return res.status(404).send({ message: "Car not found" });
            }
    
            const updatedCar = await Car.update(
                {
                    brand: brand || car.brand,
                    model: model || car.model,
                    year: year || car.year,
                    price: price || car.price,
                    description: description || car.description,
                    image: image || car.image,
                },
                { where: { id } }
            );
    
            res.send({ message: "Car updated", updatedCar });
        } catch (error) {
            console.error("Error updating car:", error);
            res.status(500).send({ message: "Internal server error" });
        }
    },
}