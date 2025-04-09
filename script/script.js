document.addEventListener("DOMContentLoaded", function() {
    const btnCategoria = document.getElementById("menu-btn"); // Botão "Faça seu pedido"
    const sidebar = document.getElementById("menu-lateral"); // Menu lateral
    const closeBtn = document.getElementById("fechar-menu"); // Botão "X" para fechar

    // Evento para abrir o menu lateral
    btnCategoria.addEventListener("click", function() {
        sidebar.style.left = "0";
    });

    // Evento para fechar o menu lateral
    closeBtn.addEventListener("click", function() {
        sidebar.style.left = "-300px";
    });

    // Fecha o menu se clicar fora dele
    document.addEventListener("click", function(event) {
        if (!sidebar.contains(event.target) && event.target !== btnCategoria) {
            sidebar.style.left = "-300px";
        }
    });
});

const imagensFeedback = [
    "../imagens/feedbacks/feedback1.jpg",
    "../imagens/feedbacks/feedback2.jpg",
    "../imagens/feedbacks/feedback3.jpg",
    "../imagens/feedbacks/feedback4.jpg"
];

let indexFeedback = 0;
let feedbackImg = document.getElementById("feedback-img");

function mudarImagem(direcao) {
    indexFeedback = (indexFeedback + direcao + imagensFeedback.length) % imagensFeedback.length;
    feedbackImg.src = imagensFeedback[indexFeedback];
}

// Autoplay a cada 5 segundos
setInterval(() => mudarImagem(1), 5000);


// Valida o campo de grau para permitir apenas números e ponto decimal
function validarGrau(input) {
    input.value = input.value.replace(/[^0-9.]/g, ''); // Permite apenas números e ponto decimal
}

// A função enviarPedido() ainda está aqui caso precise usar futuramente para outro fluxo
function enviarPedido() {
    const nome = document.getElementById("nome").value.trim();
    const tipoLente = document.getElementById("tipo-lente").value;
    const grauEsquerdo = document.getElementById("grau-esquerdo").value.trim();
    const grauDireito = document.getElementById("grau-direito").value.trim();
    const filtro = document.getElementById("filtro").value;
    const observacoes = document.getElementById("observacoes").value.trim();

    if (!nome || !tipoLente || !grauEsquerdo || !grauDireito || !filtro) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    const regexGrau = /^\d+(\.\d{1,2})?$/;
    if (!regexGrau.test(grauEsquerdo) || !regexGrau.test(grauDireito)) {
        alert("Os graus das lentes devem ser números válidos, ex: 2.5 ou 3.0.");
        return;
    }

    const numeroCliente = "+5561992893006";
    const mensagem = `Olá, meu nome é *${nome}* e eu gostaria de fazer um pedido.%0A%0A` +
                     `Eu gostaria da lente *${tipoLente}*, sendo que o meu grau é *${grauEsquerdo}* do lado esquerdo e *${grauDireito}* do lado direito.%0A` +
                     `Gostaria também de colocar o filtro *${filtro}*.%0A%0A` +
                     `*Obs:* ${observacoes || "Nenhuma"}`;

    const url = `https://api.whatsapp.com/send?phone=${numeroCliente}&text=${mensagem}`;
    window.open(url, "_blank");

    // Mostra a mensagem de confirmação e mantém na tela
    const confirmacao = document.getElementById("mensagem-confirmacao");
    confirmacao.textContent = "✅ Pedido enviado via WhatsApp!";
    confirmacao.style.display = "block";
}
