const { transports, format, createLogger } = require("winston");

const { combine, timestamp, label, printf, colorize } = format;

const mongoLogger = createLogger({
  format: combine(
    timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
    label({ label: "MongoDB" }),
    printf(
      ({ label, level, message, timestamp }) =>
        `${label} | ${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console({
      format: colorize({ all: true }),
    }),
  ],
});

module.exports = mongoLogger;
