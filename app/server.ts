import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
// @ts-ignore
import logo from 'asciiart-logo';

const packageJson = require('../package.json');
packageJson.font = 'Speed';
packageJson.logoColor = 'bold-green';
packageJson.textColor = 'green';
packageJson.borderColor = 'grey';

export const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(
  morgan('combined', {
    stream: require('fs').createWriteStream('app/logs/out.log')
  })
);

export const start = async () => {
  try {
    app.listen(5000, () => {
      console.log(logo(packageJson).render());
      console.log(`Node.js start on port: 5000(HTTP)`);
    });
  } catch (e) {
    console.error('There are error in Movies Service: ', e);
  }
};
