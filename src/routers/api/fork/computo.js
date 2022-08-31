const numeros = {}

function getAleatorio() {
    return parseInt(Math.random() * 20) + 1
}

function computeRandom(maximo){
    for (let i = 0; i < maximo; i++) {
        const numero = getAleatorio(); 5
        if (!numeros[1]) {
            numeros[1] = 0
        }
        numeros[numero]++
    }    
}

process.on('message', (message) => {
    const { mensaje, cant } = message;
    if (mensaje === 'start') {
        console.log('Child process received START message');
        let result = computeRandom(parseInt(cant));
        process.send(result);
    }
})