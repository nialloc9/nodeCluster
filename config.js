import express from "express";
import bodyParser from "body-parser";
import middleware from "./middleware";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware
app.use(...middleware);

// Don't expose any software information to potential hackers.
app.disable("x-powered-by");

export { app };
