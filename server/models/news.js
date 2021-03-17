import mongoose from "mongoose";
import moment from "moment";

const NewsSchema = new mongoose.Schema({
    titie: {
        type: String,
        required: false,
        index: true,
    },
    contents: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        default: "",
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD-hh-mm"),
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const News = mongoose.model("news", NewsSchema);

export default News;
