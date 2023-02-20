/* insere-se um numero,
adiciona o operador e guarda o numero na memoria
adiciona outro numero e se encerra a execução */
'use strict'

const display = document.getElementById('display');
//interessante querySelectorAll faz com que busque em css e html
//id*=tecla busca todos elementos que iniciam com tecla
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () =>
    operador !== undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay (resultado);
        
        /* switch (operador) {
            case '+' : 
                atualizarDisplay(numeroAnterior + numeroAtual);
                break;
            case '-' :
                atualizarDisplay(numeroAnterior - numeroAtual);
                break;
            case '/' :
                atualizarDisplay(numeroAnterior / numeroAtual);
                break;
            case '*' :
                atualizarDisplay(numeroAnterior * numeroAtual);
                break;
        } */
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
}

const inserirNumero = (evento) => 
    atualizarDisplay(evento.target.textContent);
//varre todos elementos de um array
numeros.forEach (numero => 
    numero.addEventListener('click', inserirNumero)
    );

const selecionarOperador = (evento) => {
    if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    console.log(operador);
    }
}
operadores.forEach( operador =>
    operador.addEventListener('click', selecionarOperador)
    );

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => {
    display.textContent = '';
}
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const backspace = () => {
    display.textContent = display.textContent.slice(0, -1);
}
document.getElementById('backspace').addEventListener('click', backspace);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeNumero = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeNumero()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '0' : 'tecla0',
    '/' : 'operadorDividir',
    '*' : 'operadorMultiplicar',
    '+' : 'operadorAdicionar',
    '-' : 'operadorSubtrair',
    '=' : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal',
    '.'         : 'decimal'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);