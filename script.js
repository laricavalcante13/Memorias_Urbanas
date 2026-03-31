//Lógica do instascan em home.html para ler o QR Code e redirecionar para a página com o ID do monumento
let scanner = new Instascan.Scanner({
  video: document.getElementById('preview'),
  mirror: false // Importante para ler QR Codes sem espelhar
});

scanner.addListener('scan', function (content) {
  // O Instascan lê o conteúdo do QR Code. 
  // Se o QR Code tiver apenas o ID (ex: "gilda"), redirecionamos:
  window.location.href = 'index.html?id=' + content;
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    // Tenta pegar a câmera traseira (geralmente a última da lista no Android/Chrome)
    let selectedCam = cameras[cameras.length - 1];
    scanner.start(selectedCam);
  }
  else {
    alert('Nenhuma câmera encontrada. Verifique as permissões do navegador.');
  }
}).catch(function (e) {
  console.error(e);
  alert('Erro ao acessar câmera: ' + e);
});

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
      document.title = monumento.nome_popular + " | Memórias Urbanas";
      document.getElementById('img-monumento').src = monumento.imagem;
      document.getElementById('nome-monumento').innerText = monumento.nome_popular;
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

//Lógica de lista.html para carregar a lista de monumentos do JSON

const listaContainer = document.getElementById('lista-monumentos');

// Carrega o JSON
fetch('dados.json')
  .then(res => res.json())
  .then(dados => {
    dados.forEach(monumento => {
      // Cria o HTML de cada card
      const card = document.createElement('a');
      card.href = `index.html?id=${monumento.id}`;
      card.className = 'card';

      card.innerHTML = `
                        <img src="${monumento.imagem}" class="card-img" alt="${monumento.nome_popular}">
                        <div class="card-info">
                            <h2>${monumento.nome_popular}</h2>
                            <p>${monumento.categoria} • ${monumento.ano}</p>
                        </div>
                        <div class="seta">→</div>
                    `;

      listaContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Erro ao carregar lista:", err);
    listaContainer.innerHTML = "<p>Erro ao carregar o acervo.</p>";
  });