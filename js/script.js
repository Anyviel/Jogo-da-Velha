let tabuleiro = {
    'left-top': null,
    'center-top': null,
    'right-top': null,
    'left': null,
    'center': null,
    'right': null,
    'left-bottom': null,
    'center-bottom': null,
    'right-bottom': null
};

const jogador_a = 'o';
const jogador_b = 'x';

let player = jogador_a;

function marcaTabuleiro(area) {
    tabuleiro = Object.assign({}, tabuleiro, {
        [event.target.id]: player
    });
    area.classList.add('simbo-' + player);
}

function mudaPlayer() {
    if (player === jogador_a) {
        player = jogador_b;
    } else {
        player = jogador_a;
    }
}

function checaVitoria() {
    //Checa Vitória Horizontal
    sufixoVencedor = ['-top', '', '-bottom'].find(sufixo => {
        if (tabuleiro[`left${sufixo}`] === player &&
            tabuleiro[`center${sufixo}`] === player &&
            tabuleiro[`right${sufixo}`] === player) {
            return true;
        }
        return false;
    });
    if (sufixoVencedor !== undefined) {
        return [
            `left${sufixoVencedor}`,
            `center${sufixoVencedor}`,
            `right${sufixoVencedor}`
        ]
    }
    //Checa Vitória Lateral
    sufixoVencedor = ['left', 'center', 'right'].find(sufixo => {
        return tabuleiro[`${sufixo}-top`] === player &&
            tabuleiro[`${sufixo}`] === player &&
            tabuleiro[`${sufixo}-bottom`] === player
    });
    if (sufixoVencedor) {
        return [
            `${sufixoVencedor}-top`,
            `${sufixoVencedor}`,
            `${sufixoVencedor}-bottom`
        ]
    }
    // Checa nas Diagonais
    if (
        tabuleiro['left-top'] === player &&
        tabuleiro['center'] === player &&
        tabuleiro['right-bottom'] === player
    ) {
        return [
            'left-top',
            'center',
            'right-bottom'
        ]
    } else if (
        tabuleiro['right-top'] === player &&
        tabuleiro['center'] === player &&
        tabuleiro['left-bottom'] === player
    ) {
        return [
            'right-top',
            'center',
            'left-bottom'
        ]
    };
    // Fim Checa Diagonais
}

function checaEmpate() {
    return Object.keys(tabuleiro).every(posicao => {
        return tabuleiro[posicao] !== null;
    })
}

function jogada(event) {
    const area = event.target;
    if (tabuleiro[area.id] !== null) {
        console.log("Já tá marcado zé!");
        return;
    }
    marcaTabuleiro(area);

    const posicoesDeVitoria = checaVitoria();
    if (posicoesDeVitoria) {
        vencedor = player;
        const mensagem = document.getElementById('mensagem');
        mensagem.textContent = 'O Vencedor é: ' + player;
        posicoesDeVitoria.forEach(posicao => {
            const area = document.getElementById(posicao);
            area.style.backgroundColor = '#00ff00';
        })
    } else if (checaEmpate()) {
        const mensagem = document.getElementById('mensagem');
        mensagem.textContent = 'Deu Velha!'
        area.style.backgroundColor = '#ff0000';
        mensagem.style.color = '#ff0000';
    }

    mudaPlayer();
}

Object.keys(tabuleiro).forEach(posicao => {
    const area = document.getElementById(posicao);
    area.addEventListener('click', (jogada));
})