let dimensaoAtual = 0; // Armazena 2 ou 3 para matrizes/sistemas
const PRECISAO = 6; // Define o número de casas decimais para cálculos internos (6 é um bom equilíbrio)

// --- FUNÇÃO DE ARREDONDAMENTO PARA CORRIGIR ERROS DE PONTO FLUTUANTE ---
function arredondar(numero) {
    return parseFloat(numero.toFixed(PRECISAO));
}

// --- Funções de Navegação e Configuração ---

const IDS_SECOES = [
    'secao-escolha-inicial', 
    'secao-matriz', 
    'secao-sistema', 
    'secao-sistema-normal'
];

function esconderTodasSecoes() {
    IDS_SECOES.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.classList.add('escondido');
        }
    });
}

function mostrarSecao(idSecao) {
    esconderTodasSecoes();
    const elemento = document.getElementById(idSecao);
    if (elemento) {
        elemento.classList.remove('escondido');
    }
}

function configurarMatrizNav() {
    mostrarSecao('secao-matriz');
    document.getElementById('container-matriz').innerHTML = '';
    document.getElementById('resultado-matriz').textContent = '';
}

function configurarSistemaNav() {
    dimensaoAtual = 0;
    mostrarSecao('secao-sistema');
}

function voltarParaInicial() {
    dimensaoAtual = 0;
    mostrarSecao('secao-escolha-inicial');
}

function configurarMatriz(dimensao) {
    dimensaoAtual = dimensao;
    gerarInputsMatriz('container-matriz', dimensao, calcularDeterminante, `input-m${dimensao}`);
}

function prepararSistemaNormal(dimensao) {
    dimensaoAtual = dimensao;
    const container = document.getElementById('entradas-equacoes');
    const instrucao = document.getElementById('instrucao-sistema-normal');
    container.innerHTML = '';
    document.getElementById('resultado-sistema-normal').textContent = '';

    const incognitas = dimensao === 2 ? ['x', 'y'] : ['x', 'y', 'z'];
    const instrucaoTexto = dimensao === 2 
        ? `Digite as duas equações (Ex: ${incognitas[0]} - ${incognitas[1]} = 5) nas linhas abaixo:`
        : `Digite as três equações (Ex: ${incognitas[0]} + 2${incognitas[1]} - ${incognitas[2]} = 10) nas linhas abaixo:`;
        
    instrucao.textContent = instrucaoTexto;
    
    for (let i = 0; i < dimensao; i++) {
        const textarea = document.createElement('textarea');
        textarea.id = `equacao-normal-${i}`;
        textarea.placeholder = `Equação ${i + 1}`;
        container.appendChild(textarea);
    }
    mostrarSecao('secao-sistema-normal');
}


// --- Funções Auxiliares de Matriz e Geração ---

function gerarInputsMatriz(idContainer, dimensao, funcaoOk, idPrefix) {
    const container = document.getElementById(idContainer);
    container.innerHTML = ''; 

    const grade = document.createElement('div');
    grade.className = 'matriz-input-grid';
    grade.style.setProperty('--colunas', dimensao); 

    for (let i = 0; i < dimensao; i++) {
        for (let j = 0; j < dimensao; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `${idPrefix}-${i}-${j}`;
            input.placeholder = `A${i + 1}${j + 1}`;
            input.value = 0;
            grade.appendChild(input);
        }
    }

    container.appendChild(grade);

    const botaoOk = document.createElement('button');
    botaoOk.textContent = 'OK - Calcular Determinante';
    botaoOk.onclick = funcaoOk;
    container.appendChild(botaoOk);
}

function obterValoresMatriz(dimensao, prefixo) {
    const matriz = [];
    for (let i = 0; i < dimensao; i++) {
        matriz[i] = [];
        for (let j = 0; j < dimensao; j++) {
            const input = document.getElementById(`${prefixo}-${i}-${j}`);
            const valor = parseFloat(input.value);
            if (isNaN(valor)) {
                return null;
            }
            matriz[i][j] = valor;
        }
    }
    return matriz;
}

function calcularDet(matriz, dimensao) {
    if (dimensao === 2) {
        const a = matriz[0][0], b = matriz[0][1];
        const c = matriz[1][0], d = matriz[1][1];
        return arredondar((a * d) - (b * c)); 
    } else if (dimensao === 3) {
        const [a, b, c] = matriz[0];
        const [d, e, f] = matriz[1];
        const [g, h, i] = matriz[2];

        const dp = (a * e * i) + (b * f * g) + (c * d * h);
        const ds = (c * e * g) + (a * f * h) + (b * d * i);

        return arredondar(dp - ds); 
    }
    return 0; 
}

function calcularDeterminante() {
    const prefixo = `input-m${dimensaoAtual}`;
    const matriz = obterValoresMatriz(dimensaoAtual, prefixo);
    const resultadoDiv = document.getElementById('resultado-matriz');

    if (!matriz) {
        resultadoDiv.textContent = "Erro: Por favor, insira apenas números válidos.";
        return;
    }

    if (dimensaoAtual === 2 || dimensaoAtual === 3) {
        const determinante = calcularDet(matriz, dimensaoAtual);
        resultadoDiv.textContent = `Determinante da Matriz ${dimensaoAtual}x${dimensaoAtual} = ${determinante}`;
    } else {
         resultadoDiv.textContent = `Dimensão de matriz inválida.`;
    }
}


// --- Funções de Cálculo - Sistema na Forma Normal (Parsing e Gauss-Jordan) ---

function analisarEquacao(equacao, incognitas) {
    let eqLimpa = equacao.replace(/\s/g, '').toLowerCase();
    const partes = eqLimpa.split('=');

    if (partes.length !== 2) return null;

    const ladoEsquerdoOriginal = partes[0];
    const termoIndependente = parseFloat(partes[1]);

    if (isNaN(termoIndependente)) return null;

    const coeficientes = [];
    let ladoEsquerdoMutavel = ladoEsquerdoOriginal;

    for (const incognita of incognitas) {
        const regex = new RegExp(`([+\\-]?)(\\d*\\.?\\d*)${incognita}`);
        const match = ladoEsquerdoMutavel.match(regex);
        
        let coeficiente = 0;

        if (match) {
            const termoCompleto = match[0];
            const sinal = match[1] || '+';
            let valorStr = match[2];
            
            let valor = 1; 
            if (valorStr !== '') {
                valor = parseFloat(valorStr);
            }
            
            if (sinal === '-') {
                valor *= -1;
            }
            coeficiente = valor;
            
            ladoEsquerdoMutavel = ladoEsquerdoMutavel.replace(termoCompleto, '');
        }
        
        coeficientes.push(coeficiente);
    }
    
    return { coefs: coeficientes, termoIndependente: termoIndependente };
}

function gaussJordan(matrizAugmentada, n) {
    const A = matrizAugmentada.map(row => [...row]); 

    for (let i = 0; i < n; i++) {
        let pivotRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[pivotRow][i])) {
                pivotRow = k;
            }
        }
        
        [A[i], A[pivotRow]] = [A[pivotRow], A[i]];

        let pivot = A[i][i];
        if (Math.abs(pivot) < 1e-9) { 
            return "Sistema Possível Indeterminado (SPI) ou Impossível (SI). Determinante ≈ 0.";
        }
        
        for (let j = i; j < n + 1; j++) {
            A[i][j] = arredondar(A[i][j] / pivot); 
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = A[k][i];
                for (let j = i; j < n + 1; j++) {
                    A[k][j] = arredondar(A[k][j] - factor * A[i][j]); 
                }
            }
        }
    }
    
    return A.map(row => row[n]); 
}

function calcularSistemaNormal() {
    const resultadoDiv = document.getElementById('resultado-sistema-normal');
    resultadoDiv.textContent = ''; 
    const n = dimensaoAtual;
    const incognitas = n === 2 ? ['x', 'y'] : ['x', 'y', 'z'];
    const resultadosAnalise = [];
    
    for (let i = 0; i < n; i++) {
        const eq = document.getElementById(`equacao-normal-${i}`).value;
        const resultado = analisarEquacao(eq, incognitas);
        if (!resultado) {
            resultadoDiv.textContent = `Erro na análise da Equação ${i + 1}. Verifique o formato (Ex: 2x - 3y = 7) e se todas as incógnitas necessárias estão presentes.`;
            return;
        }
        resultadosAnalise.push(resultado);
    }
    
    const matrizAugmentada = resultadosAnalise.map(res => [
        ...res.coefs, 
        res.termoIndependente
    ]);

    let solucao;

    if (n === 2) {
        // Usa Matriz Inversa para 2x2
        const A = [[matrizAugmentada[0][0], matrizAugmentada[0][1]], [matrizAugmentada[1][0], matrizAugmentada[1][1]]];
        const B = [[matrizAugmentada[0][2]], [matrizAugmentada[1][2]]];
        const detA = calcularDet(A, 2);

        if (Math.abs(detA) < 1e-9) {
            solucao = "Sistema Possível Indeterminado (SPI) ou Impossível (SI). Det(A) ≈ 0.";
        } else {
            const a = A[0][0], b = A[0][1], c = A[1][0], d = A[1][1];
            const detInverso = 1 / detA;
            const AInversa = [
                [arredondar(detInverso * d), arredondar(detInverso * (-b))],
                [arredondar(detInverso * (-c)), arredondar(detInverso * a)]
            ];
            const x = arredondar(AInversa[0][0] * B[0][0] + AInversa[0][1] * B[1][0]);
            const y = arredondar(AInversa[1][0] * B[0][0] + AInversa[1][1] * B[1][0]);
            solucao = [x, y];
        }

    } else if (n === 3) {
        // Usa Gauss-Jordan para 3x3
        solucao = gaussJordan(matrizAugmentada, n);
    }

    // 2. EXIBIÇÃO DO RESULTADO (CORREÇÃO DE FORMATO FINAL)
    if (typeof solucao === 'string') {
        resultadoDiv.innerHTML = `<h3>Resultado do Sistema ${n}x${n}</h3><p style="color:red;">${solucao}</p>`;
    } else if (Array.isArray(solucao)) {
        let htmlResultado = `<h3>Resultado do Sistema ${n}x${n}</h3>`;
        solucao.forEach((valor, index) => {
            let valorExibido;
            // Se o valor estiver muito próximo de um inteiro (tolerância 0.00001), exibe como inteiro.
            if (Math.abs(valor - Math.round(valor)) < 1e-5) {
                valorExibido = Math.round(valor);
            } else {
                valorExibido = valor.toFixed(4); // Caso contrário, exibe com 4 casas decimais.
            }

            htmlResultado += `<p>Valor de ${incognitas[index]}: <strong>${valorExibido}</strong></p>`;
        });
        resultadoDiv.innerHTML = htmlResultado;
    }
}