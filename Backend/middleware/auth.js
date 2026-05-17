import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    try {

        const token = req.headers.token;

        // TOKEN NOT FOUND
        if (!token) {

            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }

        // VERIFY TOKEN
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // SAVE DATA
        req.body.userId = decoded.id;
        req.body.role = decoded.role;

        next();

    }

    catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Invalid Token"
        })
    }
}

export default authMiddleware