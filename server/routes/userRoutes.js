import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "../middleware/validator.js";
import bcrypt from 'bcrypt';
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

router.post(
    "/register",
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //  return res.status(400).json({ errors: errors.array() });
        // }

        // console.log(req.body);
        //const userData = await userModel.findOne({ email });
        try {
            console.log("in register", req.body);
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);

            const uuid = uuidv4();
            console.log("in try");
            await userModel.create({
                user_id: uuid,
                email: req.body.email,
                password: secPassword,
            });

            const data = {
                user: {
                    user_id: uuid,
                    user_name: req.body.username,
                    email: req.body.email,
                },
            };

            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken: authToken });
            console.log("authToken=", authToken);
        } catch (error) {
            res.json({ success: false });
            console.log(error);
            console.log("in catch");
        }
    }
);
router.post("/login", async (req, res) => {
    // console.log(req.body);
    try {
        const userData = await userModel.findOne({ email: req.body.email });
        console.log("try LOGIN in", userData.curr_level);
        console.log("userData>>>>>", userData);
        if (!userData) {
            return res.status(400).json({ errors: "Invalid Credentials " });
        }
        const pwdCompare = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Invalid Credentials " });
        }

        const data = {
            user: {
                user_id: userData.user_id,
                user_name: req.body.username,
                email: req.body.email,
            },
        };

        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ curr_lvl: userData.curr_level, success: true, authToken: authToken });
    } catch (error) {
        res.json({ success: false });
        console.log(error);
        console.log("catch in");
    }
});
router.post("/level_update", validator, async (req, res) => {
    try {
        const reqData = req.body;
        const decData = req.decodedUser.user;
        console.log("body>>>>>>", reqData)
        const reqUser = await userModel.findOne({ user_id: decData.user_id });
        reqUser.curr_level = reqData.new_level;
        await reqUser.save();
        res.json({ curr_lvl: reqUser.curr_level, success: true, msg: "updated" });
    } catch (error) {
        res.json({ success: false });
        console.log(error);
        console.log("catch in");
    }
});
router.post("/hint_used", validator, async (req, res) => {
    try {
        const reqData = req.body;
        const decData = req.decodedUser.user;
        console.log("body>>>>>>", reqData)
        const reqUser = await userModel.findOne({ user_id: decData.user_id });
        if (reqData.lvl == 1) {
            reqUser.lvl1_hint_used = reqData.lvl1_hint_used;
        }
        else if (reqData.lvl == 2) {
            reqUser.lvl2_hint_used = reqData.lvl2_hint_used;

        }
        else if (reqData.lvl == 3) {
            reqUser.lvl3_hint_used = reqData.lvl3_hint_used;

        }
        else if (reqData.lvl == 4) {
            reqUser.lvl4_hint_used = reqData.lvl4_hint_used;

        }
        else if (reqData.lvl == 5) {
            reqUser.lvl5_hint_used = reqData.lvl5_hint_used;

        }
        await reqUser.save();
        res.json({ success: true, msg: "updated" });
    } catch (error) {
        res.json({ success: false });
        console.log(error);
        console.log("catch in");
    }
});
router.post("/reset", validator, async (req, res) => {
    try {
        // const reqData = req.body;
        const decData = req.decodedUser.user;
        const reqUser = await userModel.findOne({ user_id: decData.user_id });
        reqUser.lvl1_hint_used = false;
        reqUser.lvl2_hint_used = false;
        reqUser.lvl3_hint_used = false;
        reqUser.lvl4_hint_used = false;
        reqUser.lvl5_hint_used = false;
        reqUser.curr_level = 0;
        await reqUser.save();
        res.json({ success: true, msg: "updated" });
    } catch (error) {
        res.json({ success: false });
        console.log(error);
        console.log("catch in");
    }
});
router.post("/dashboard", async (req, res) => {
    try {
        // const reqData = req.body;
        // const decData = req.decodedUser.user;
        // const reqUser = await userModel.findOne({ user_id: req.body.ea });
        if (req.body.email == "admin@gmail.com") {
            let all_users = await userModel.find({});
            // await reqUser.save();
            res.json( all_users);
        }
    } catch (error) {
        res.json({ success: false });
        console.log(error);
        console.log("catch in");
    }
});

export default router;