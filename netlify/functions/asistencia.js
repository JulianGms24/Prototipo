import { routerAsistencias } from "../routers/asistenciaRouter.js";

export async function handler(event, context) {
    return routerAsistencias(event);
}
