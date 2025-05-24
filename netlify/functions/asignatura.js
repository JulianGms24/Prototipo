import { routerAsignaturas } from "../routers/asignaturaRouter.js";

export async function handler(event, context) {
    return routerAsignaturas(event);
}
