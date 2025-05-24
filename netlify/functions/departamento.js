import { routerDepartamentos } from "../routers/departamentoRouter.js";

export async function handler(event, context) {
    return routerDepartamentos(event);
}
