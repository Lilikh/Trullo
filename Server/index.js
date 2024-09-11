"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./router/tasks"));
const user_1 = __importDefault(require("./router/user"));
const connect_1 = __importDefault(require("./db/connect"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connect_1.default)();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello from Express server");
});
app.use("/tasks", tasks_1.default);
app.use("/users", user_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
