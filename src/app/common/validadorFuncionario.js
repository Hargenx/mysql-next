import Joi from "joi";

const validadorFuncionario = (dados) => {
    const funcionarioSchme = Joi.object({
        func_nome: Joi.string().required(),
        func_email: Joi.string().required(),
        func_ender: Joi.string().required(),
        func_tel: Joi.string().required(),
    });
    return funcionarioSchme.validate(dados);
};

export default validadorFuncionario;