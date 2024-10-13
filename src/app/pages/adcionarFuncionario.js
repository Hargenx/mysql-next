import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/AdcicionarFuncionario.module.css";
function AdcicionarFuncionario() {
    const router = useRouter();
    const [adcionarFuncionario, setFuncionario] = useState({
        func_nome: "",
        func_email: "",
        func_ender: "",
        func_tel: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        let data = await axios.post(
            `http://localhost:3000/api/funcionario`,
            adcionarFuncionario
        );
        if (data.data) router.push("/");
        setFuncionario({
            func_nome: "",
            func_email: "",
            func_ender: "",
            func_tel: "",
        });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("value", value);
        setFuncionario({ ...adcionarFuncionario, [e.target.name]: value });
    };
    return (
        <>
            <div className={styles.addform}>
                <h1>Inserir Funcionario</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="func_nome"
                            placeholder="Entre com o nome"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_nome}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            className={styles.input}
                            name="func_email"
                            placeholder="Entre com o Email"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_email}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="func_ender"
                            placeholder="Entre com o endereço"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_ender}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="func_tel"
                            placeholder="Entre com telefone"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_tel}
                        />
                    </div>
                    <div>
                        <button type="submit"> Enviar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdcicionarFuncionario;