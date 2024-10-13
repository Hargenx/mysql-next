import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/AlteraFuncionario.module.css";
function AlteraFuncionario({ dadosDeAlterarFuncionario }) {
    console.log("funcionario_id", dadosDeAlterarFuncionario);
    const router = useRouter();
    const [adcionarFuncionario, setFuncionario] = useState({
        func_nome: "",
        func_email: "",
        func_ender: "",
        func_tel: "",
    });
    useEffect(() => {
        setFuncionario(dadosDeAlterarFuncionario[0]);
    }, [dadosDeAlterarFuncionario]);
    const onSubmit = async (e) => {
        e.preventDefault();
        let data = await axios.put(
            `http://localhost:3000/api/funcionario/${dadosDeAlterarFuncionario[0].func_id}`,
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
                <h1>Alterar funcionario</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="func_nome"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_nome}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            className={styles.input}
                            name="func_email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_email}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="func_ender"
                            placeholder="Enter Address"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_ender}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className={styles.input}
                            name="func_tel"
                            placeholder="Enter Phone"
                            onChange={handleChange}
                            value={adcionarFuncionario.func_tel}
                        />
                    </div>
                    <div>
                        <button type="submit" className={styles.button}>
                            Submit
                        </button>
                        <button className={styles.button}>
                            <Link href={`/`}>Voltar</Link>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AlteraFuncionario;