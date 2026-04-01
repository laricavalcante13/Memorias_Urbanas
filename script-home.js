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