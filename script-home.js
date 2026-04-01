/*

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
*/

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Criamos a instância, mas SEM o .render() automático ainda
    const html5QrCode = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        html5QrCode.stop().then(() => {
            window.location.href = `index.html?id=${decodedText}`;
        });
    };

    const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 
    };

    // 2. O SEGREDO: Pedimos para o navegador listar as câmeras e escolhemos a traseira
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length > 0) {
            // No celular, a câmera traseira geralmente é a última da lista ou contém "back" no nome
            let backCamera = cameras.find(cam => cam.label.toLowerCase().includes('back'));
            
            // Se não achar pelo nome, pega a última da lista (estratégia comum para Android/iOS)
            const cameraId = backCamera ? backCamera.id : cameras[cameras.length - 1].id;

            // 3. Inicia com a câmera específica
            html5QrCode.start(
                cameraId, 
                config, 
                qrCodeSuccessCallback
            );
        } else {
            console.error("Nenhuma câmera encontrada.");
        }
    }).catch(err => {
        console.error("Erro ao acessar câmeras:", err);
    });
});