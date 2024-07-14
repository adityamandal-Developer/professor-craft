const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { logger } = require("../helpers/logger.helpers");
//routers

module.exports = (app) => {
    app.use(express.json({ limit: 10 }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(cookieParser());
    app.use(morgan('tiny'));

    app.get("/", (req, res) =>
        res.send({
            error: false,
            message: "server is live!",
            result: null,
        })
    );
    app.use((req, res) =>
        res
            .status(404)
            .send({ error: true, message: "ops! an error occurred", result: null })
    );
};

console.log("\x1b[35m%s\x1b[0m", "Routes Setup is Sucessfully Completed 🛣️");
logger.info("🛣️  Routes setup completed");

