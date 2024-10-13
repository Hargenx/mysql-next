import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
    getTodosFuncionarios,
    salvarFuncionario,
} from "../../../controller/funcionario/funcionario";
const handler = nc(onError);
handler.get(getTodosFuncionarios);
handler.post(salvarFuncionario);
export default handler;