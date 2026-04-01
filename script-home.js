/*
// Função chamada quando o QR Code é detectado
function onScanSuccess(decodedText) {
    // Para o scanner para economizar processamento
    html5QrcodeScanner.clear();
    // Redireciona
    window.location.href = `index.html?id=${decodedText}`;
}

// Configuração do leitor
const config = { 
    fps: 10, 
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.0 
};

// Cria a instância do scanner
let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);

// Renderiza o leitor na tela
html5QrcodeScanner.render(onScanSuccess);
*/

function onScanSuccess(decodedText) {
    // Para o scanner e redireciona
    html5QrcodeScanner.clear().then(() => {
        window.location.href = `index.html?id=${decodedText}`;
    }).catch(error => {
        console.error("Erro ao limpar scanner", error);
        window.location.href = `index.html?id=${decodedText}`;
    });
}

// Configuração otimizada
const config = { 
    fps: 15, // Aumentei um pouco a fluidez
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.0,
    rememberLastUsedCamera: true // Ajuda o celular a lembrar da câmera traseira
};

let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);

// Renderiza e captura erros de inicialização
html5QrcodeScanner.render(onScanSuccess, (errorMessage) => {
    // Erros de leitura comuns (falta de foco) são ignorados
}, (error) => {
    // Esse erro aqui é o que importa: se a câmera for negada ou não achada
    console.error("Erro crítico de inicialização:", error);
});