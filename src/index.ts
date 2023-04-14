import express from "express";
import { Server as HttpServer } from "http";
import dns from "dns";
import os from "os";

process.env.ROOT_DIR = __dirname;
process.env.PUBLIC_DIR = process.env.ROOT_DIR + "/../public";
process.env.POST_PATH = process.env.ROOT_DIR + "/data/posts.json";
process.env.CONFIG_PATH = process.env.ROOT_DIR + "/data/config.json";

const ipPromise = dns.promises.resolve4(os.hostname()).then((adds) => process.env.IP = adds[0]) //only getting the first one, should resolve

import { createSocket } from "./controllers/socket";
import { router as posterRouter } from "./routes/poster";
import { router as showerRouter } from "./routes/shower";

const app = express();
const PORT = process.env.PORT || 8080;
app.use("/", express.static(process.env.PUBLIC_DIR))
app.use("/css", express.static(process.env.PUBLIC_DIR + "/../node_modules/bootstrap/dist/css"))
app.use("/js", express.static(process.env.PUBLIC_DIR + "/../node_modules/bootstrap/dist/js"))

app.use("/post", posterRouter)
app.use("/show", showerRouter)

app.get("/test", (req, res) => res.send("connection available"))

const server: HttpServer = createSocket(app);

server.listen(PORT, () => {
    ipPromise.then((ip) => console.log(`Shower up on http://${ip}:${PORT}/show`)) //is there a better way than using the promise.then? is this used correctly?
})