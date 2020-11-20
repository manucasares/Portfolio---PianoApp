
const piano = document.getElementById('piano');
const keys = document.getElementsByClassName('key');
const key_sounds = document.getElementsByTagName('audio');


// VOLUME SLIDER //
const volume = document.getElementById('slider');
const slider = document.getElementById('slider');
const fill = document.getElementsByClassName('fill')[0];
const volume_icons = document.querySelectorAll('.slider-container .fas');

let volumeCorrected;


// ARRAYS DATA
const keys_to_press = [ 'a', 'q', 's', 'w', 'd', 'f', 'e', 'g', 'r', 'h', 't', 'j', 'k', 'y', 'l', 'u', 'z', 'x', 'i', 'c', 'o', 'v', 'p', 'b' ];

const notes = [
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'
]

// LAST KEY PRESSED //
const last_key = document.getElementById('last_key_pressed');
const keyp = document.createTextNode('G3');
last_key.appendChild(keyp);

const changeLastKeyPressed = ( lastKeyIndex ) => {
    keyp.textContent = notes[lastKeyIndex]
}


// VOLUMEN
const removeShowClass = () => {
    volume_icons.forEach( icon => icon.classList.remove('show'));
}

// Evento change se ejecuta cuando soltemos el thumb del slider
volume.addEventListener('change', () => {
    [...key_sounds].forEach( key => {
        key.volume = volumeCorrected
    })
})

// Evento input se ejecuta al mismo de tiempo de la modificacion del thumb del slider
slider.addEventListener('input', () => {

    // llenamos la barra del slider segun el valor
    fill.style.width = `${slider.value}%`

    // lo dividimos para que esté en el rango aceptado ( 0 a 1 )
    // y seteamos el nuevo volumen
    volumeCorrected = volume.value / volume.max;


    // removemos primero la clase show a todos los iconos
    removeShowClass();

    // se la colocamos al icono que corresponda
    if ( volumeCorrected > .6 ) volume_icons[2].classList.add('show');
    else if ( volumeCorrected > 0 ) volume_icons[1].classList.add('show')
    else volume_icons[0].classList.add('show')
})


// MOUSE //
piano.addEventListener('click', ({target}) => {
    const key_index = [...keys].indexOf(target);  
    key_sounds[key_index].play();

    changeLastKeyPressed(key_index);
});


// TECLADO //
window.addEventListener('keypress', (e) => {

    // buscamos si la tecla apretada esta en el array
    const key_pressed_index = keys_to_press.findIndex( key => key === e.key);

    // si se aprieta una tecla que no está en el array retornamos
    if ( key_pressed_index === -1 ) return;

    key_sounds[key_pressed_index].play();


    const keyPressed = keys[key_pressed_index].classList;
    
    // Agregamos clase
    keyPressed.add('key-js-hover')
 
    // Retiramos clase cuando termine el audio
    key_sounds[key_pressed_index].onended = () => {
        keyPressed.remove('key-js-hover')
    }

    changeLastKeyPressed(key_pressed_index)
})

