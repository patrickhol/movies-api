import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
// @ts-ignore
import logo from 'asciiart-logo';
import config from './config/index';
import movieRouter from './resources/movie/movie.router';
import mongoose from 'mongoose';

const packageJson = require('../package.json');
packageJson.font = 'Speed';
packageJson.logoColor = 'bold-green';
packageJson.textColor = 'green';
packageJson.borderColor = 'grey';

export const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(json());

// @TODO write logs to the console
app.use(morgan('dev'));
// @TODO write logs to the log file
app.use(
  morgan('combined', {
    stream: require('fs').createWriteStream('app/logs/out.log')
  })
);
app.use('/api/v1', movieRouter);

export const start = async () => {
  try {
    mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected', function() {
      console.log('Mongoose connection open to ' + config.dbUrl);
    });
    mongoose.connection.on('error', function(err) {
      console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function() {
      console.log('Mongoose connection disconnected');
    });
    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
      });
    });
    app
      .listen(config.port, () => {
        console.log(logo(packageJson).render());
        console.log(`Node.js start on port: ${config.port}`);
      })
      .setTimeout(5000);
  } catch (e) {
    console.error('There are error in Movies Service: ', e);
  }
};
