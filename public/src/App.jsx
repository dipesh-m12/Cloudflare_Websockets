import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(
  "https://relating-complexity-pursuant-appeal.trycloudflare.com"
);
function App() {
  const [msg, setMsg] = useState();
  const [count, setCount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("message");
    socket.emit("send-msg", { message });

    e.target.reset();
  };
  socket.on("msg-receive", (message) => {
    setMsg(message);
  });
  // useEffect(() => {
  //   async function nameless() {
  //     const { data } = await axios.get(
  //       "https://relating-complexity-pursuant-appeal.trycloudflare.com/"
  //     );
  //     console.log(data);
  //     setMsg(data);
  //   }
  //   nameless();
  // }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <form onSubmit={handleSubmit}>
          <input type="text" required name="message" />
          <button type="submit">Send</button>
        </form>
        <div>{msg}</div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
