import  Express  from "express";
import { privateApi } from "./router/api"
import { ErrorMiddleware } from "./middleware/error-middleware";
import { publicRouter } from "./router/public-api";

export const app = Express();
app.use(Express.json())
app.use(publicRouter)
app.use(privateApi)
app.use(ErrorMiddleware)

app.listen(3000, () => console.log('listening on port 3000 | http://localhost:3000'))