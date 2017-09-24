import client from "./client";
import security from "./security";

const middleware = [...client, ...security];

export default middleware;