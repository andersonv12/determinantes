var jogadorDaVez = "X";
var c1, c2, c3, c4, c5, c6, c7, c8, c9;
var jogoAtivo = true;

function alternarJogador() {
    jogadorDaVez = (jogadorDaVez == "X") ? "O" : "X";
    document.getElementById("jogador").innerHTML = jogadorDaVez;
}

function clicar(elemento) {
    if (!jogoAtivo) {
        alert("O jogo acabou! Recarregue a página para jogar novamente.");
        return;
    }

    if (elemento.innerHTML == "") {
        elemento.innerHTML = jogadorDaVez;
        GuardarValor(elemento, jogadorDaVez);

        // Verifica o vencedor antes de alternar o jogador
        if (VerificarVencedor()) {
            alert("O jogador " + jogadorDaVez + " venceu!");
            jogoAtivo = false;
            return;
        }

        alternarJogador();
    } else {
        alert("Não pode clicar duas vezes na mesma casinha!");
    }
}

function GuardarValor(elemento, valor) {
    if (elemento.id == "c1") {
        c1 = valor;
    } else if (elemento.id == "c2") {
        c2 = valor;
    } else if (elemento.id == "c3") {
        c3 = valor;
    } else if (elemento.id == "c4") {
        c4 = valor;
    } else if (elemento.id == "c5") {
        c5 = valor;
    } else if (elemento.id == "c6") {
        c6 = valor;
    } else if (elemento.id == "c7") {
        c7 = valor;
    } else if (elemento.id == "c8") {
        c8 = valor;
    } else if (elemento.id == "c9") {
        c9 = valor;
    }
}

function VerificarVencedor() {
    if (c1 == c2 && c1 == c3 && c1 != null) {
        return true;
    }
    else if (c4 == c5 && c4 == c6 && c4 != null) {
        return true;
    }
    else if (c7 == c8 && c7 == c9 && c7 != null) {
        return true;
    }
    else if (c1 == c4 && c1 == c7 && c1 != null) {
        return true;
    }
    else if (c2 == c5 && c2 == c8 && c2 != null) {
        return true;
    }
    else if (c3 == c6 && c3 == c9 && c3 != null) {
        return true;
    }
    else if (c1 == c5 && c1 == c9 && c1 != null) {
        return true;
    }
    else if (c3 == c5 && c3 == c7 && c3 != null) {
        return true;
    }
    else {
        return false;
    }
}
