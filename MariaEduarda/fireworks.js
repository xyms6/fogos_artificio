const API_URL = 'https://mhmovie-ebb6czbdbxbzcvfr.canadacentral-01.azurewebsites.net/api';
const cores = ["#1E90FF"];  // Azul para as faíscas

function criarFogoDeArtificio(x, y) {
  const alturaDeLançamento = Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
  const projétil = document.createElement("div");
  projétil.classList.add("projectile");
  document.body.appendChild(projétil);
  projétil.style.left = `${x}px`;
  projétil.style.top = `${y}px`;

  anime({
    targets: projétil,
    translateY: -alturaDeLançamento,
    duration: 1200,
    easing: "easeOutQuad",
    complete: () => {
      projétil.remove();
      criarExplosao(x, y - alturaDeLançamento);
    }
  });
}

function criarExplosao(x, y) {
  const numFaíscas = 100;

  // Faíscas em formato de coração
  for (let i = 0; i < numFaíscas; i++) {
    criarParticula(x, y);
  }
}

function criarParticula(x, y) {
  const el = document.createElement("div");
  el.classList.add("particule");

  // Esconde as instruções quando o primeiro clique ocorre
  if (document.querySelector('.instructions').style.display !== 'none') {
    document.querySelector('.instructions').style.display = 'none';
  }

  el.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  animarParticula(el);
}

function animarParticula(el) {
  const angulo = Math.random() * Math.PI * 2;
  const distancia = anime.random(100, 200);
  const duracao = anime.random(1200, 2000);
  const distanciaDeQueda = anime.random(20, 80);
  const escala = Math.random() * 0.5 + 0.5;

  anime
    .timeline({
      targets: el,
      easing: "easeOutCubic",
      duration: duracao,
      complete: () => el.remove()
    })
    .add({
      translateX: Math.cos(angulo) * distancia,
      translateY: Math.sin(angulo) * distancia,
      scale: [0, escala],
      opacity: [1, 0.9]
    })
    .add({
      translateY: `+=${distanciaDeQueda}px`,
      opacity: [0.9, 0],
      easing: "easeInCubic",
      duration: duracao / 2
    });
}

document.addEventListener("click", (e) => {
  criarFogoDeArtificio(e.clientX, e.clientY);
});

window.onload = function () {
  const centroX = window.innerWidth / 2;
  const centroY = window.innerHeight / 2;
  criarFogoDeArtificio(centroX, centroY);
};
