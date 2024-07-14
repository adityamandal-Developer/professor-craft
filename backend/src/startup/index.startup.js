const { logger } = require("../helpers/logger.helpers");

const { PORT } = process.env


module.exports = async (app) => {
    await require("./db.startup")(app);
    await require("./routes.startup")(app);
    // await require("./error.startup")(app);

    app.listen(PORT || 3001, () => {
        console.log('\x1b[36m%s\x1b[0m', `Server running on port ${PORT} 🟢`);
        logger.info("🛣️  Server is live");
    })
};
