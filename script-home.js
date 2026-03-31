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



