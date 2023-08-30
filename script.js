let inputs, clock, alarm, hours, minutes, seconds, repeater;

window.addEventListener('load', function() {
    const numberElements = document.getElementsByClassName('number');
    inputs = Array.from(numberElements);

    clock = document.querySelector('.clock');

    //para agregar el audio:
    alarm = new Audio('./sound/thisIsHalloween.mp3');
})

function startTimer() {
    //Leer los inputs
    parseTime();

    //Actualizar la vista
    setTimer();

    //Arrancar el timer
    countDown();
}

//Funcion para convertir el string del input a numeros
function parseTime() {
    //el array trae string, y necesito que sean numeros:
    hours = Number(inputs[0].value);
    minutes = Number(inputs[1].value);
    seconds = Number(inputs[2].value);
}

//resetear el timer:
function setTimer() {
    //editar el HTML agregando una clase:
    clock.innerHTML = `<p class="number">${hours > 9 ? hours : ('0' + hours)}</p><span>hr</span><p class="number">${minutes > 9 ? minutes : ('0' + minutes)}</p><span>min</span><p class="number">${seconds > 9 ? seconds : ('0' + seconds)}</p><span>seg</span>`; // ternario: si las horas son mayores a 9, entonces, imprime las horas, pero sino entonces agrega un cero adelante y luego imprimes las horas

    //para reflejar el valor anterior en la pestaña
    document.title = `${hours > 9 ? hours : ('0' + hours)}:${minutes > 9 ? minutes : ('0' + minutes)}:${seconds > 9 ? seconds : ('0' + seconds)}`;
}


//funcion que arranca el contador:
function countDown() { //nos sirve para iniciar o frenar el timer
    repeater = setInterval(runner, 1000);
}

//la funcion runner se encarga de hacer la cuenta de cuanto tiempo falta para que se acabe el tiempo y se tenga que activar la alarma
function runner() {
    //Si tengo mas de 0 segundos, resta segundos
    //Si tengo 0 segundos pero tengo mas de 0 minutos, poner 59 segundos y restale 1 a minutos
    // Si tengo 0 segundos, 0 minutos pero tengo mas de 0 horas, poner segundos en 59, minutos en 59 y restale 1 a hora
    // Sino arranca la alarma


    if (seconds > 0) {
        seconds--;
    } else {
        if (minutes > 0) {
            seconds = 59;
            minutes--;
        } else {
            if (hours > 0 ) {
                seconds = 59;
                minutes = 59;
                hours--;
            } else {
                alarm.play();
            }
        }
    }
    
    setTimer();
}

//funcion para frenar la alarma 
function stopTimer(){
    clearInterval(repeater);
    location.reload();
}