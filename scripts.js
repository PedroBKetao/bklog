document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('abastecimentoForm')?.addEventListener('submit', handleFormSubmit);


  const botaoCarregarLista = document.getElementById('carregarLista');
  if (botaoCarregarLista) {
    botaoCarregarLista.addEventListener('click', carregarListaAbastecimentos);
  }
});

// Function to handle user login
function fazerLogin() {
  const usernameInput = document.getElementById('nomeDeUsuario');
  const passwordInput = document.getElementById('senha');
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if the user exists in local storage
  const users = obterUsuarios();
  const user = users.find(user => user.username === username);

  if (user && user.password === password) {
    localStorage.setItem('usuarioLogado', username); // Store the username in local storage
    alert('Login bem-sucedido!');
    window.location.href = 'menu.html'; // Redirect to the menu.html page
  } else {
    alert('Usuario ou senha incorretos.');
  }
  usernameInput.value = '';
  passwordInput.value = '';
}

// Function for signing up a new user
function cadastrarUsuario() {
  const usernameInput = document.getElementById('newUsername');
  const passwordInput = document.getElementById('newPassword');
  const masterPasswordInput = document.getElementById('masterPassword');
  const username = usernameInput.value;
  const password = passwordInput.value;
  const masterPassword = masterPasswordInput.value;
  const masterSenha = "DarthVader666"; // Master password

  if (masterPassword !== masterSenha) {
    alert('Senha mestra incorreta.');
    return;
  }

  // Check if the user already exists
  const users = obterUsuarios();
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    alert('Este nome de usuário já está em uso. Escolha outro.');
    return;
  }

  // Add new user
  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem('usuarios', JSON.stringify(users));
  alert('Usuário cadastrado com sucesso!');
  usernameInput.value = '';
  passwordInput.value = '';
  masterPasswordInput.value = '';
  window.location.href = 'login.html';

}

// Function to validate the sign-up form fields
function validarCadastro() {
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const masterPassword = document.getElementById('masterPassword').value;

  if (!username || !password || !masterPassword) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return false;
  }

  return true;
}

// Função para obter a lista de usuários do armazenamento local
function obterUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}

document.getElementById('btnVoltar')?.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado'); // Remove the username from local storage
  window.location.href = 'login.html'; // Redirect to the login.html page
});

function goToCadastro() {
  window.location.href = 'cadastro.html';
}

function goToForm() {
  window.location.href = 'formulario.html';
}

function goToList() {
  window.location.href = 'lista.html';
}

function goToHome() {
  window.location.href = 'menu.html';
}

function toggleTheme() {
  const body = document.getElementById('body');
  const toggleButton = document.getElementById('toggleTheme');

  if (body.classList.contains('dark')) {
    toggleBodyTheme(false);
  } else {
    toggleBodyTheme(true);
  }
}

function toggleBodyTheme(darkMode) {
  const body = document.getElementById('body');
  const toggleButton = document.getElementById('toggleTheme');

  if (darkMode) {
    body.classList.add('dark');
    toggleButton.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    toggleButton.textContent = '🌙';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the form data
    const formData = new FormData(event.target);

    // Convert the form data to an object
    const formObject = Object.fromEntries(formData.entries());

    // Add the form object to the list of abastecimentos
    adicionarAbastecimentoLocalStorage(formObject);

    // Reset the form
    event.target.reset();

    // Show the success message
    exibirMensagemSucesso('Abastecimento adicionado com sucesso!');

    // Recarregar a lista
    recarregarTabelaAbastecimentos();
  }

  document.getElementById('abastecimentoForm')?.addEventListener('submit', handleFormSubmit);

  document.getElementById('filtroCavalo')?.addEventListener('input', filtrarPorCavalo);

  const botaoCarregarLista = document.getElementById('carregarLista');
  if (botaoCarregarLista) {
    botaoCarregarLista.addEventListener('click', carregarListaAbastecimentos);
  }
});


function adicionarAbastecimento() {
  try {
    // Obter dados do formulário
    const abastecimento = obterDadosFormulario();

    // Calcular KmRodado
    abastecimento.KmRodado = calcularKmRodado(abastecimento.KmAnterior, abastecimento.KmAtual);

    // Calcular ValorTotal
    abastecimento.ValorTotal = calcularValorTotal(abastecimento.Litragem, abastecimento.ValorLitro, abastecimento.Desconto);

    // Validar campos
    if (!validarCampos(abastecimento)) {
      throw new Error('Por favor, preencha todos os campos obrigatórios.');
    }

    // Adicionar abastecimento à lista
    adicionarAbastecimentoLocalStorage(abastecimento);

    // Exibir mensagem de sucesso
    exibirMensagemSucesso('Abastecimento adicionado com sucesso!');

    // Recarregar a lista
    recarregarTabelaAbastecimentos();
  } catch (error) {
    console.error(error.message);
    exibirMensagemErro('Ocorreu um erro ao adicionar o abastecimento. Verifique os campos e tente novamente.');
  }
}

function calcularKmRodado(kmAnterior, kmAtual) {
  return kmAtual - kmAnterior;
}

// Função para calcular o ValorTotal
function calcularValorTotal(litragem, valorLitro, desconto) {
  const valorSemDesconto = litragem * valorLitro;
  const valorComDesconto = valorSemDesconto - desconto;
  return valorComDesconto.toFixed(2); // Arredonda para 2 casas decimais
}

// Função para validar os campos do formulário
function validarCampos(abastecimento) {
  // Adicione aqui a lógica de validação dos campos do formulário
  // Retorna true se os campos são válidos, false caso contrário
  return abastecimento.Dados && abastecimento.Cavalo && abastecimento.KmAnterior && abastecimento.KmAtual && abastecimento.Combustivel && abastecimento.Litragem && abastecimento.ValorLitro && abastecimento.PostoCombustivel;
}

// Função para adicionar abastecimento ao localStorage
function adicionarAbastecimentoLocalStorage(abastecimento) {
  // Obter a lista de abastecimentos do localStorage
  const listaAbastecimentos = obterListaAbastecimentos();

  // Adicionar o novo abastecimento à lista
  listaAbastecimentos.push(abastecimento);

  // Salvar a lista atualizada no localStorage
  salvarListaAbastecimentos(listaAbastecimentos);
}

// Função para salvar a lista de abastecimentos no localStorage
function salvarListaAbastecimentos(listaAbastecimentos) {
  localStorage.setItem('abastecimentos', JSON.stringify(listaAbastecimentos));
}

// Função para obter a lista de abastecimentos do localStorage
function obterListaAbastecimentos() {
  return JSON.parse(localStorage.getItem('abastecimentos')) || [];
}

function exibirMensagemErro(mensagem) {
  const mensagemDiv = document.getElementById('mensagens');
  mensagemDiv.innerHTML = `<p class="erro">${mensagem}</p>`;
}

function editarAbastecimento(abastecimento) {
  // Atualizar o registro de abastecimento no localStorage
  const listaAbastecimentos = obterListaAbastecimentos();
  const index = listaAbastecimentos.findIndex(item => item.id === abastecimento.id);

  if (index !== -1) {
    listaAbastecimentos[index] = abastecimento;
    salvarListaAbastecimentos(listaAbastecimentos);
    recarregarTabelaAbastecimentos();
    exibirMensagemSucesso('Abastecimento atualizado com sucesso!');
  } else {
    exibirMensagemErro('Erro ao atualizar o abastecimento. Tente novamente.');
  }
}

function excluirAbastecimento(abastecimento) {
  // Remover o registro de abastecimento do localStorage
  const listaAbastecimentos = obterListaAbastecimentos();
  const index = listaAbastecimentos.findIndex(item => item.id === abastecimento.id);

  if (index !== -1) {
    listaAbastecimentos.splice(index, 1);
    salvarListaAbastecimentos(listaAbastecimentos);
    recarregarTabelaAbastecimentos();
    exibirMensagemSucesso('Abastecimento excluído com sucesso!');
  } else {
    exibirMensagemErro('Erro ao excluir o abastecimento. Tente novamente.');
  }
}function exibirMensagemSucesso(mensagem) {
  const mensagensDiv = document.getElementById('mensagens');
  const mensagemElement = document.createElement('div');
  mensagemElement.textContent = mensagem;
  mensagemElement.className = 'sucesso';

  mensagensDiv.innerHTML = ''; // Limpa mensagens existentes
  mensagensDiv.appendChild(mensagemElement);
}

function recarregarTabelaAbastecimentos() {
  const tbody = document.querySelector('#abastecimentoTable tbody');
  limparTabela(tbody);

  const listaAbastecimentos = obterListaAbastecimentos();
  listaAbastecimentos.forEach((abastecimento) => {
    const row = criarLinhaTabela(abastecimento);
    tbody.appendChild(row);
  });
}

function limparTabela(tabela) {
  tabela.innerHTML = '';
}

function criarLinhaTabela(abastecimento) {
  const row = document.createElement('tr');

  Object.values(abastecimento).forEach((value, index) => {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  });

  function criarBotaoCelula(label, onClickFunction, data) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = label;
    button.onclick = () => onClickFunction(data);
    cell.appendChild(button);
    return cell;
  }

  row.appendChild(criarBotaoCelula('Editar', editarAbastecimento, abastecimento));
  row.appendChild(criarBotaoCelula('Excluir', excluirAbastecimento, abastecimento));

  return row;
}

function carregarListaAbastecimentos() {
  const tbody = document.querySelector('#abastecimentoTable tbody');
  limparTabela(tbody);

  const listaAbastecimentos = obterListaAbastecimentos();
  listaAbastecimentos.forEach((abastecimento) => {
    const row = criarLinhaTabela(abastecimento);
    tbody.appendChild(row);
  })
  ;
}
function filtrarPorCavalo() {
  const filtroCavaloInput = document.getElementById('filtroCavalo');
  const filtroCavalo = filtroCavaloInput.value.toLowerCase();

  const listaAbastecimentos = obterListaAbastecimentos();
  const abastecimentosFiltrados = listaAbastecimentos.filter(abastecimento => {
    if (!abastecimento.Cavalo) return false;
    return abastecimento.Cavalo.toLowerCase().includes(filtroCavalo);
  });

  const tbody = document.querySelector('#abastecimentoTable tbody');
  limparTabela(tbody);

  abastecimentosFiltrados.forEach(abastecimento => {
    const row = criarLinhaTabela(abastecimento);
    tbody.appendChild(row);
  });
}
document.getElementById('filtroCavalo')?.addEventListener('input', filtrarPorCavalo);


  
const tbody = document.querySelector('#abastecimentoTable tbody');
limparTabela(tbody);

abastecimentosFiltrados.forEach(abastecimento => {
    const row = criarLinhaTabela(abastecimento);
    tbody.appendChild(row);
});




function sortTableByData() {
  const table = document.getElementById("abastecimentoTable");
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  rows.sort((a, b) => {
    const dateA = new Date(a.children[0].innerText);
    const dateB = new Date(b.children[0].innerText);
    return dateA - dateB;
  });
  const tbody = document.querySelector("#abastecimentoTable tbody");
  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}
