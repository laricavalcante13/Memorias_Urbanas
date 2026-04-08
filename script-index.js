// Lógica do index.html após receber o ID do monumento para carregar as informações do JSON
// 1. Pega o ID que veio do leitor (ex: index.html?id=gilda)
const urlParams = new URLSearchParams(window.location.search);
const idMonumento = urlParams.get('id');

// 2. Carrega o banco de dados JSON
fetch('dados.json')
  .then(res => res.json())
  .then(dados => {
    // 3. Busca o monumento na lista
    const monumento = dados.find(m => m.id === idMonumento);

    if (monumento) {
      // 4. Preenche o HTML com as informações
      document.title = monumento.nome_oficial + " | Memórias Urbanas";
      document.getElementById('img-monumento').src = monumento.imagem;
      document.getElementById('nome-monumento').innerText = monumento.nome_oficial;
      document.getElementById('categoria').innerText = monumento.categoria;
      document.getElementById('autor').innerText = monumento.autor;
      document.getElementById('ano').innerText = monumento.ano;
      document.getElementById('historia').innerHTML = monumento.historia;
      document.getElementById('curiosidade-texto').innerText = monumento.curiosidade;
    } else {
      // Caso o ID não exista
      document.querySelector('.content').innerHTML = "<h1>Monumento não encontrado.</h1><p>Por favor, tente escanear novamente.</p>";
    }
  })
  .catch(err => {
    console.error("Erro ao carregar dados:", err);
    alert("Erro ao carregar as informações do monumento.");
  });