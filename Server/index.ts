import express, { Request, Response } from "express";
import taskRoutes from "./router/tasks";
import userRouter from "./router/user";
import { graphqlHTTP } from "express-graphql";
import {schema} from "./graphql/schema";
import connectDB from "./db/connect";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

const PORT:string | number = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello from Express server");
})

app.use("/tasks", taskRoutes);
app.use("/users", userRouter);

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(PORT, ():void => console.log(`Server running on port ${PORT}`));
