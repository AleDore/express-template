import * as express from "express";
import * as http from "http";
import { getConfigOrThrow } from "./utils/config";
import { log } from "./utils/logger";
import { getCurrentPackageVersion } from "./utils/package";

const config = getConfigOrThrow();

// tslint:disable-next-line: no-let
let server: http.Server;

const app = express();
app.get("/info", (_, res) =>
  res.status(200).json({
    version: getCurrentPackageVersion()
  })
);

server = http
  .createServer(app)
  .listen(config.SERVER_PORT, () =>
    log.info(`Server listening at port ${config.SERVER_PORT}`)
  );

server.on("close", () => {
  app.emit("server:stop");
  log.info("HTTP server close.");
});
