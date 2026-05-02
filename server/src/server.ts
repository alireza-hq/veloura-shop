import app from "./app";
import { env } from "./config/env";
import "./types/express";

const PORT = env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`API ON ${PORT}`);
});
