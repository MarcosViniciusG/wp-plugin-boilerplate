function mudarCor() {
    // Mudar a cor do body para lightgray
    document.body.style.backgroundColor = 'lightgray';
}

function cronometro() {
    let final = new Date("Jan 1, 2030 00:00:00").getTime();

    // Atualiza o cronômetro a cada minuto
        let x = setInterval(function() {

        // Pega o tempo e a data de hoje
        let hoje = new Date().getTime();

        // Encontra a distância entre o hoje e o final 
        let distancia = final - hoje;

        // Cálculos para dias, horas, minutos e segundos
        let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Mostra o resultado em um elemento HTML com o Id "cronometro"
        document.getElementById("fc-cronometro").innerHTML = dias + "d " + horas + "h "
        + minutos + "m " + segundos + "s ";

        // Se o cronômetro for finalizado, coloca algum testo no local
        if (distancia < 0) {
            clearInterval(x);
            document.getElementById("fc-cronometro").innerHTML = "FINALIZADO";
        }
    }, 1000);
}

// Ativa a função quando todos os elementos HTML forem carregados
window.onload = function() {
    mudarCor();
    cronometro();
}

