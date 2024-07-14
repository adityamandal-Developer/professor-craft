const mongoose = require("mongoose");
const { logger } = require("../helpers/logger.helpers");

const { DB_URL } = process.env;

module.exports = () => {
    return mongoose
        .connect(DB_URL)
        .then((res) =>
            console.log("\x1b[35m%s\x1b[0m", "Database is connect sucessfully⚡"),
            logger.info("Database connected")
        )
        .catch(
            (err) =>
                console.log(
                    "\x1b[31m%s\x1b[0m",
                    "Database not connect sucessfully❗",
                    err
                )
        );
};
