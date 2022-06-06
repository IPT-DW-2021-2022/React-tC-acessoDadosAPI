/**
 * App.js
 */

import React from "react";
import Tabela from "./Tabela";

/**
 * função para aceder à API e ler os dados dos Animais
 */
async function getAnimais() {
  // ler dados da API
  let dados = await fetch("https://localhost:7181/api/animaisAPI/");

  // se não se conseguir ler os dados...
  if (!dados.ok) {
    console.error(dados);
    throw new Error("Não foi possível obter os dados dos Animais. Código: ",
      dados.status)
  }

  // devolver os dados lidos
  return await dados.json();
}





class App extends React.Component {

  state = {
    animais: [],
  }

  /**
   * este método funciona como se fosse o 'startup'
   * do componente
   */
  componentDidMount() {
    // vai ser dada ordem de carregamento dos dados dos Animais
    this.loadAnimais();
  }

  /**
   * Carregar os dados dos Animais da API
   */
  async loadAnimais() {
    try {
      let animaisDaAPI = await getAnimais();
      this.setState({ animais: animaisDaAPI })
    } catch (erro) {
      console.error("Ocorreu um erro no acesso aos dados da API", erro);
    }
  }


  render() {
    // ler os dados do state, para o Render os poder utilizar
    const { animais } = this.state;

    return (
      <div className="container">
        <h1>Animais</h1>
        <h4>Adição de novo animal:</h4>
        {/* <Formulario /> */}
        <br />

        <h4>Animais:</h4>
        <Tabela dadosAnimaisIN={animais} />
        <br />



      </div>
    )
  }
}


export default App;
