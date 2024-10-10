import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
    getFuncionariosPorID,
    apagarFuncionarioPeloID,
    atualizaFuncionario,
} from "../../../controller/funcionario/funcionario";

const handler = nc({ onError });
handler.get(getFuncionariosPorID);
handler.delete(apagarFuncionarioPeloID);
handler.put(atualizaFuncionario);
export default handler;