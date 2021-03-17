import mongoose from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    contents: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 10,
    },
    fileUrl: {
        type: String,
        default:
            "https://uploads-ssl.webflow.com/5fa49896937b3a2ae974304c/5fc822839dd50a27b1bcc9b6_spinning-plates-301x201.jpg",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD"),
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const Post = mongoose.model("post", PostSchema);

export default Post;
