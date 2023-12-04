const pino = require('pino');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const today = new Date();
const fileNameLog = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
const logFileStream = fs.createWriteStream('./',{ flags: 'a' });


module.exports = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'trace',
        options: {
          colorize: true,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss'
        }
      },
      {
        target: 'pino/file',
        level: 'trace',
        options: {
          destination: `./reports/${fileNameLog}.log`,
          mkdir: true
        }
      }
    ]
  }
}, logFileStream);

