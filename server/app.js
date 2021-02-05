import express from "express";
import hpp from "hpp";
import helmet from "helmet";
import mongoose from "mongoose";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import path from "path";
// Routes
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import searchRoutes from "./routes/api/ search";

const app = express();
const { MONGO_URI } = config;

const prod = process.env.NODE_ENV === "prodction";

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB connecting Sucess!"))
    .catch(e => console.log(e));

// Use routes
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

if (prod) {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/build", index.html));
    });
}

export default app;
