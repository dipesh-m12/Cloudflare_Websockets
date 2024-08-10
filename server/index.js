const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
});

const server = app.listen(5001, () => {
  console.log("Server Running...");
});

const io = socket(server, {
  cors: {
    origin: "*", //all
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("User connected");
  global.chatSocket = socket;

  socket.on("send-msg", (data) => {
    socket.broadcast.emit("msg-receive", data.message);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
