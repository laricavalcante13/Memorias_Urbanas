// 1. Pega o ID que veio na URL (ex: ?id=cavalo-babao)
const urlParams = new URLSearchParams(window.location.search);
const monumentoId = urlParams.get('id');

// 2. Função para buscar os dados e preencher a página
async function carregarDetalhes() {
    try {
        const response = await fetch('dados.json');
        const dados = await response.json();

        // 3. Encontra o monumento específico dentro do array
        const monumento = dados.find(m => m.id === monumentoId);

        if (monumento) {
            // 4. Preenche os elementos do HTML com os dados do JSON
            document.title = `Memórias Urbanas | ${monumento.nome_oficial}`;
            document.getElementById('categoria').innerText = monumento.categoria;
            document.getElementById('foto-monumento').src = monumento.imagem;
            document.getElementById('nome-monumento').innerText = monumento.nome_oficial;
            document.getElementById('autor-monumento').innerText = monumento.autor;
            document.getElementById('ano-monumento').innerText = monumento.ano;
            document.getElementById('historia-texto').innerHTML = monumento.historia;
            document.getElementById('curiosidade-texto').innerText = monumento.curiosidade;

            if (monumento.latitude && monumento.longitude) {
                const lat = monumento.latitude;
                const lon = monumento.longitude;

                // 1. Inicializa o mapa centralizado no monumento
                const map = L.map('mapa').setView([lat, lon], 16);

                // 2. Adiciona as "peças" do mapa (estilo visual)
                // Esse estilo 'CartoDB.Positron' é bem limpo e combina com o tema "museu"
                L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                // 3. Adiciona o marcador (o "pin") no local exato
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>${monumento.nome_oficial}</b><br>Curitiba, PR`)
                    .openPopup();
            }
            
            // Link do Forms (ajuste conforme o seu ID do Google Forms)
            const linkFeedback = document.getElementById('link-feedback');
            if(linkFeedback) {
                linkFeedback.href = `https://forms.gle/VGrrdsTBfBEYJcrq9?entry.12345=${monumento.nome_oficial}`;
            }

        } else {
            console.error("Monumento não encontrado!");
            document.body.innerHTML = "<h1>Ops! Monumento não encontrado.</h1><a href='lista.html'>Voltar para a lista</a>";
        }
    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
    }
}

// Inicia a busca
if (monumentoId) {
    carregarDetalhes();
} else {
    window.location.href = 'lista.html'; // Se não tiver ID, volta pra lista
}