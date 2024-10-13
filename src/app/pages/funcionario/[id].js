import AlteraFuncionario from "../AlteraFuncionario";

function atualizaFuncionario({ funcionario }) {
    console.log("funcionario", funcionario);
    return <AlteraFuncionario atualizarDadosFuncionario={funcionario} />;
}

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:3000/api/funcionario/${params.id}`);
    const funcionario = await res.json();

    return {
        props: { funcionario },
    };
}

export default atualizaFuncionario;