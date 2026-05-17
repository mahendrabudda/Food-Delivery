import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// CREATE TOKEN
const createToken = (id, role) => {

    return jwt.sign(

        {
            id,
            role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }
    )
}


// =========================
// ADMIN LOGIN
// =========================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // =========================
        // ADMIN LOGIN
        // =========================

        if (
            email === "mahendra.b23@iiits.in" &&
            password === "xxxx"
        ) {

            const adminToken = jwt.sign(

                {
                    role: "admin"
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }
            )

            return res.json({

                success: true,

                token: adminToken,

                role: "admin"
            })
        }


        // =========================
        // NORMAL USER LOGIN
        // =========================

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.json({

                success: false,

                message: "User does not exist"
            })
        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {

            return res.json({

                success: false,

                message: "Invalid Credentials"
            })
        }


        const token = createToken(
            user._id,
            "user"
        );


        res.json({

            success: true,

            token,

            role: "user"
        })

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"
        })
    }
}


// =========================
// REGISTER USER
// =========================

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // CHECK USER EXISTS
        const exists = await userModel.findOne({ email });

        if (exists) {

            return res.json({

                success: false,

                message: "User already exists"
            })
        }


        // VALIDATE EMAIL
        if (!validator.isEmail(email)) {

            return res.json({

                success: false,

                message: "Please enter valid email"
            })
        }


        // VALIDATE PASSWORD
        if (password.length < 8) {

            return res.json({

                success: false,

                message: "Please enter strong password"
            })
        }


        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        )


        // CREATE USER
        const newUser = new userModel({

            name,
            email,
            password: hashedPassword
        })


        const user = await newUser.save();


        // TOKEN
        const token = createToken(
            user._id,
            "user"
        );


        res.json({

            success: true,

            token,

            role: "user"
        })

    }

    catch (error) {

        console.log(error);

        res.json({

            success: false,

            message: "Error"
        })
    }
}


export {

    loginUser,

    registerUser
}