/**
 * Formulario.js
 */

import React from "react";

/**
 * Componente para apresentar uma 'dropdown' com os dados dos Donos
 * @param {*} props 
 * @returns 
 */
const EscolheDono = (props) => {
    const opcoes = props.dadosDonosIN.map((row) => {
        return (<option value={row.id}>{row.nome}</option>)
    })
    return (
        <select required
            className="form-select"
            onChange={props.donoEscolhidoOUT}>
            <option value="">Selecione, por favor, um dono</option>
            {opcoes}
        </select>
    )
}



class Formulario extends React.Component {
    // criar um objeto no STATE para recolher
    // e manipular os dados do Formulário
    state = {
        nomeAnimal: "",
        pesoAnimal: "",
        especieAnimal: "",
        racaAnimal: "",
        fotoAnimal: null,
        idDonoFK: "",
    }

    /**
         * handler para processar os dados inseridos nas 'textboxs'
         * @param {*} evento : o valor escrito na textbox
         */
    handleAdicao = (evento) => {
        const { name, value } = evento.target
        this.setState({ [name]: value })
    }

    /**
     * entrega ao React o ficheiro selecionado pelo utilizador
     * @param {*} evento 
     */
    handleFotoAnimal = (evento) => {
        this.setState({ fotoAnimal: evento.target.files[0] })
    }

    /**
     * entrega ao React o valor escolhido pelo utilizador,
     * na dropdown
     * @param {*} evento 
     */
    handleDonoChange = (evento) => {
        this.setState({ idDonoFK: evento.target.value })
    }

    /**
     * preparar os dados recolhidos pelo formulário 
     * para serem enviados para a API
     * @param {*} evento 
     */
    handleSubmitForm = (evento) => {
        // vamos começar por anular a ação
        // pré-definida do formulário.
        // Neste caso, não vai haver 'submit'
        evento.preventDefault();

        // preparar os dados para serem enviados para a API
        let dadosForm = {
            Nome: this.state.nomeAnimal,
            Especie:this.state.especieAnimal,
            Raca:this.state.racaAnimal,
            Peso: this.state.pesoAnimal,
            DonoFK: this.state.idDonoFK,
            Foto: this.state.fotoAnimal,
        }
        // exportar os dados para fora do Formulário
        this.props.novoAnimalOUT(dadosForm)
        // limpar o formulario
        this.setState({
            nomeAnimal:"",
            pesoAnimal:"",
            especieAnimal:"",
            racaAnimal:"",
        })
    }


    render() {
        // ler, dentro deste método, os dados do State e do Props
        // para poderem ser utilizados
        const { nomeAnimal, pesoAnimal, especieAnimal, racaAnimal } = this.state;
        const { donosIN } = this.props;

        return (
            <form method="Post"
                encType="multipart/form-data"
                onSubmit={this.handleSubmitForm}
            >
                <div className="row">
                    <div className="col-md-4">
                        Nome: <input type="text"
                            required
                            className="form-control"
                            name="nomeAnimal"
                            value={nomeAnimal}
                            onChange={this.handleAdicao}
                        /><br />
                        Peso: <input type="text"
                            required
                            className="form-control"
                            name="pesoAnimal"
                            value={pesoAnimal}
                            onChange={this.handleAdicao} />
                    </div>
                    <div className="col-md-4">
                        Espécie: <input type="text"
                            required
                            className="form-control"
                            name="especieAnimal"
                            value={especieAnimal}
                            onChange={this.handleAdicao} /><br />
                        Raça: <input type="text"
                            required
                            className="form-control"
                            name="racaAnimal"
                            value={racaAnimal}
                            onChange={this.handleAdicao} />
                    </div>
                    <div className="col-md-4">
                        Fotografia: <input type="file"
                            required
                            name="fotoAnimal"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handleFotoAnimal} /><br />
                        {/* o componente 'EscolheDono' irá ter dois parâmetros:
                            - dadosDonosIN: serve para introduzir no componente a lista dos donos a representar na dropdown
                            - donoEscolhidoOUT: serve para retirar do componente, o ID do dono que o utilizador escolheu,
                            que será entregue ao 'handlerDonoChange' */}
                        Dono: <EscolheDono dadosDonosIN={donosIN}
                            donoEscolhidoOUT={this.handleDonoChange} />
                        <br />
                    </div>
                </div>
                <input type="submit" value="Adicionar animal" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Formulario;