// import ModelError from "/ModelError.js";

export default class Usuario {
    
  //-----------------------------------------------------------------------------------------//

  constructor(nome, codUsuario, email, senha) {
    this.setNome(nome);
    this.setCodUsuario(codUsuario);
    this.setEmail(email);
    this.setSenha(senha);     
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    // if(!Usuario.validarNome(nome))
    //   throw new ModelError("Nome Inválido: " + nome);
    this.nome = nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  getCodUsuario() {
    return this.codUsuario;
  }
  
  //-----------------------------------------------------------------------------------------//

  setCodUsuario(codUsuario) {
    // if(!Usuario.validarCodUsuario(codUsuario))
    //   throw new ModelError("Código de Usuário Inválido: " + codUsuario);
    this.codUsuario = codUsuario;
  }
  
  //-----------------------------------------------------------------------------------------//

  getEmail() {
    return this.email;
  }
  
  //-----------------------------------------------------------------------------------------//

  setEmail(email) {
    // if(!Usuario.validarEmail(email))
    //   throw new ModelError("Email inválido: " + email);
    this.email = email;
  }
  
  //-----------------------------------------------------------------------------------------//

  getSenha() {
    return this.senha;
  }
  
  //-----------------------------------------------------------------------------------------//

  setSenha(senha) {
    // if(!Usuario.validarSenha(senha))
    //   throw new ModelError("Senha inválida.");
    this.senha = senha;
  }
  
  //-----------------------------------------------------------------------------------------//

  adicionarDrink(drink) {
    // Implementação para adicionar uma bebida ao perfil do usuário
    console.log(`Drink ${drink} adicionado.`);
  }

  //-----------------------------------------------------------------------------------------//

  removerDrink(drink) {
    // Implementação para remover uma bebida do perfil do usuário
    console.log(`Drink ${drink} removido.`);
  }

  //-----------------------------------------------------------------------------------------//

  visualizarDrink() {
    // Implementação para visualizar bebidas adicionadas
    console.log("Bebidas adicionadas: ...");
  }

  //-----------------------------------------------------------------------------------------//

  static validarNome(nome) {
    if(!nome || nome.length > 40) 
      return false;
    const padraoNome = /^[a-zA-Zà-úÀ-Ú]+(\s[a-zA-Zà-úÀ-Ú]+)*$/;
    return padraoNome.test(nome);
  }

  //-----------------------------------------------------------------------------------------//

  static validarCodUsuario(codUsuario) {
    return codUsuario && /^[0-9]+$/.test(codUsuario);
  }

  //-----------------------------------------------------------------------------------------//

  static validarEmail(email) {
    const padraoEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/;
    return padraoEmail.test(email);
  }

  //-----------------------------------------------------------------------------------------//

  static validarSenha(senha) {
    return senha && senha.length >= 6; // ou outras regras de validação, se necessário
  }
  
  //-----------------------------------------------------------------------------------------//
}
