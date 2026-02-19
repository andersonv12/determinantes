document.addEventListener('DOMContentLoaded', function() {
    
    // --- Listeners dos Botões de Cálculo ---
    document.getElementById('btnDet2x2').addEventListener('click', calcularDeterminante2x2);
    document.getElementById('btnDet3x3').addEventListener('click', calcularDeterminante3x3);
    document.getElementById('btnSis2x2').addEventListener('click', resolverSistema2x2);
    document.getElementById('btnSis3x3').addEventListener('click', resolverSistema3x3);
    document.getElementById('btnPitagoras').addEventListener('click', calcularPitagoras);

    
    // --- Listeners dos Botões de Limpar ---
    document.querySelectorAll('.btn-clear').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            limparCampos(target);
        });
    });
    

    // --- Funções Auxiliares (Leitura e Limpeza) ---
    
    function lerValor(id) {
        const elemento = document.getElementById(id);
        if (!elemento) { return NaN; }
        
        var valorStr = elemento.value.trim();
        
        if (valorStr === "") {
            elemento.style.borderColor = 'red'; 
            return NaN; 
        }
        
        valorStr = valorStr.replace(',', '.');
        var numero;

        if (valorStr.startsWith('sqrt(') && valorStr.endsWith(')')) {
            var dentroParenteses = valorStr.substring(5, valorStr.length - 1);
            var numInterno = parseFloat(dentroParenteses);
            numero = (!isNaN(numInterno) && numInterno >= 0) ? Math.sqrt(numInterno) : NaN;
        } else if (valorStr.startsWith('√')) {
            var numAposSimbolo = valorStr.substring(1);
            var numInterno = parseFloat(numAposSimbolo);
            numero = (!isNaN(numInterno) && numInterno >= 0) ? Math.sqrt(numInterno) : NaN;
        } else if (valorStr.includes('/') && valorStr.split('/').length === 2) {
            var partes = valorStr.split('/');
            var numerador = parseFloat(partes[0]);
            var denominador = parseFloat(partes[1]);
            numero = (!isNaN(numerador) && !isNaN(denominador) && denominador !== 0) ? (numerador / denominador) : NaN;
        } else {
            numero = parseFloat(valorStr);
        }
        
        elemento.style.borderColor = isNaN(numero) ? 'red' : '';
        return numero;
    }

   
    function lerValorPitagoras(id) {
        const elemento = document.getElementById(id);
        if (!elemento) { return NaN; } 

        var valorStr = elemento.value.trim();
        
        if (valorStr === "") {
            elemento.style.borderColor = ''; 
            return null; 
        }
        
        valorStr = valorStr.replace(',', '.');
        var numero;
        if (valorStr.startsWith('sqrt(') && valorStr.endsWith(')')) {
            var dentroParenteses = valorStr.substring(5, valorStr.length - 1);
            var numInterno = parseFloat(dentroParenteses);
            numero = (!isNaN(numInterno) && numInterno >= 0) ? Math.sqrt(numInterno) : NaN;
        } else if (valorStr.startsWith('√')) {
            var numAposSimbolo = valorStr.substring(1);
            var numInterno = parseFloat(numAposSimbolo);
            numero = (!isNaN(numInterno) && numInterno >= 0) ? Math.sqrt(numInterno) : NaN;
        } else if (valorStr.includes('/') && valorStr.split('/').length === 2) {
            var partes = valorStr.split('/');
            var numerador = parseFloat(partes[0]);
            var denominador = parseFloat(partes[1]);
            numero = (!isNaN(numerador) && !isNaN(denominador) && denominador !== 0) ? (numerador / denominador) : NaN;
        } else {
            numero = parseFloat(valorStr);
        }
        
        elemento.style.borderColor = isNaN(numero) ? 'red' : '';
        return numero;
    }

    function exibirResultado(elementoId, mensagem, tipo) {
        tipo = tipo || 'success';
        const elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.innerHTML = mensagem;
            elemento.className = 'result-box'; 
            elemento.classList.add(tipo);
        }
    }

    function det3x3(m) {
        const a = m[0], b = m[1], c = m[2], d = m[3], e = m[4], f = m[5], g = m[6], h = m[7], i = m[8];
        return (a * e * i) + (b * f * g) + (c * d * h) - (c * e * g) - (a * f * h) - (b * d * i);
    }

    // --- Novas Funções de Limpeza ---
    function limparInput(id) {
        const el = document.getElementById(id);
        if (el) {
            el.value = '';
            el.style.borderColor = '';
        }
    }

    function limparResultado(id) {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = '';
            el.className = 'result-box';
        }
    }

    function limparCampos(target) {
        switch (target) {
            case 'Det2x2':
                ['d2_00', 'd2_01', 'd2_10', 'd2_11'].forEach(limparInput);
                limparResultado('resultDet2x2');
                break;
            case 'Det3x3':
                ['d3_00', 'd3_01', 'd3_02', 'd3_10', 'd3_11', 'd3_12', 'd3_20', 'd3_21', 'd3_22'].forEach(limparInput);
                limparResultado('resultDet3x3');
                break;
            case 'Sis2x2':
                ['s2_00', 's2_01', 's2_02', 's2_10', 's2_11', 's2_12'].forEach(limparInput);
                limparResultado('resultSis2x2');
                break;
            case 'Sis3x3':
                ['s3_00', 's3_01', 's3_02', 's3_03', 's3_10', 's3_11', 's3_12', 's3_13', 's3_20', 's3_21', 's3_22', 's3_23'].forEach(limparInput);
                limparResultado('resultSis3x3');
                break;
            case 'Pitagoras':
                ['pit_a', 'pit_b', 'pit_c'].forEach(limparInput);
                limparResultado('resultPitagoras');
                break;
        }
    }


    // --- Funções de Cálculo ---

    const MENSAGEM_ERRO_VALIDACAO = "Erro: Verifique os campos em vermelho. Insira valores válidos (ex: '5', '3/4', '√9') e não deixe campos vazios.";

    function calcularDeterminante2x2() {
        const r = 'resultDet2x2';
        const a = lerValor('d2_00'), b = lerValor('d2_01'), c = lerValor('d2_10'), d = lerValor('d2_11');
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
            exibirResultado(r, MENSAGEM_ERRO_VALIDACAO, 'error'); return; 
        }
        exibirResultado(r, `Determinante = <strong>${((a * d) - (b * c)).toFixed(4)}</strong>`, 'success');
    }

    function calcularDeterminante3x3() {
        const r = 'resultDet3x3';
        const m = [
            lerValor('d3_00'), lerValor('d3_01'), lerValor('d3_02'),
            lerValor('d3_10'), lerValor('d3_11'), lerValor('d3_12'),
            lerValor('d3_20'), lerValor('d3_21'), lerValor('d3_22')
        ];
        var temErro = false;
        for (var i = 0; i < m.length; i++) { if (isNaN(m[i])) { temErro = true; break; } }
        if (temErro) { exibirResultado(r, MENSAGEM_ERRO_VALIDACAO, 'error'); return; }
        exibirResultado(r, `Determinante = <strong>${det3x3(m).toFixed(4)}</strong>`, 'success');
    }

    function resolverSistema2x2() {
        const r = 'resultSis2x2';
        const a1 = lerValor('s2_00'), b1 = lerValor('s2_01'), c1 = lerValor('s2_02');
        const a2 = lerValor('s2_10'), b2 = lerValor('s2_11'), c2 = lerValor('s2_12');
        if (isNaN(a1) || isNaN(b1) || isNaN(a2) || isNaN(b2) || isNaN(c1) || isNaN(c2)) {
            exibirResultado(r, MENSAGEM_ERRO_VALIDACAO, 'error'); return;
        }
        const D = (a1 * b2) - (b1 * a2), Dx = (c1 * b2) - (b1 * c2), Dy = (a1 * c2) - (c1 * a2);
        if (D !== 0) {
            exibirResultado(r, `Solução: <strong>x = ${(Dx / D).toFixed(4)}</strong>, <strong>y = ${(Dy / D).toFixed(4)}</strong> (SPD)`, 'success');
        } else if (Dx === 0 && Dy === 0) {
            exibirResultado(r, "<strong>Infinitas Soluções</strong> (SPI)", 'info');
        } else {
            exibirResultado(r, "<strong>Sem Solução</strong> (SI)", 'info');
        }
    }

    function resolverSistema3x3() {
        const r = 'resultSis3x3';
        const v = [
            lerValor('s3_00'), lerValor('s3_01'), lerValor('s3_02'), lerValor('s3_03'),
            lerValor('s3_10'), lerValor('s3_11'), lerValor('s3_12'), lerValor('s3_13'),
            lerValor('s3_20'), lerValor('s3_21'), lerValor('s3_22'), lerValor('s3_23')
        ];
        var temErro = false;
        for (var i = 0; i < v.length; i++) { if (isNaN(v[i])) { temErro = true; break; } }
        if (temErro) { exibirResultado(r, MENSAGEM_ERRO_VALIDACAO, 'error'); return; }
        const mD = [v[0], v[1], v[2], v[4], v[5], v[6], v[8], v[9], v[10]];
        const t1 = v[3], t2 = v[7], t3 = v[11];
        const mDx = [t1, v[1], v[2], t2, v[5], v[6], t3, v[9], v[10]];
        const mDy = [v[0], t1, v[2], v[4], t2, v[6], v[8], t3, v[10]];
        const mDz = [v[0], v[1], t1, v[4], v[5], t2, v[8], v[9], t3];
        const D = det3x3(mD), Dx = det3x3(mDx), Dy = det3x3(mDy), Dz = det3x3(mDz);
        if (D !== 0) {
            exibirResultado(r, `Solução: <strong>x = ${(Dx / D).toFixed(4)}</strong>, <strong>y = ${(Dy / D).toFixed(4)}</strong>, <strong>z = ${(Dz / D).toFixed(4)}</strong> (SPD)`, 'success');
        } else if (Dx === 0 && Dy === 0 && Dz === 0) {
            exibirResultado(r, "<strong>Infinitas Soluções</strong> (SPI)", 'info');
        } else {
            exibirResultado(r, "<strong>Sem Solução</strong> (SI)", 'info');
        }
    }

    function calcularPitagoras() {
        const r = 'resultPitagoras';
        const a = lerValorPitagoras('pit_a');
        const b = lerValorPitagoras('pit_b');
        const c = lerValorPitagoras('pit_c');
        const nullCount = (a === null) + (b === null) + (c === null);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            exibirResultado(r, "Erro: Um dos valores inseridos é inválido.", 'error'); return;
        }
        if (nullCount !== 1) {
            exibirResultado(r, "Erro: Deixe <strong>exatamente um</strong> campo vazio para calcular.", 'error'); return;
        }
        if (c === null) {
            const resultado = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            exibirResultado(r, `Hipotenusa (C) = <strong>${resultado.toFixed(4)}</strong>`, 'success');
        } else if (b === null) {
            if (c < a) {
                exibirResultado(r, "Erro: A hipotenusa (C) não pode ser menor que o cateto (A).", 'error'); return;
            }
            const resultado = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
            exibirResultado(r, `Cateto (B) = <strong>${resultado.toFixed(4)}</strong>`, 'success');
        } else if (a === null) {
            if (c < b) {
                exibirResultado(r, "Erro: A hipotenusa (C) não pode ser menor que o cateto (B).", 'error'); return;
            }
            const resultado = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
            exibirResultado(r, `Cateto (A) = <strong>${resultado.toFixed(4)}</strong>`, 'success');
        }
    }

    
    // --- Lógica de Navegação (Toggles e Abas) ---
    
    const modeToggle = document.getElementById('modeToggle');
    const calculatorModeContent = document.getElementById('calculatorModeContent');
    const learningModeContent = document.getElementById('learningModeContent');
    const modeLabel = document.getElementById('modeLabel');

    modeToggle.addEventListener('change', function() {
        if (this.checked) {
           
            calculatorModeContent.classList.remove('active');
            learningModeContent.classList.add('active');
            modeLabel.textContent = "Modo Aprendizado";
        } else {
           
            learningModeContent.classList.remove('active');
            calculatorModeContent.classList.add('active');
            modeLabel.textContent = "Modo Calculadora";
        }
    });


    
    const btnTogglePage = document.getElementById('btnTogglePage');
    const pageAlgebra = document.getElementById('pageAlgebra');
    const pageGeometria = document.getElementById('pageGeometria');

    btnTogglePage.addEventListener('click', function() {
        var isAlgebraActive = pageAlgebra.classList.contains('active');
        
        if (isAlgebraActive) {
            pageAlgebra.classList.remove('active');
            pageGeometria.classList.add('active');
            btnTogglePage.textContent = "Mudar para Álgebra (Sistemas/Determinantes)";
        } else {
            pageGeometria.classList.remove('active');
            pageAlgebra.classList.add('active');
            btnTogglePage.textContent = "Mudar para Geometria (Pitágoras)";
        }
    });

   
    const algebraNavButtons = document.querySelectorAll('#pageAlgebra .calculator-nav button');
    const algebraCalcPanes = document.querySelectorAll('#pageAlgebra .calculator-content');

    for (var i = 0; i < algebraNavButtons.length; i++) {
        algebraNavButtons[i].addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            
            for (var j = 0; j < algebraNavButtons.length; j++) {
                algebraNavButtons[j].classList.remove('active');
            }
            for (var j = 0; j < algebraCalcPanes.length; j++) {
                algebraCalcPanes[j].classList.remove('active');
            }
            
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            this.classList.add('active');
        });
    }

});