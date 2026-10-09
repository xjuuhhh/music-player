// Selecionando os elementos HTML
const audio = document.getElementById('meuAudio');
const btnPlayPause = document.getElementById('btnPlayPause');
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');
const statusTexto = document.getElementById('status');
const tempoAtual = document.getElementById('tempoAtual');
const tempoTotal = document.getElementById('tempoTotal');
const barraProgresso = document.getElementById('barraProgresso');

// Função para Alternar entre Play e Pause
function alternarPlayPause() {
  if (audio.paused) {
    audio.play();
    btnPlayPause.textContent = '❚❚'; // Ícone de Pause
    statusTexto.textContent = 'Tocando';
  } else {
    audio.pause();
    btnPlayPause.textContent = '▶'; // Ícone de Play
    statusTexto.textContent = 'Pausado';
  }
}

// Evento ao clicar no botão Play/Pause
btnPlayPause.addEventListener('click', alternarPlayPause);

// Botão Retroceder (Volta 5 segundos)
btnAnterior.addEventListener('click', () => {
  audio.currentTime -= 5;
});

// Botão Avançar (Avança 5 segundos)
btnProximo.addEventListener('click', () => {
  audio.currentTime += 5;
});

// Atualiza a barra e os tempos enquanto a música toca
audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    // Configura o valor máximo da barra com a duração total em segundos
    barraProgresso.max = Math.floor(audio.duration);
    barraProgresso.value = Math.floor(audio.currentTime);

    // Formata o tempo atual (ex: 0:15)
    let minAtual = Math.floor(audio.currentTime / 60);
    let segAtual = Math.floor(audio.currentTime % 60);
    if (segAtual < 10) segAtual = '0' + segAtual;
    tempoAtual.textContent = `${minAtual}:${segAtual}`;

    // Formata o tempo total
    let minTotal = Math.floor(audio.duration / 60);
    let segTotal = Math.floor(audio.duration % 60);
    if (segTotal < 10) segTotal = '0' + segTotal;
    tempoTotal.textContent = `${minTotal}:${segTotal}`;
  }
});

// Permite arrastar/clicar na barra de progresso para mudar a posição da música
barraProgresso.addEventListener('input', () => {
  audio.currentTime = barraProgresso.value;
});