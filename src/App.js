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
 * Procura os dados dos donos dos animais, através da API
 * @returns 
 */
async function getDonos() {
  // ler dados da API
  let dados = await fetch("api/donosAPI/");

  // se não se conseguir ler os dados...
  if (!dados.ok) {
    console.error(dados);
    throw new Error("Não foi possível obter os dados dos Donos. Código: ",
      dados.status)
  }
  // devolver os dados lidos
  return await dados.json();
}

/**
 * função para remover um animal da base de dados, através da API
 * @param {*} idAnimal 
 */
async function apagaAnimal(idAnimal) {

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
    console.error("resposta: ", resposta);
    throw new Error("Não foi possível remover o animal. Código: ", resposta.status)
  }
  else {
    alert("O animal foi bem apagado...");
  }
}

/**
 * Adição dos dados do novo Animal para a API
 * 
 *  Submissão de dados para a API
 *    https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
 *    https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
 * @param {*} animal 
 */
async function adicionaAnimal(animal) {
  //  preparar os objeto que transporta os dados para a API
  let formData = new FormData();
  formData.append("Nome", animal.Nome);
  formData.append("Especie", animal.Especie);
  formData.append("Raca", animal.Raca);
  formData.append("Peso", animal.Peso);
  formData.append("DonoFK", animal.DonoFK);
  formData.append("fotoAnimal", animal.Foto);
  // concretizar o transporte
  let resposta = await fetch("api/AnimaisAPI",
    {
      method: "Post",
      body: formData
    }
  );
  // validar a qualidade da resposta
  if (!resposta.ok) {
    console.error("resposta: ", resposta);
    throw new Error("Não foi possível adicionar o animal. Código: ", resposta.status)
  }
}


class App extends React.Component {
  // dados a serem manipulados dentro do componente
  state = {
    animais: [],
    donos: [],
  }

  /**
   * este método funciona como se fosse o 'startup'
   * do componente
   */
  componentDidMount() {
    // vai ser dada ordem de carregamento dos dados dos Animais
    this.LoadAnimais();
    // e, dos donos
    this.LoadDonos();
  }

  /**
   * Carregar os dados dos Animais da API
   */
  async LoadAnimais() {
    try {
      let animaisDaAPI = await getAnimais();
      this.setState({ animais: animaisDaAPI })
    } catch (erro) {
      console.error("Ocorreu um erro no acesso aos dados da API", erro);
    }
  }

  /**
     * Carregar os dados dos Donos da API
     */
  async LoadDonos() {
    try {
      let donosDaAPI = await getDonos();
      this.setState({ donos: donosDaAPI })
    } catch (erro) {
      console.error("Ocorreu um erro no acesso aos dados da API", erro);
    }
  }

  /**
   * envia a identificação dos dados do animal
   * para eliminação na API
   * @param {*} idAnimal 
   */
  handleRemoveAnimal = async (idAnimal) => {
    try {
      // invoca a remoção do Animal
      await apagaAnimal(idAnimal);
    } catch (error) {
      console.error("Ocorreu um erro na eliminação do Animal")
    }
    // atualizar os dados da Tabela
    await this.LoadAnimais();
  }

  /**
   * envia os dados do novo animal para a API
   * @param {*} novoAnimal 
   */
  // public void handleAdicionaAnimal(Animal novoAnimal)
  handleAdicionaAnimal = async (novoAnimal) => {
    try {
      // invoca a adição do Animal
      await adicionaAnimal(novoAnimal);
    } catch (error) {
      console.error("Ocorreu um erro na adição do Animal")
    }
    // atualizar os dados da Tabela
    await this.LoadAnimais();
  }



  render() {
    // ler os dados do state, para o Render os poder utilizar
    const { animais, donos } = this.state;

    return (
      <div className="container">
        <h1>Animais</h1>
        <h4>Adição de novo animal:</h4>
        <Formulario donosIN={donos} novoAnimalOUT={this.handleAdicionaAnimal} />
        <br />

        <h4>Animais:</h4>
        <Tabela dadosAnimaisIN={animais} idAnimalOUT={this.handleRemoveAnimal} />
        <br />



      </div>
    )
  }
}


export default App;
