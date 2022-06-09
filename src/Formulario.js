/**
 * Formulario.js
 */

import React from "react";

class Formulario extends React.Component {
// criar um objeto no STATE para recolher
// e manipular os dados do Formulário
state={
    nomeAnimal:"",
    pesoAnimal:"",
    especieAnimal:"",
    racaAnimal:"",
    uploadFoto:null,
    idDonoFK:""
}

    render() {
        const{nomeAnimal,pesoAnimal,especieAnimal,racaAnimal}=this.state;
        return (
            <form>
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
                            className="form-control" /><br />
                        {/* o componente 'EscolheDono' irá ter dois parâmetros:
        - dadosDonosIN: serve para introduzir no componente a lista dos donos a representar na dropdown
        - donoEscolhidoOUT: serve para retirar do componente, o ID do dono que o utilizador escolheu,
                            que será entregue ao 'handlerDonoChange' */}
                        Dono: {/* <EscolheDono dadosDonosIN={donosIN}
                            donoEscolhidoOUT={this.handleDonoChange} /> */}
                        <br />
                    </div>
                </div>
                <input type="submit" value="Adicionar animal" className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Formulario;