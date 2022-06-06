/**
 * Tabela.js
 */

import React, { Component } from "react";

/**
 * cria o cabeçalho da tabela
 * @returns void
 */
function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th>Peso</th>
                <th>Dono</th>
                <th>Fotografia</th>
            </tr>
        </thead>
    )
}

/**
 * constroi o corpo da tabela
 * @param {*} props : lista com os dados a serem disponibilizados na tabela
 * @returns 
 */
const Corpo = (props) => {
    // iterar todos os elementos do JSON
    // e gerar as linhas da tabela
    const rows = props.dadosRecebidosIN.map((row) => {
        return (
            <tr key={row.id}>
                <td>{row.nome}</td>
                <td>{row.especie}</td>
                <td>{row.raca}</td>
                <td>{row.peso}</td>
                <td>{row.nomeDono}</td>
                <td>{row.foto}</td>
            </tr>
        )
    })

    return (
        <tbody>{rows}</tbody>
    )
}

/**
 * componente Tabela
 */
class Tabela extends Component {
    render() {
        // ler os dados que são envidados
        // para dentro da componente
        // const dadosAlunosIN=this.props.dadosAlunosIN
        const { dadosAnimaisIN } = this.props

        return (
            <table className="table table-striped">
                <Cabecalho />
                <Corpo dadosRecebidosIN={dadosAnimaisIN} />
            </table>
        )
    }
}

export default Tabela