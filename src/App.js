/**
 * App.js
 */

import React from "react";
import Tabela from "./Tabela";
import Formulario from "./Formulario";

/**
 * função para aceder à API e ler os dados dos Animais
 * Para ultrapassar a resistência do CORS,
 * vamos criar um Proxy
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 * Depois de se definir o proxy, é NECESSÁRIO REINICIAR o React!
*/
async function getAnimais() {
  // ler dados da API
  let dados = await fetch("api/animaisAPI/");

  // se não se conseguir ler os dados...
  if (!dados.ok) {
    console.error(dados);
    throw new Error("Não foi possível obter os dados dos Animais. Código: ",
      dados.status)
  }

  // devolver os dados lidos
  return await dados.json();
}

/**
 * função para remover um animal da base de dados, através da API
 * @param {*} idAnimal 
 */
async function apagaAnimal(idAnimal){

  let formData = new FormData();
  formData.append("id", idAnimal);

  let resposta = await fetch("api/AnimaisAPI/" + idAnimal,
    {
      method: "Delete",
      body: formData
    }
  );
  // validar a qualidade da resposta
  if (!resposta.ok) {
    console.error("resposta: ",resposta);
    throw new Error("Não foi possível remover o animal. Código: ", resposta.status)
  }
  else {
    alert("O animal foi bem apagado...");
  } 
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


  handleRemoveAnimal = async (idAnimal) => {
    // invoca a remoção do Animal
     apagaAnimal(idAnimal);
    // atualizar os dados da Tabela
    this.loadAnimais();
  }

  render() {
    // ler os dados do state, para o Render os poder utilizar
    const { animais } = this.state;

    return (
      <div className="container">
        <h1>Animais</h1>
        <h4>Adição de novo animal:</h4>
        <Formulario />
        <br />

        <h4>Animais:</h4>
        <Tabela dadosAnimaisIN={animais}
          idAnimalOUT={this.handleRemoveAnimal} />
        <br />



      </div>
    )
  }
}


export default App;
