const winston = require('winston');

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
]

class Logger {
    constructor() {
        this.initializeLogger();
    }

    initializeLogger() {
        this.logger = winston.createLogger({
            level: level(),
            format,
            transports,
        });
    }

    silly(message) {
        this.logger.silly(message);
    }

    debug(message) {
        this.logger.debug(message);
    }

    verbose(message) {
        this.logger.verbose(message);
    }

    http(message) {
        this.logger.http(message);
    }

    info(message) {
        this.logger.info(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    error(message) {
        this.logger.error(message);
    }
}

module.exports = new Logger();