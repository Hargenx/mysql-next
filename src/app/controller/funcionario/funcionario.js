import { executeQuery } from "../../config/db";
import validadorFuncionario from "../../common/validadorFuncionario";
import ErrorHandler from "../../common/errorHandler";
import validadorFuncionario from "../../common/validadorFuncionario";
const getTodosFuncionarios = async (_, res) => {
    try {
        console.log("Todos os funcionarios");
        let dados = await executeQuery("SELECT * FROM funcionario", []);
        res.send(dados);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getFuncionariosPorID = async (req, res, next) => {
    let id = req.query.id;
    try {
        console.log("Funcionarios por ID");
        let dados = await executeQuery(
            `SELECT * FROM funcionario WHERE func_id=${id}`,
            []
        );
        if (dados.length > 0) res.status(200).json(dados);
        else {
            next(new ErrorHandler(`Não foi encontrado funcionario com este ID ${id}`, 404));
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const apagarFuncionarioPeloID = async (req, res, _ ) => {
    let id = req.query.id;
    try {
        let data = await executeQuery(
            "DELETE FROM funcionario WHERE func_id = ?",
            [id]
        )
        res.status(200).json("Funcionario excluido com sucesso");
    } catch (err) {
        res.status(500).json(err);
    }
};

const salvarFuncionario = async (req, res) => {
    try {
        const resultado = req.body;
        const { func_nome, func_email, func_ender, func_tel } = resultado;
        let { error } = validadorFuncionario(resultado);
        if (error) {
            res.status(400).json(error.details[0].message);
        } else {
            console.log("Requisição");
            let dados = await executeQuery(
                "INSERT INTO funcionario(func_nome,func_email,func_ender,func_tel) VALUES(?,?,?,?)",
                [func_nome, func_email, func_ender, func_tel]
            );
            dados = await executeQuery(
                `SELECT * FROM funcionario WHERE func_id=${dados.insertId}`
            );
            res.status(201).json(dados);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const atualizaFuncionario = async (req, res) => {
    let id = req.query.id;
    console.log("id", id);
    const { func_nome, func_email, func_ender, func_tel } = req.body;
    console.log("req.body", req.body);
    try {
        let dados = await executeQuery(
            "SELECT * FROM funcionario WHERE func_id=?",
            [id]
        );
        if (dados.length > 0) {
            console.log("put request", dados);
            dados = await executeQuery(
                `UPDATE funcionario SET func_nome=?,func_email=?,func_ender=?,func_tel=? WHERE func_id=${id}`,
                [func_nome, func_email, func_ender, func_tel]
            );
            res.status(200).json(dados);
        } else {
            res.status(400).json(`funcionario não encontrado com essa id=${id}`);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    getTodosFuncionarios,
    getFuncionariosPorID,
    apagarFuncionarioPeloID,
    salvarFuncionario,
    atualizaFuncionario,
};