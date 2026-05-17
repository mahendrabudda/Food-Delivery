import express from "express";

import {
  addFood,
  getFoodList,
  removeFood
}
from "../controllers/foodController.js";

import multer from "multer";

const foodRouter = express.Router();


// MULTER STORAGE
const storage = multer.diskStorage({

    destination: "uploads",

    filename: (req, file, cb) => {

        return cb(
            null,
            `${Date.now()}${file.originalname}`
        )
    }
})

const upload = multer({
    storage: storage
});


// ADMIN ROUTES (NO TOKEN)
foodRouter.post(
    "/add",
    upload.single("image"),
    addFood
)

foodRouter.post(
    "/remove",
    removeFood
)


// PUBLIC ROUTE
foodRouter.get(
    "/list",
    getFoodList
)

export default foodRouter;