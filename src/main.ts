import { config } from 'dotenv';
import 'reflect-metadata';
import * as http from 'http';
import App from './core/app';
import { connect, errorMiddleware } from './helpers';
import { bootstrap } from './core/helpers';
import { LOCAL_PORT } from './shared/constants';
import express, { Application } from 'express';
import { apiControllers } from './controllers';
import cors from 'cors';

config();
const port: string | number = process.env.PORT || LOCAL_PORT;
const app = new App(
  (app: Application) => {
    app.use(cors());
    app.use(express.json());
  },
  apiControllers,
  errorMiddleware
);
const server = http.createServer(app.getInstance());

bootstrap(port, async () =>
  connect(() =>
    server.listen(port, () => console.log(`Server started on port ${port}`))
  )
).then();
