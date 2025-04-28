import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "build" }, quiet: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom API routes (if needed)
  server.get("/api/custom", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  // Catch-all route for Next.js
  server.all("/*splat", (req, res) => {
    return handle(req, res);
  });

  server.all("/", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
