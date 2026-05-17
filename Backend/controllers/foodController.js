import foodModel from "../models/foodModel.js";
import fs from 'fs'; // ✅ Add this

// Add food-item
const addFood = async (req, res) => {
  const image_filename = req.file.filename;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ Get all food items
const getFoodList = async (req, res) => {
  try {
    const foodItems = await foodModel.find(); // fetch all items from DB
    res.json({ success: true, data: foodItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Remove food item
const removeFood = async (req, res) => {
  const { id } = req.body;

  try {
    const foodItem = await foodModel.findById(id);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    const imagePath = `uploads/${foodItem.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // delete image file
    }

    await foodModel.findByIdAndDelete(id); // delete from DB

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addFood, getFoodList, removeFood };
