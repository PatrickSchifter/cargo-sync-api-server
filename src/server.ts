import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { config } from "./config/config";

const app = express();
const port = config.server.port;

app.set("trust proxy", 1);
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

app.get("/api/ip", (request, response) => response.send(request.ip));
app.get("/_health", (req, res) => {
  res.status(200).send("ok");
});
/**
 * @openapi
 * /_health:
 *   get:
 *     description: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health check
 *         content:
 *           application/json:
 *             example:
 *               message: "ok"
 */

const apiServerUrl = `${config.server.base_url}/api`;
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: `Cargo Sync API Server`,
      version: "1.0.0",
    },
    servers: [
      {
        url: apiServerUrl,
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./src/**/**/*.{js,ts}"],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send("System is running.");
});

server.listen(port, () => {
  console.info(`⚡ Server is running on: localhost:${port} and port ${port}`);
});

export default app;
