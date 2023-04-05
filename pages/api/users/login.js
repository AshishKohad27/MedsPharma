const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
import authModel from "../../../models/user.model"

export default async function loginRoute(
    req,
    res
) {
    if (req.method === "POST") {
        //1. Getting data from body
        const { email, password } = req.body;
        console.log("email, password:", email, password);
        try {
            const userExistOrNot = await authModel.findOne({ email });

            //2. if user not signup in our app he have to signup first
            if (userExistOrNot.length === 0) {
                return res.status(400).send({
                    message: "User With this Email Id Not Exist!",
                });
            }

            //3. password verify by argon2 package
            if (await argon2.verify(userExistOrNot.password, password)) {
                //3. Creating Token
                const access_token = jwt.sign(
                    { _id: userExistOrNot._id, email: userExistOrNot.email, name: userExistOrNot.name },
                    "PAYPAL_27",
                    { expiresIn: "4days" }
                );

                //4. Create Refresh Token
                const refresh_token = jwt.sign(
                    { _id: userExistOrNot._id },
                    "PAYPAL_27_REFRESH",
                    { expiresIn: "7days" }
                );

                return res
                    .status(201)
                    .send({ message: "Login Successfully!", access_token, refresh_token });
            } else {
                return res.status(203).send({
                    message: "Wrong Credentials",
                });
            }
        } catch (e) {
            console.log(e.message);
            return res.status(401).send({
                message: "Error Occurs",
                desc: e.message,
            });
        }
    }
}
