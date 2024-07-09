import { Request, Response } from "express";
import {
  personsRoutes,
  tenantsRoutes,
  user_credentialsRoutes,
  usersRoutes,
} from "./routes";
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

app.use("/api/tenants", tenantsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/persons", personsRoutes);
app.use("/api/user_credentials", user_credentialsRoutes);

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
