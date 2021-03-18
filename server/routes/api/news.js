import express from "express";

//Model
import News from "../../models/news";
import User from "../../models/user";
import "@babel/polyfill";
import auth from "../../middleware/auth";

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const router = express.Router();

import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import { isNullOrUndefined } from "util";
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: "blog89/upload",
        region: "ap-northeast-2",
        key(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 100 * 1024 * 1024 },
});

// @route    News api/news/image
// @desc     Create a Post
// @access   Private

router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
    try {
        console.log(req.files.map(v => v.location));
        res.json({ uploaded: true, url: req.files.map(v => v.location) });
    } catch (e) {
        console.error("newapi에러발생!", e);
        res.json({ uploaded: false, url: null });
    }
});

// api/post
router.get("/", async (req, res) => {
    const newsFindeResult = await News.find();
    const result = { newsFindeResult };
    res.json(result);
});

// @route   POST news/post
// @desc    Create a News
// @access  Private

router.post("/", auth, uploadS3.none(), async (req, res, next) => {
    try {
        console.log("req", req);
        const { title, contents, fileUrl, creator } = req.body;
        const newNews = await News.create({
            title,
            contents,
            fileUrl,
            creator: req.user.id,
            date: moment().format("YYYY-MM-DD-HH-mm"),
        });
        if (true) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    news: newNews._id,
                },
            });
        }
        return res.redirect(`/api/news/${newNews._id}`);
    } catch (e) {
        console.log("에러발생!", e);
    }
});

// @route   POST api/news/:id
// @desc    Detail News
// @access  Public

router.get("/:id", async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id) //
            .populate("creator", "name");
        news.view += 1;
        news.save();
        console.log(news);
        res.json(news);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

// @route   Delete api/news
// @desc    Delete a News
// @access  Private

router.delete("/:id", auth, async (req, res) => {
    await News.deleteMany({ _id: req.params.id });
    await User.findByIdAndUpdate(req.user.id, {
        $pull: {
            news: req.params.id,
        },
    });
    return res.json({ success: true });
});

// @route   Get api/news/:id/edit
// @desc    Edit News
// @access  Private
router.get("/:id/edit", auth, async (req, res, next) => {
    try {
        const news = await News.findById(req.params.id).populate(
            "creator",
            " name"
        );
        res.json(news);
    } catch (e) {
        console.error(e);
    }
});

router.post("/:id/edit", auth, async (req, res, next) => {
    console.log(req, "api/news/:id/edit");
    const {
        body: { title, contents, fileUrl, id },
    } = req;
    try {
        const modified_news = await News.findByIdAndUpdate(
            id,
            {
                title,
                contents,
                fileUrl,
                date: moment().format("YYYY-MM-DD"),
            },
            { new: true }
        );
        console.log(modified_news, "edit modified");
        res.redirect(`/api/news/${modified_news.id}`);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

export default router;
