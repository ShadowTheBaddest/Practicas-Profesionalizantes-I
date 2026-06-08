// Guardamos el canvas del HTML en una variable
const canvas = document.getElementById("mycanvas");

// Creamos el contexto 2D para poder dibujar dentro del canvas
const ctx = canvas.getContext("2d");

// [EXTRA MDN]
// Elemento HTML donde se muestra el puntaje fuera del canvas
const scoreText = document.getElementById("scoreText");

// [EXTRA MDN]
// Elemento HTML donde se muestra el récord fuera del canvas
const highScoreText = document.getElementById("highScoreText");

// [EXTRA MDN]
// Elemento HTML donde se muestran las vidas fuera del canvas
const livesText = document.getElementById("livesText");

// [EXTRA MDN]
// Elemento HTML donde se muestra el nivel actual fuera del canvas
const levelText = document.getElementById("levelText");

// [EXTRA MDN]
// Elemento HTML donde se muestra la cantidad de pelotas activas
const ballsText = document.getElementById("ballsText");

// [EXTRA MDN]
// Elemento de audio usado para la música de fondo
const backgroundMusic = document.getElementById("backgroundMusic");

// [EXTRA MDN]
// Botón que activa o pausa la música
const musicButton = document.getElementById("musicButton");

// [EXTRA MDN]
// Elemento de audio usado cuando se rompe un ladrillo
const brickBreakSound = document.getElementById("brickBreakSound");

// [EXTRA MDN]
// Volumen de la música de fondo
backgroundMusic.volume = 0.35;

// [EXTRA MDN]
// Volumen del sonido de ladrillo roto
brickBreakSound.volume = 0.55;

// [EXTRA MDN]
// Indica si la música está sonando o no
let musicPlaying = false;

// Radio de cada pelota
const ballradius = 10;

// Alto de la barra
const paddleHeight = 10;

// [EXTRA MDN]
// Ancho base de la barra
const basePaddleWidth = 75;

// [EXTRA MDN]
// Ancho máximo que puede alcanzar la barra con power-ups
const maxPaddleWidth = 150;

// [EXTRA MDN]
// Ancho actual de la barra
let paddleWidth = basePaddleWidth;

// Separación de la barra respecto del borde inferior
const paddlebottomoffset = 20;

// Posición vertical fija de la barra
const paddleY = canvas.height - paddleHeight - paddlebottomoffset;

// Cantidad de columnas de ladrillos
const brickcolumncount = 6;

// Cantidad de filas de ladrillos
let brickrowcount = 3;

// Ancho de cada ladrillo
const brickWidth = 60;

// Alto de cada ladrillo
const brickHeight = 20;

// Separación entre ladrillos
const brickPadding = 15;

// Separación superior del grupo de ladrillos
const brickOffsetTop = 40;

// Separación izquierda del grupo de ladrillos
const brickOffsetLeft = 20;

// Colores normales de los ladrillos
const brickscolors = ["#35B856", "#B8353D", "#414FB8"];

// [EXTRA MDN]
// Colores especiales para identificar cada tipo de power-up
const powerupColors = {
  // Amarillo: suma una vida
  extraLife: "#FFD700",

  // Celeste: agranda la barra
  expandPaddle: "#00E5FF",

  // Violeta: agrega una pelota extra
  extraBall: "#C77DFF"
};

// [EXTRA MDN]
// Configuración de los tres niveles del juego
const levelsettings = [
  {
    // Cantidad de filas del nivel 1
    rows: 4,

    // Velocidad de las pelotas en el nivel 1
    speed: 2,

    // Cantidad mínima de cada tipo de power-up en el nivel 1
    minpowerups: 0,

    // Cantidad máxima de cada tipo de power-up en el nivel 1
    maxpowerups: 2
  },
  {
    // Cantidad de filas del nivel 2
    rows: 5,

    // Velocidad de las pelotas en el nivel 2
    speed: 2.5,

    // Cantidad mínima de cada tipo de power-up en el nivel 2
    minpowerups: 1,

    // Cantidad máxima de cada tipo de power-up en el nivel 2
    maxpowerups: 3
  },
  {
    // Cantidad de filas del nivel 3
    rows: 6,

    // Velocidad de las pelotas en el nivel 3
    speed: 3,

    // Cantidad mínima de cada tipo de power-up en el nivel 3
    minpowerups: 2,

    // Cantidad máxima de cada tipo de power-up en el nivel 3
    maxpowerups: 4
  }
];

// [EXTRA MDN]
// Cantidad máxima de niveles del juego
const maxlevel = 3;

// [EXTRA MDN]
// Nombre de la clave usada para guardar el récord en localStorage
const highscorekey = "ArkanoidHighScore";

// Posición inicial horizontal de la barra
let paddleX = (canvas.width - paddleWidth) / 2;

// Variable que indica si la flecha derecha está presionada
let rightPressed = false;

// Variable que indica si la flecha izquierda está presionada
let leftPressed = false;

// Puntaje actual del jugador
let score = 0;

// Cantidad de vidas actuales
let lives = 3;

// [EXTRA MDN]
// Nivel actual del juego
let level = 1;

// [EXTRA MDN]
// Cantidad de ladrillos destruidos en el nivel actual
let bricksdestroyed = 0;

// [EXTRA MDN]
// Récord guardado en el navegador
let highscore = Number(localStorage.getItem(highscorekey)) || 0;

// [EXTRA MDN]
// ID de la animación creada con requestAnimationFrame
let animationid = 0;

// [EXTRA MDN]
// Variable para detener el juego cuando termina
let gamefinished = false;

// [EXTRA MDN]
// Array de pelotas activas
let balls = [];

// Array donde se guardan todos los ladrillos
const bricks = [];

// Detecta cuando se presiona una tecla
document.addEventListener("keydown", keyDownHandler, false);

// Detecta cuando se suelta una tecla
document.addEventListener("keyup", keyUpHandler, false);

// Detecta el movimiento del mouse
document.addEventListener("mousemove", mouseMoveHandler, false);

// [EXTRA MDN]
// Detecta el click en el botón de música
musicButton.addEventListener("click", toggleMusic);

// [EXTRA MDN]
// Aplica la configuración inicial del nivel
applyLevelSettings();

// [EXTRA MDN]
// Reinicia la barra y crea la pelota inicial
resetBallAndPaddle();

// Crea los ladrillos iniciales
createBricks();

// [EXTRA MDN]
// Actualiza el panel HTML antes de iniciar el juego
updateInfoPanel();

// Inicia el bucle principal del juego
draw();

// [EXTRA MDN]
// Activa o pausa la música de fondo
function toggleMusic() {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicButton.textContent = "Música: OFF";
    musicPlaying = false;
  } else {
    backgroundMusic.play()
      .then(function () {
        musicButton.textContent = "Música: ON";
        musicPlaying = true;
      })
      .catch(function () {
        alert("El navegador bloqueó la música. Revisá que exista background.mp3 y tocá el botón otra vez.");
      });
  }
}

// [EXTRA MDN]
// Reproduce el sonido cuando se rompe un ladrillo
function playBrickBreakSound() {
  const sound = brickBreakSound.cloneNode();

  sound.volume = brickBreakSound.volume;

  sound.play().catch(function () {
    // Si el navegador bloquea el sonido, no frenamos el juego
  });
}

// [EXTRA MDN]
// Aplica los datos del nivel actual
function applyLevelSettings() {
  const currentLevel = levelsettings[level - 1];

  brickrowcount = currentLevel.rows;
}

// [EXTRA MDN]
// Reinicia la barra y deja una sola pelota inicial
function resetBallAndPaddle() {
  const currentLevel = levelsettings[level - 1];

  paddleWidth = basePaddleWidth;
  paddleX = (canvas.width - paddleWidth) / 2;

  balls = [
    {
      x: canvas.width / 2,
      y: paddleY - ballradius - 20,
      dx: currentLevel.speed,
      dy: -currentLevel.speed
    }
  ];

  rightPressed = false;
  leftPressed = false;
}

// [EXTRA MDN]
// Devuelve un número entero aleatorio entre min y max
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// [EXTRA MDN]
// Genera posiciones aleatorias sin repetir para los power-ups
function getRandomPositions(amount, usedPositions) {
  const positions = new Set();
  const totalBricks = brickcolumncount * brickrowcount;
  const availableAmount = Math.min(amount, totalBricks - usedPositions.size);

  while (positions.size < availableAmount) {
    const randomColumn = Math.floor(Math.random() * brickcolumncount);
    const randomRow = Math.floor(Math.random() * brickrowcount);
    const position = `${randomColumn}-${randomRow}`;

    if (!usedPositions.has(position)) {
      positions.add(position);
      usedPositions.add(position);
    }
  }

  return positions;
}

// Crea la matriz de ladrillos del nivel actual
function createBricks() {
  bricks.length = 0;
  bricksdestroyed = 0;

  const currentLevel = levelsettings[level - 1];

  // [EXTRA MDN]
  // Guarda posiciones ya usadas para evitar que dos power-ups caigan en el mismo ladrillo
  const usedPositions = new Set();

  // [EXTRA MDN]
  // Cantidad aleatoria de bloques de vida para este nivel
  const lifeBlocksAmount = getRandomIntInclusive(
    currentLevel.minpowerups,
    currentLevel.maxpowerups
  );

  // [EXTRA MDN]
  // Cantidad aleatoria de bloques que agrandan la barra para este nivel
  const paddleBlocksAmount = getRandomIntInclusive(
    currentLevel.minpowerups,
    currentLevel.maxpowerups
  );

  // [EXTRA MDN]
  // Cantidad aleatoria de bloques que agregan pelota para este nivel
  const ballBlocksAmount = getRandomIntInclusive(
    currentLevel.minpowerups,
    currentLevel.maxpowerups
  );

  // [EXTRA MDN]
  // Posiciones donde van los bloques de vida
  const lifePositions = getRandomPositions(lifeBlocksAmount, usedPositions);

  // [EXTRA MDN]
  // Posiciones donde van los bloques que agrandan la barra
  const paddlePositions = getRandomPositions(paddleBlocksAmount, usedPositions);

  // [EXTRA MDN]
  // Posiciones donde van los bloques que agregan pelota
  const ballPositions = getRandomPositions(ballBlocksAmount, usedPositions);

  for (let c = 0; c < brickcolumncount; c++) {
    bricks[c] = [];

    for (let r = 0; r < brickrowcount; r++) {
      const position = `${c}-${r}`;

      const randomcolor = brickscolors[
        Math.floor(Math.random() * brickscolors.length)
      ];

      // [EXTRA MDN]
      // Tipo de power-up del ladrillo
      let powerup = null;

      // Color final del ladrillo
      let color = randomcolor;

      if (lifePositions.has(position)) {
        powerup = "extraLife";
        color = powerupColors.extraLife;
      } else if (paddlePositions.has(position)) {
        powerup = "expandPaddle";
        color = powerupColors.expandPaddle;
      } else if (ballPositions.has(position)) {
        powerup = "extraBall";
        color = powerupColors.extraBall;
      }

      bricks[c][r] = {
        x: 0,
        y: 0,
        color: color,
        status: 1,
        powerup: powerup
      };
    }
  }
}

// [EXTRA MDN]
// Actualiza los textos del panel izquierdo
function updateInfoPanel() {
  scoreText.textContent = score;
  highScoreText.textContent = highscore;
  livesText.textContent = lives;
  levelText.textContent = level;
  ballsText.textContent = balls.length;
}

// [EXTRA MDN]
// Actualiza el récord si el score actual lo supera
function updatehighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem(highscorekey, highscore);
  }
}

// Detecta cuando se presiona una flecha
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

// Detecta cuando se suelta una flecha
function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// Mueve la barra usando la posición del mouse
function mouseMoveHandler(e) {
  const canvasPosition = canvas.getBoundingClientRect();
  const relativeX = e.clientX - canvasPosition.left;

  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = Math.max(
      0,
      Math.min(relativeX - paddleWidth / 2, canvas.width - paddleWidth)
    );
  }
}

// [EXTRA MDN]
// Dibuja todas las pelotas activas
function drawBalls() {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballradius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
  }
}

// Dibuja la barra
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#B89A35";
  ctx.fill();
  ctx.closePath();
}

// Dibuja todos los ladrillos activos
function drawBricks() {
  for (let c = 0; c < brickcolumncount; c++) {
    for (let r = 0; r < brickrowcount; r++) {
      const brick = bricks[c][r];

      if (brick.status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        brick.x = brickX;
        brick.y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Detecta colisiones entre las pelotas y los ladrillos
function collisiondetection() {
  for (let c = 0; c < brickcolumncount; c++) {
    for (let r = 0; r < brickrowcount; r++) {
      const brick = bricks[c][r];

      if (brick.status === 1) {
        for (let i = 0; i < balls.length; i++) {
          const ball = balls[i];

          const closestX = Math.max(brick.x, Math.min(ball.x, brick.x + brickWidth));
          const closestY = Math.max(brick.y, Math.min(ball.y, brick.y + brickHeight));

          const distanceX = ball.x - closestX;
          const distanceY = ball.y - closestY;

          const distanceSquared = distanceX * distanceX + distanceY * distanceY;

          if (distanceSquared <= ballradius * ballradius) {
            brick.status = 0;

            // [EXTRA MDN]
            // Reproduce el sonido de ladrillo roto
            playBrickBreakSound();

            score++;
            bricksdestroyed++;
            updatehighscore();

            // [EXTRA MDN]
            // Ejecuta el power-up del ladrillo golpeado
            applyPowerUp(brick.powerup, ball);

            const overlapX = ballradius - Math.abs(distanceX);
            const overlapY = ballradius - Math.abs(distanceY);

            if (overlapX < overlapY) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }

            // [EXTRA MDN]
            // Verifica si se rompieron todos los ladrillos del nivel
            if (bricksdestroyed === brickrowcount * brickcolumncount) {
              completeLevel();
              return true;
            }

            return false;
          }
        }
      }
    }
  }

  return false;
}

// [EXTRA MDN]
// Aplica el efecto del power-up correspondiente
function applyPowerUp(powerup, sourceBall) {
  if (powerup === "extraLife") {
    lives = Math.min(lives + 1, 5);
  } else if (powerup === "expandPaddle") {
    paddleWidth = Math.min(paddleWidth + 25, maxPaddleWidth);
    paddleX = Math.min(paddleX, canvas.width - paddleWidth);
  } else if (powerup === "extraBall") {
    addExtraBall(sourceBall);
  }
}

// [EXTRA MDN]
// Agrega una pelota extra desde la posición de la pelota que tocó el ladrillo
function addExtraBall(sourceBall) {
  const currentLevel = levelsettings[level - 1];

  let newDx = -sourceBall.dx;

  if (newDx === 0) {
    newDx = currentLevel.speed;
  }

  balls.push({
    x: sourceBall.x,
    y: sourceBall.y,
    dx: newDx,
    dy: -Math.abs(sourceBall.dy)
  });
}

// [EXTRA MDN]
// Termina el nivel actual y pasa al siguiente
function completeLevel() {
  if (level === maxlevel) {
    winGame();
    return;
  }

  level++;

  applyLevelSettings();
  resetBallAndPaddle();
  createBricks();
  updateInfoPanel();

  alert("Nivel " + level);
}

// Finaliza el juego cuando se ganan todos los niveles
function winGame() {
  updatehighscore();
  updateInfoPanel();

  gamefinished = true;
  cancelAnimationFrame(animationid);

  alert("FELICIDADES, GANASTE LOS 3 NIVELES. AHORA VE A TOCAR UN POCO DE PASTO!!!");
  document.location.reload();
}

// Finaliza el juego cuando se pierden todas las vidas
function loseGame() {
  updatehighscore();
  updateInfoPanel();

  gamefinished = true;
  cancelAnimationFrame(animationid);

  alert("PERDISTE!!!");
  document.location.reload();
}

// Mueve la barra con las flechas del teclado
function movePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 4;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 4;
  }
}

// [EXTRA MDN]
// Actualiza la posición de todas las pelotas activas
function updateBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];

    if (ball.x + ball.dx > canvas.width - ballradius || ball.x + ball.dx < ballradius) {
      ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ballradius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > paddleY - ballradius) {
      if (ball.x > paddleX && ball.x < paddleX + paddleWidth && ball.y < paddleY) {
        const currentSpeed = levelsettings[level - 1].speed;
        const hitPoint = (ball.x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);

        ball.dx = hitPoint * currentSpeed;
        ball.dy = -Math.abs(ball.dy);
      } else if (ball.y + ball.dy > canvas.height - ballradius) {
        balls.splice(i, 1);
        continue;
      }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  if (balls.length === 0) {
    lives--;

    if (lives === 0) {
      loseGame();
      return;
    }

    resetBallAndPaddle();
  }
}

// Función principal del juego
function draw() {
  if (gamefinished) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBalls();
  drawPaddle();

  updateInfoPanel();

  const levelcompleted = collisiondetection();

  if (gamefinished) {
    return;
  }

  if (levelcompleted) {
    animationid = requestAnimationFrame(draw);
    return;
  }

  movePaddle();
  updateBalls();

  // [EXTRA MDN]
  // Vuelve a llamar a draw para crear la animación
  animationid = requestAnimationFrame(draw);
}