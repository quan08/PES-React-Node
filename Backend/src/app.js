// const express = require('express');
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import tableRoute from './routes/table';
import authRoute from './routes/auth';
import menuRoute from './routes/menu';
import settingsRoute from './routes/settings';

const app = express();
const swaggerJSDocs = YAML.load('./api.yaml');

// middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))

app.use("/api", authRoute);
app.use("/api", tableRoute);
app.use("/api", menuRoute);
app.use("/api", settingsRoute);
// connection db
mongoose.connect("mongodb://localhost:27017/asm")
    .then(() => console.log("Ket noi DB thanh cong"))
    .catch(error => console.log(error))
// connect
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy cổng ", PORT);
});
