import { Request, Response } from "express";
import { userRoutes } from "./routes";
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("server Testing 3000 port");
});

app.use("/api/tenants", userRoutes);

app.listen(port, () => console.log(`server start on port ${port}`));

///test work
// import { Request, Response } from "express";

// require("dotenv").config();
// const express = require("express");
// const port = process.env.PORT;
// const app = express();

// //regulaar middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const userRouter = require("./routes/userRoute");

// app.use("/api", userRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from Prisma server");
// });

// app.listen(port, () => {
//   console.log(`Surver running ${port}.`);
// });
