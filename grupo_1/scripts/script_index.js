// ===== Alternar abas =====
const botoesAbas = document.querySelectorAll('.botao-aba'); // todos os botões de aba
const conteudosAbas = document.querySelectorAll('.conteudo-aba'); // todas as abas de conteúdo
const botoesResposta = document.querySelectorAll('.caixa-resultado'); // todas as caixas de resposta
botoesAbas.forEach(botao => {
  botao.addEventListener('click', () => {

    // Remove ativo de todas as abas(percorre todas as abas)
    botoesAbas.forEach(b => b.classList.remove('ativo'));
    // Esconde todos os conteúdos(percorre todos os conteúdos)
    conteudosAbas.forEach(c => c.classList.add('d-none'));

    // Ativa a aba clicada
    botao.classList.add('ativo');
    const alvo = document.querySelector(botao.dataset.alvo);
    alvo.classList.remove('d-none');
    
    
  });
});

// ===== Alternar inputs da matriz determinante =====
const tamanhoMatriz = document.getElementById('tamanho-matriz');
const inputs2x2 = document.getElementById('inputs-2x2');
const inputs3x3 = document.getElementById('inputs-3x3');

tamanhoMatriz.addEventListener('change', () => {
  if(tamanhoMatriz.value == '2') {
    inputs2x2.classList.remove('d-none');
    inputs3x3.classList.add('d-none');
  } else {
    inputs2x2.classList.add('d-none');
    inputs3x3.classList.remove('d-none');
  }
});



// Seleciona o select do tamanho do sistema
const tamanhoSistema = document.getElementById('tamanho-sistema');
// Seleciona os containers das matrizes
const inputs2x2Sistema = document.getElementById('inputs-2x2-sistema');
const inputs3x3Sistema = document.getElementById('inputs-3x3-sistema');

// Adiciona evento de mudança no select
tamanhoSistema.addEventListener('change', () => {
  if (tamanhoSistema.value === '2') {
    inputs2x2Sistema.classList.remove('d-none'); // mostra 2x2
    inputs3x3Sistema.classList.add('d-none');    // esconde 3x3
  } else {
    inputs2x2Sistema.classList.add('d-none');    // esconde 2x2
    inputs3x3Sistema.classList.remove('d-none'); // mostra 3x3
  }
});
const botaoTema = document.getElementById('botao-tema');
const root = document.documentElement;

// Função para aplicar o tema
function aplicarTema(tema) {
  if (tema === 'claro') {
    root.style.setProperty('--cor-fundo', '#FDF5F5');
    root.style.setProperty('--cor-texto', '#2B0A0A');
    root.style.setProperty('--cor-texto-secundaria', '#FFFFFF');
    root.style.setProperty('--cor-fundo-input', '#FFFFFF');
    root.style.setProperty('--cor-caixa-fundo', 'rgba(255, 245, 245, 0.9)');
    root.style.setProperty('--cor-container-sistema', 'rgba(255, 245, 245, 0.85)');
    root.style.setProperty('--cor-display', 'rgba(255, 180, 180, 0.2)');
    botaoTema.textContent = 'Tema Escuro';
  } else {
    root.style.setProperty('--cor-fundo', '#0A0A0A');
    root.style.setProperty('--cor-texto', '#E6DEFF');
    root.style.setProperty('--cor-texto-secundaria', '#FFFFFF');
    root.style.setProperty('--cor-fundo-input', '#121212');
    root.style.setProperty('--cor-caixa-fundo', 'rgba(18, 18, 18, 0.85)');
    root.style.setProperty('--cor-container-sistema', 'rgba(18, 18, 18, 0.75)');
    root.style.setProperty('--cor-display', 'rgba(180, 100, 100, 0.1)');
    botaoTema.textContent = 'Tema Claro';
  }
  // Salva o tema atual
  localStorage.setItem('tema', tema);
}

// Quando carregar a página, aplica o tema salvo (ou escuro como padrão)
const temaSalvo = localStorage.getItem('tema') || 'escuro';
aplicarTema(temaSalvo);

// Ao clicar, alterna o tema
botaoTema.addEventListener('click', () => {
  const temaAtual = localStorage.getItem('tema') === 'claro' ? 'escuro' : 'claro';
  aplicarTema(temaAtual);
});

function det2(A11, A12, A21, A22) {
  return A11*A22-A12*A21;
}

function det3(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
  let first = A11 * det2(A22, A23, A32, A33);
  let second = A12 * det2(A21, A23, A31, A33);
  let third = A13 * det2(A21, A22, A31, A32)

  return first - second + third;
}



let button_sis2x2=document.getElementById("Button_sis2x2");
let button_sis3x3=document.getElementById("Button_sis3x3");
let res_sis2x2= document.getElementById("sis2x2")
let res_sis3x3 = document.getElementById("sis3x3")


function simbolTrans (valores_para_traducao) {
  let simbolos = ['√', '^', "log", "/", "ln", "sen", "cos", "tg"]; //Lista de símbolos para equações
  
  for (let i = 0; i < valores_para_traducao.length; i++) { //itera todos os valores que deverão ser conferidos
    console.log(`Verificando campo ${i + 1}:`, valores_para_traducao[i], typeof valores_para_traducao[i]);
    for (let s of simbolos) { //considera s como todos os símbolos da lista
      if (String(valores_para_traducao[i]).includes(s)) { // então se o valor sendo conferido possuir "s" (vulgo qualquer símbolo)

        // 8 ^ 2
        let partes = valores_para_traducao[i].split(s); //divide a string em duas partes (antes e depois do símbolo)
        let partes_float = partes.map(x => parseFloat(x)); //passa a mesma lista inteira para float
          
        valores_para_traducao[i] = Number(partes[0]) //converte o valor da esquerda para inteiro (já que a maioria dos números do user vem na direita)
          
        if(s == simbolos[0]){
          if(Number.isNaN(partes_float[0])) {
            console.log(partes_float);
            valores_para_traducao[i] = Math.sqrt(partes_float[1]); //Finalmente define o valor que está sendo conferido sendo igual à respectiva equação
          }else {
            valores_para_traducao[i] = partes_float[0]*(partes_float[1] ** 0.5);
          }
        }

        else if(s == simbolos[1]){
          valores_para_traducao[i] = partes_float[0] ** partes_float[1]
        }

        else if(s == simbolos[2]){
          valores_para_traducao[i] = Math.log10(partes_float[0]) 
        }

        else if(s == simbolos[3]){
          valores_para_traducao[i] = partes_float[0] / partes_float[1];
        }
        else if(s == simbolos[4]){
          valores_para_traducao[i] = Math.log(partes_float[0]);
        }
        else if(s == simbolos[5]){
          valores_para_traducao[i] = Math.sin(partes_float[0]);
        }
        else if(s == simbolos[6]){
          valores_para_traducao[i] = Math.cos(partes_float[0]);
        }
        else if(s == simbolos[7]){
          valores_para_traducao[i] = Math.tan(partes_float[0]);
        }
        console.log(`O campo ${i+1} contém o símbolo: ${s}`);

      }else {
        valores_para_traducao[i] = valores_para_traducao[i];
      }
    }
  }
  return valores_para_traducao;
}
button_sis2x2.addEventListener("click", () => {
  let x;
  let y;

    let Da11 = String(document.getElementById("2a11").value);
    let Da12 = String(document.getElementById("2a12").value);
    let Db1  = String(document.getElementById("2b1").value);
    let Da21 = String(document.getElementById("2a21").value);
    let Da22 = String(document.getElementById("2a22").value);
    let Db2  = String(document.getElementById("2b2").value);
    let res_sis2x2 = document.getElementById("sis2x2")
    let valores_para_traducao = []; //lista dos números que serão convertidos
    valores_para_traducao.push(Da11, Da12, Db1, Da21, Da22, Db2); //Adiciona os valores das variáveis a serem traduzidos
    let traduzidos = simbolTrans(valores_para_traducao);
    Da11 = traduzidos[0];
    Da12 = traduzidos[1];
    Db1 = traduzidos[2];
    Da21 = traduzidos[3];
    Da22 = traduzidos[4];
    Db2 = traduzidos[5];

    if (det2(Da11,Da12,Da21,Da22)===0){
      if ((Da11/Da21) == (Db1/Db2)){
        res_sis2x2.innerHTML = "Resultado: Infinito";
      }
      else{
        res_sis2x2.innerHTML = "Esses numeros estão errados";
      }
      
    }
    else{
      x=det2(Db1,Da12,Db2,Da22)/det2(Da11,Da12,Da21,Da22)
      y=det2(Da11,Db1,Da21,Db2)/det2(Da11,Da12,Da21,Da22)
      if (isNaN(x) || isNaN(y)){
        res_sis2x2.innerHTML= "Algum campo tem um numero errado"
      }
      else{
      res_sis2x2.innerHTML= `<pre>
    |${Db1},${Da12}|
    |${Db2},${Da22}|
x = ------
    |${Da11},${Da12}|
    |${Da21},${Da22}|

    |${Da11},${Db1}|
    |${Da21},${Db2}|
y = ------
    |${Da11},${Da12}|
    |${Da21},${Da22}|

Resultado: (${x}, ${y})
      </pre>`;
      }
    }
})

button_sis3x3.addEventListener("click", () => {
  let x;
  let y;
  let z;
  let Ta11 = String(document.getElementById("3a11").value);
  let Ta12 = String(document.getElementById("3a12").value);
  let Ta13 = String(document.getElementById("3a13").value);
  let Tb1  = String(document.getElementById("3b1").value);
  let Ta21 = String(document.getElementById("3a21").value);
  let Ta22 = String(document.getElementById("3a22").value);
  let Ta23 = String(document.getElementById("3a23").value);
  let Tb2  = String(document.getElementById("3b2").value);
  let Ta31 = String(document.getElementById("3a31").value);
  let Ta32 = String(document.getElementById("3a32").value);
  let Ta33 = String(document.getElementById("3a33").value);
  let Tb3  = String(document.getElementById("3b3").value);

  let valores_para_traducao = []; //lista dos números que serão convertidos
  valores_para_traducao.push(Ta11, Ta12, Ta13, Tb1, Ta21, Ta22, Ta23, Tb2, Ta31, Ta32, Ta33, Tb3); //Adiciona os valores das variáveis a serem traduzidos
  let traduzidos = simbolTrans(valores_para_traducao);
  Ta11 = traduzidos[0];
  Ta12 = traduzidos[1];
  Ta13 = traduzidos[2];
  Tb1 = traduzidos[3];
  Ta21 = traduzidos[4];
  Ta22 = traduzidos[5];
  Ta23 = traduzidos[6];
  Tb2 = traduzidos[7];
  Ta31 = traduzidos[8];
  Ta32 = traduzidos[9];
  Ta33 = traduzidos[10];
  Tb3 = traduzidos[11];
    
    
  if (det3(Ta11,Ta12,Ta13,Ta21,Ta22,Ta23,Ta31,Ta32,Ta33)===0){
    if ((Ta11/Ta21)==(Tb1/Tb2) || (Ta11/Ta31)==(Tb1/Tb3) || (Ta21/Ta31)==(Tb2/Tb3)){
      res_sis3x3.innerHTML= "Resultado: Infinito";
    }
    else{
      res_sis3x3.innerHTML= "Resultado: Esses numeros estão errados";
    }
      
  }
  else{
    x=det3(Tb1,Ta12,Ta13,Tb2,Ta22,Ta23,Tb3,Ta32,Ta33)/det3(Ta11,Ta12,Ta13,Ta21,Ta22,Ta23,Ta31,Ta32,Ta33)
    y=det3(Ta11,Tb1,Ta13,Ta21,Tb2,Ta23,Ta31,Tb3,Ta33)/det3(Ta11,Ta12,Ta13,Ta21,Ta22,Ta23,Ta31,Ta32,Ta33)
    z=det3(Ta11,Ta12,Tb1,Ta21,Ta22,Tb2,Ta31,Ta32,Tb3)/det3(Ta11,Ta12,Ta13,Ta21,Ta22,Ta23,Ta31,Ta32,Ta33)

    res_sis3x3.innerHTML= `<pre>
    |${Tb1},${Ta12},${Ta13}|
    |${Tb2},${Ta22},${Ta23}|
    |${Tb3},${Ta32},${Ta33}|
x = ------
    |${Ta11},${Ta12},${Ta13}|
    |${Ta21},${Ta22},${Ta23}|
    |${Ta31},${Ta32},${Ta33}|

    |${Ta11},${Tb1},${Ta13}|
    |${Ta21},${Tb2},${Ta23}|
    |${Ta31},${Tb3},${Ta33}|
y = ------
    |${Ta11},${Ta12},${Ta13}|
    |${Ta21},${Ta22},${Ta23}|
    |${Ta31},${Ta32},${Ta33}|

    |${Ta11},${Ta12},${Tb1}|
    |${Ta21},${Ta22},${Tb2}|
    |${Ta31},${Ta32},${Tb3}|
z = ------
    |${Ta11},${Ta12},${Ta13}|
    |${Ta21},${Ta22},${Ta23}|
    |${Ta31},${Ta32},${Ta33}|    

Resultado: (${x}, ${y}, ${z})
      </pre>`;
    }
})

let resetSis = document.getElementById("resetarSis")

resetSis.addEventListener("click", () => {
  if (tamanhoSistema.value == 2) {
    document.getElementById("2a11").value = null;
    document.getElementById("2a12").value = null;
    document.getElementById("2b1").value = null;
    document.getElementById("2a21").value = null;
    document.getElementById("2a22").value = null;
    document.getElementById("2b2").value = null;
  } else {
    document.getElementById("3a11").value = null;
    document.getElementById("3a12").value = null;
    document.getElementById("3a13").value = null;
    document.getElementById("3a21").value = null;
    document.getElementById("3a22").value = null;
    document.getElementById("3a23").value = null;
    document.getElementById("3a31").value = null;
    document.getElementById("3a32").value = null;
    document.getElementById("3a33").value = null;
    document.getElementById("3b1").value = null;
    document.getElementById("3b2").value = null;
    document.getElementById("3b3").value = null;
  }
})

let resetDet2x2 = document.getElementById("resetarDet2x2")
let resetDet3x3 = document.getElementById("resetarDet3x3")
let res2x2 = document.getElementById("det2x2");
let res3x3 = document.getElementById("det3x3");

resetDet2x2.addEventListener("click", () => {
    document.getElementById("2A11").value = null;
    document.getElementById("2A12").value = null;
    document.getElementById("2A21").value = null;
    document.getElementById("2A22").value = null;
    res2x2.innerHTML = "Resultado:";
});
resetDet3x3.addEventListener("click", () => {
    document.getElementById("3A11").value = null;
    document.getElementById("3A12").value = null;
    document.getElementById("3A13").value = null;
    document.getElementById("3A21").value = null;
    document.getElementById("3A22").value = null;
    document.getElementById("3A23").value = null;
    document.getElementById("3A31").value = null;
    document.getElementById("3A32").value = null;
    document.getElementById("3A33").value = null;
    res3x3.innerHTML = "Resultado:";
  });

let button_det2x2 = document.getElementById("button_det2x2");

button_det2x2.addEventListener("click", () => {
  let det;
    let DA11 = String(document.getElementById("2A11").value);
    let DA12 = String(document.getElementById("2A12").value);
    let DA21 = String(document.getElementById("2A21").value);
    let DA22 = String(document.getElementById("2A22").value);

    let valores_para_traducao = []; //lista dos números que serão convertidos
    valores_para_traducao.push(DA11, DA12, DA21, DA22); //Adiciona os valores das variáveis a serem traduzidos
    let traduzidos = simbolTrans(valores_para_traducao);
    DA11 = traduzidos[0];
    DA12 = traduzidos[1];
    DA21 = traduzidos[2];
    DA22 = traduzidos[3];

    det = det2(DA11, DA12, DA21, DA22);
    res2x2.innerHTML= "Resultado: "+det;
  });

let button_det3x3 = document.getElementById("button_det3x3");

button_det3x3.addEventListener("click", () => {
    let TA11 = String(document.getElementById("3A11").value);
    let TA12 = String(document.getElementById("3A12").value);
    let TA13 = String(document.getElementById("3A13").value);
    let TA21 = String(document.getElementById("3A21").value);
    let TA22 = String(document.getElementById("3A22").value);
    let TA23 = String(document.getElementById("3A23").value);
    let TA31 = String(document.getElementById("3A31").value);
    let TA32 = String(document.getElementById("3A32").value);
    let TA33 = String(document.getElementById("3A33").value);

    let valores_para_traducao = []; //lista dos números que serão convertidos
    valores_para_traducao.push(TA11, TA12, TA13, TA21, TA22, TA23, TA31, TA32, TA33); //Adiciona os valores das variáveis a serem traduzidos
    let traduzidos = simbolTrans(valores_para_traducao);
    TA11 = traduzidos[0];
    TA12 = traduzidos[1];
    TA13 = traduzidos[2];
    TA21 = traduzidos[3];
    TA22 = traduzidos[4];
    TA23 = traduzidos[5];
    TA31 = traduzidos[6];
    TA32 = traduzidos[7];
    TA33 = traduzidos[8];

    det = det3(TA11, TA12, TA13, TA21, TA22, TA23, TA31, TA32, TA33);
    res3x3.innerHTML= "Resultado: "+det;
  });

document.querySelectorAll('input').forEach(input => {
  input.setAttribute('autocomplete', 'off');
});


// =====================
//  PUXADORES LATERAIS
// =====================

var puxadores = document.querySelectorAll('.puxador-container');
var puxadoresPai = document.querySelector('.puxadores');

puxadores.forEach(function(puxador) {
  var botao = puxador.querySelector('.puxador-botao');
  var fechar = puxador.querySelector('.puxador-fechar');
  var conteudo = puxador.querySelector('.puxador-conteudo');

  botao.addEventListener('click', function(e) {
    e.stopPropagation();

    puxadores.forEach(function(p) {
      p.classList.remove('ativo');
      p.classList.remove('escondido');
    });

    if (!puxador.classList.contains('ativo')) {
      puxador.classList.add('ativo');
      puxadores.forEach(function(p) {
        if (p !== puxador) p.classList.add('escondido');
      });
    }
  });

  if (fechar) {
    fechar.addEventListener('click', function(e) {
      e.stopPropagation();
      puxador.classList.remove('ativo');
      puxadores.forEach(function(p) {
        p.classList.remove('escondido');
      });
    });
  }

  conteudo.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// =====================
//  COPIAR SÍMBOLOS
// =====================

var botoes = document.querySelectorAll('.botao-simbolo');
var msg = document.getElementById('texto-copiado');
var msgMobile = document.getElementById('texto-copiado-mobile');
var inputAtivo = null;

document.querySelectorAll('input[type="text"], input[type="number"]').forEach(function(input) {
  input.addEventListener('focus', function() { inputAtivo = input; });
  input.addEventListener('blur', function() { inputAtivo = null; });
});

botoes.forEach(function(botao) {
  botao.addEventListener('click', function(e) {
    e.stopPropagation();
    var simbolo = botao.getAttribute('data-simbolo');
    var temp = document.createElement('textarea');
    temp.value = simbolo;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);

    var mensagemAtiva = msg || msgMobile;

    if (inputAtivo) {
      if (inputAtivo.type === 'number') {
        inputAtivo.type = 'text';
      }
      var inicio = inputAtivo.selectionStart || 0;
      var fim = inputAtivo.selectionEnd || inputAtivo.value.length;
      inputAtivo.value = inputAtivo.value.slice(0, inicio) + simbolo + inputAtivo.value.slice(fim);
      inputAtivo.focus();
      if (mensagemAtiva) {
        mensagemAtiva.textContent = `"${simbolo}" inserido no campo!`;
        mensagemAtiva.classList.add('mostrar');
      }
    } else {
      if (mensagemAtiva) {
        mensagemAtiva.textContent = `"${simbolo}" copiado! Cole onde quiser.`;
        mensagemAtiva.classList.add('mostrar');
      }
    }

    document.addEventListener('click', function(ev) {
      if (!ev.target.classList.contains('botao-simbolo')) {
        if (msg) msg.classList.remove('mostrar');
        if (msgMobile) msgMobile.classList.remove('mostrar');
      }
    }, { once: true });
  });
});



// =====================
//  MENU LATERAL MOBILE
// =====================

const botaoMenu = document.getElementById('botao-menu');
const menuLateral = document.getElementById('menu-lateral');
const menuOverlay = document.getElementById('menu-overlay');
const menuFechar = document.getElementById('menu-fechar');
const itensMenu = document.querySelectorAll('#menu-lateral .menu-item');

function abrirMenu() {
  menuLateral.classList.add('ativo');
  menuOverlay.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharMenu() {
  menuLateral.classList.remove('ativo');
  menuOverlay.classList.remove('ativo');
  document.body.style.overflow = '';
}

botaoMenu.addEventListener('click', (e) => {
  e.stopPropagation();
  abrirMenu();
});

menuFechar.addEventListener('click', (e) => {
  e.stopPropagation();
  fecharMenu();
});

menuOverlay.addEventListener('click', () => {
  fecharMenu();
});

function mostrarSecao(idSecao) {
  if (window.innerWidth > 768) return;
  
  document.querySelectorAll('.secao-mobile').forEach(secao => {
    secao.classList.remove('ativa');
  });
  
  const secao = document.querySelector(idSecao);
  if (secao) {
    secao.classList.add('ativa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

itensMenu.forEach(item => {
  item.addEventListener('click', () => {
    mostrarSecao(item.getAttribute('data-alvo'));
    fecharMenu();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuLateral.classList.contains('ativo')) {
    fecharMenu();
  }
});

