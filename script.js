function changeColor(color) {

    document.body.style.backgroundColor = color;

    const imagemContainer = document.getElementById('imagemContainer');
    let imagemSrc = '';

    switch (color) {
        case 'purple':
            imagemSrc = 'img/gengar.png';
            break;
        case 'blue':
            imagemSrc = 'img/sonic.png';
            break;
        case 'pink':
            imagemSrc = 'img/louise.png';
            break;
        case 'green':
            imagemSrc = 'img/mike.png';
            break;
        case 'red':
            imagemSrc = `img/akame.png`;
            break;
        default:
            imagemSrc = '';
            break;
    }

    const currentBackgroundImage = window.getComputedStyle(imagemContainer).getPropertyValue('background-image');

    if (currentBackgroundImage !== `url("${imagemSrc}")`) {
        imagemContainer.style.backgroundImage = `url("${imagemSrc}")`;
        imagemContainer.style.backgroundSize = 'contain';
        imagemContainer.style.backgroundPosition = 'center';
        imagemContainer.style.backgroundRepeat = 'no-repeat';
    }

    document.body.style.backgroundImage = `url("${imagemSrc}")`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat'
}
const input = document.querySelector(".euputo")

const element = document.querySelector(".textoM")

function clickbutton() {

    element.innerHTML = input.value
}

let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalId;
let emExecucao = false;

function zerarTempo() {
    segundos = 0;
    minutos = 0;
    horas = 0;
    cronometroElement = document.getElementById('tempo');
    cronometroElement.textContent = '00:00:00';
}

function formatarTempo(tempo) {
    return tempo < 10 ? `0${tempo}` : tempo;
}

function atualizarCronometro() {
    segundos++;

    if (segundos === 60) {
        segundos = 0;
        minutos++;

        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
    }
    const cronometroElement = document.getElementById("tempo");
    const tempoFormatado = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;
    cronometroElement.textContent = tempoFormatado;
}

const iniciarButton = document.getElementById('iniciarButton');
const stopButton = document.getElementById('stopButton');
const zerarButton = document.getElementById('zerarButton');


iniciarButton.addEventListener('click', function () {
    if (!emExecucao) {
        intervalId = setInterval(atualizarCronometro, 1000);
        emExecucao = true;
    }
});

stopButton.addEventListener("click", function () {
    if (emExecucao) {
        clearInterval(intervalId);
        emExecucao = false;
    }
})

zerarButton.addEventListener('click', function () {
    zerarTempo();
    clearInterval(intervalId);
    emExecucao = false;

})


let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';

function togglePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function resetGame() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }
    updateUI();
}

function updateUI() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cellElement = document.getElementById(`cell-${i}-${j}`);
            cellElement.textContent = board[i][j];
        }
    }
}

function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;

        updateUI();

        if (checkWin()) {
            alert(`Jogador ${currentPlayer} venceu!`);
            resetGame();
        } else {
            if (checkDraw()) {
                alert(`Empate!`);
                resetGame();
            } else {
                togglePlayer();
            }
        }

    }
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
    }


    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
            return true;
        }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return true;
    }


    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return true;
    }

    return false;
}

function checkDraw() {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            if (board[i][j] === '') {
                return false;
            }
        }
    }

    return true;

}

function cellClick(row, col) {

    if (board[row][col] === '') {

        document.getElementById(`cell-${row}-${col}`).textContent = currentPlayer;


        makeMove(row, col);
    }
}



const cells = document.querySelectorAll('td');


cells.forEach(cell => {
    cell.addEventListener('click', function () {

        const [row, col] = getRowAndColumn(cell.id);


        cellClick(row, col);
    });
});


function getRowAndColumn(cellId) {

    const [, row, col] = cellId.split('-');

    return [parseInt(row), parseInt(col)];
}
function iniciarJogoDaVelha() {
    resetGame();
    currentPlayer = 'X';
    updateUI()
}

const iniciarJDV = document.getElementById('iniciarJDV');
iniciarJDV.addEventListener('click', iniciarJogoDaVelha)

function limparTabuleiro() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }
    updateUI();
}

const limparJDVButton = document.getElementById('limparJDV');
limparJDVButton.addEventListener('click', limparTabuleiro);


const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');


openPopupBtn.addEventListener('click', function () {
    popup.style.display = 'block';
});


closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
});

const addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue !== '') {
        const newTaskItem = document.createElement('li');

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskText = document.createTextNode(taskValue);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('deleteBtn');

        deleteButton.addEventListener('click', function () {
            newTaskItem.remove();
        });

        checkboxContainer.appendChild(checkbox);
        newTaskItem.appendChild(checkboxContainer);
        newTaskItem.appendChild(taskText);
        newTaskItem.appendChild(deleteButton);

        const taskList = document.getElementById('taskList');
        taskList.appendChild(newTaskItem);

        taskInput.value = '';
    }
});


document.addEventListener('DOMContentLoaded', function () {

    const linksMenu = document.querySelectorAll('.menu a');


    linksMenu.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();


            const sectionId = link.getAttribute('href').substring(1);


            hideAllSections();

            document.getElementById(sectionId).style.display = 'flex';
        });
    });


    function hideAllSections() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(function (section) {
            section.style.display = 'none';
        });
    }
});


const temasDisponiveis = ['purple', 'blue', 'pink', 'green', 'red'];


function escolherTemaAleatorio() {
    const temaAleatorio = temasDisponiveis[Math.floor(Math.random() * temasDisponiveis.length)];
    return temaAleatorio;
}

function aplicarTema(tema) {
    changeColor(tema);
}


window.addEventListener('load', function () {
    const temaAleatorio = escolherTemaAleatorio();
    aplicarTema(temaAleatorio);
});


document.getElementById('botaoRoxo').addEventListener('click', function () {
    aplicarTema('purple');
});

document.getElementById('botaoAzul').addEventListener('click', function () {
    aplicarTema('blue');
});

document.getElementById('botaoRosa').addEventListener('click', function () {
    aplicarTema('pink');
});

document.getElementById('botaoVerde').addEventListener('click', function () {
    aplicarTema('green');
});

document.getElementById('botaoVermelho').addEventListener('click', function () {
    aplicarTema('red');
});


const cronometroSection = document.getElementById('cronometro');


cronometroSection.addEventListener('click', function () {

    document.getElementById('cronometro-container').classList.add('ativo');
});

function generateNumber() {
    const min = Math.ceil(document.querySelector('.input-min').value);
    const max = Math.floor(document.querySelector('.input-max').value);

    const result = Math.floor(Math.random() * (max - min + 1)) + min;

    alert(result)
}

function mapear() {

    const desconto = menuOptions.map(product => {
        const produtoDescontado = {
            ...product,
            price: product.price * 0.9,

        }
        return produtoDescontado
    })
    showAll(desconto)
}

const list = document.querySelector('.ulHamburger');

function showAll(products) {
    let myLi = '';
    products.forEach(product => {
        myLi +=
            `<li class ="product-item">
                <img src="${product.src}">
                <h2>${product.name}</h2>
                <p class="textHam">R$ ${product.price.toFixed(2)}</p>
            </li>`;
    });
    list.innerHTML = myLi;
}

const showAllBtn = document.getElementById('showProductBtn');
showAllBtn.addEventListener('click', () => showAll(menuOptions));
document.getElementById('mapBtn').addEventListener('click', mapear)

function somarProducts() {
    const sum = menuOptions.reduce((acc, value) => {
        return acc + value.price
    }, 0)
    list.innerHTML =
        `<li class="product-item">
    <p class="textSum"> O Valor total dos itens é ${sum}</p>
    </li>`


}

const somar = document.getElementById('somarBtn').addEventListener('click', somarProducts)

const filtrar = document.querySelector('#filtrarBtn')

function filtrarProducts(){
    const filt = menuOptions.filter (product =>product.vegan === true)
        showAll(filt)
    }


filtrar.addEventListener('click',filtrarProducts)


const resultDiv = document.querySelector(".result")
const yourScoreSpan = document.querySelector('#humanScore')
const machineScoreSpan = document.querySelector('#machineScore')

let suaPontuacao = 0;
let pontuacaoMaquina = 0;

function jogar(escolhaUsuario) {
    const opcoes = ["rock", "paper", "scissors"];
    const escolhaComputador = opcoes[Math.floor(Math.random() * opcoes.length)];

    let result;
    if (escolhaUsuario === escolhaComputador) {
        result = 'Empate!';
    } else if (
        (escolhaUsuario === 'rock' && escolhaComputador === 'scissors') ||
        (escolhaUsuario === 'paper' && escolhaComputador === 'rock') ||
        (escolhaUsuario === 'scissors' && escolhaComputador === 'paper')
    ) {
        result = 'Você Ganhou!';
        suaPontuacao++;
        yourScoreSpan.innerHTML = suaPontuacao
    } else {
        result = 'Você Perdeu!';
        pontuacaoMaquina++;
        machineScoreSpan.innerHTML = pontuacaoMaquina
    }


    resultDiv.innerHTML = `${result}`
}

// Função para mostrar uma seção e ocultar as outras
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Exemplo de uso: mostrar a seção 1
showSection('section1');
