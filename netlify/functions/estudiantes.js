import { routerEstudiantes } from "../routers/estudianteRouter.js";

export async function handler(event, context) {
    return routerEstudiantes(event);
}
