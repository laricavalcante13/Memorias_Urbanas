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
                        <img src="${monumento.imagem}" class="card-img" alt="${monumento.nome_oficial}">
                        <div class="card-info">
                            <h2>${monumento.nome_oficial}</h2>
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