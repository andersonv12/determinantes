let info = 1;
let matrix;
function mudar_matriz() {
    let matriz = document.getElementById("botao").innerHTML;

    if (matriz == "Matriz 3x3"){
        document.getElementById("botao").innerHTML = "Matriz 2x2";
        document.getElementById("m2x2").style.visibility = "hidden";
        document.getElementById("m2x2").style.display = "none";
        document.getElementById("m3x3").style.visibility = "visible";
        document.getElementById("m3x3").style.removeProperty("display");
        matrix = "3x3";
    }
    else {
        document.getElementById("botao").innerHTML = "Matriz 3x3";
        document.getElementById("m3x3").style.visibility = "hidden";
        document.getElementById("m3x3").style.display = "none";
        document.getElementById("no_det1").style.visibility = "hidden";
        document.getElementById("no_det1").style.display = "none";
        document.getElementById("no_det2").style.visibility = "hidden";
        document.getElementById("no_det2").style.display = "none" ;
        document.getElementById("resultado").style.visibility = "hidden";
        document.getElementById("resultado").style.display = "none" ;
        document.getElementById("determinante").style.visibility = "hidden";
        document.getElementById("determinante").style.display = "none" ;
        document.getElementById("nan").style.visibility = "hidden";
        document.getElementById("nan").style.display = "none" ;
        document.getElementById("nan2").style.visibility = "hidden";
        document.getElementById("nan2").style.display = "none" ;
        document.getElementById("m2x2").style.visibility = "visible";
        document.getElementById("m2x2").style.removeProperty("display");
        matrix = "2x2";

    }

};


function site_det_2() {
    document.getElementById("no_det1").style.visibility = "hidden";
    document.getElementById("no_det1").style.display = "none";
    document.getElementById("no_det2").style.visibility = "hidden";
    document.getElementById("no_det2").style.display = "none" ;
    document.getElementById("nan").style.visibility = "hidden";
    document.getElementById("nan").style.display = "none" ;
    document.getElementById("nan2").style.visibility = "hidden";
    document.getElementById("nan2").style.display = "none" ;

    A11 = document.getElementById("A11").value;
    A12 = document.getElementById("A12").value;
    A21 = document.getElementById("A21").value;
    A22 = document.getElementById("A22").value;

    event.preventDefault();

    document.getElementById("resultado").style.visibility = "visible";
    document.getElementById("resultado").style.removeProperty("display");
    
    let det = det_2(A11,A12,A21,A22);

    if (det == 0) {
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("m2x2").style.visibility = "hidden";
        document.getElementById("m2x2").style.display = "none";
        document.getElementById("m3x3").style.visibility = "hidden";
        document.getElementById("m3x3").style.display = "none";
        document.getElementById("no_det1").style.visibility = "visible";
        document.getElementById("no_det1").style.removeProperty("display");
        document.getElementById("no_det2").style.visibility = "visible";
        document.getElementById("no_det2").style.removeProperty("display");
        document.getElementById("determinante_2").innerHTML = "";
    }
    else if (isNaN(det)){
        document.getElementById("nan").style.visibility = "visible";
        document.getElementById("nan").style.removeProperty("display");
        document.getElementById("nan2").style.visibility = "visible";
        document.getElementById("nan2").style.removeProperty("display");
        document.getElementById("determinante_2").innerHTML = "";
    }
    else{
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("m2x2").style.visibility = "hidden";
        document.getElementById("m2x2").style.display = "none";
        document.getElementById("m3x3").style.visibility = "hidden";
        document.getElementById("m3x3").style.display = "none";
        document.getElementById("determinante").style.visibility = "visible";
        document.getElementById("determinante").style.removeProperty("display");
        document.getElementById("determinante_2").style.visibility = "visible";
        document.getElementById("determinante_2").style.removeProperty("display");
        document.getElementById("determinante_2").innerHTML = det;
    }
}
function det_2(A11, A12, A21, A22){
    try{
    A11 = eval(A11);
    A12 = eval(A12);
    A21 = eval(A21);
    A22 = eval(A22);
    } catch (e){
        if (e instanceof ReferenceError) {
                A11 = parseFloat(A11);
                A12 = parseFloat(A12);
                A21 = parseFloat(A21);
                A22 = parseFloat(A22); 
        }
    }
    det = (A11 * A22 - A12 * A21).toFixed(2);
    
    return det;
}
function site_det_3() {
    document.getElementById("no_det1").style.visibility = "hidden";
    document.getElementById("no_det1").style.display = "none";
    document.getElementById("no_det2").style.visibility = "hidden";
    document.getElementById("no_det2").style.display = "none" ;
    document.getElementById("nan").style.visibility = "hidden";
    document.getElementById("nan").style.display = "none" ;
    document.getElementById("nan2").style.visibility = "hidden";
    document.getElementById("nan2").style.display = "none" ;

    
    B11 = document.getElementById("B11").value;
    B12 = document.getElementById("B12").value;
    B13 = document.getElementById("B13").value;
    B21 = document.getElementById("B21").value;
    B22 = document.getElementById("B22").value;
    B23 = document.getElementById("B23").value;
    B31 = document.getElementById("B31").value;
    B32 = document.getElementById("B32").value;
    B33 = document.getElementById("B33").value;

    event.preventDefault();

    document.getElementById("resultado").style.visibility = "visible";
    document.getElementById("resultado").style.removeProperty("display");
    
    let det = det_3(B11, B12, B13, B21, B22, B23, B31, B32, B33);

    if (det == 0) {
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("m2x2").style.visibility = "hidden";
        document.getElementById("m2x2").style.display = "none";
        document.getElementById("m3x3").style.visibility = "hidden";
        document.getElementById("m3x3").style.display = "none";
        document.getElementById("no_det1").style.visibility = "visible";
        document.getElementById("no_det1").style.removeProperty("display");
        document.getElementById("no_det2").style.visibility = "visible";
        document.getElementById("no_det2").style.removeProperty("display");
        document.getElementById("determinante_2").innerHTML = "";
    }
    else if (isNaN(det)){
        document.getElementById("nan").style.visibility = "visible";
        document.getElementById("nan").style.removeProperty("display");
        document.getElementById("nan2").style.visibility = "visible";
        document.getElementById("nan2").style.removeProperty("display");
        document.getElementById("determinante_2").innerHTML = "";
    }
    else{
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("m2x2").style.visibility = "hidden";
        document.getElementById("m2x2").style.display = "none";
        document.getElementById("m3x3").style.visibility = "hidden";
        document.getElementById("m3x3").style.display = "none";
        document.getElementById("determinante").style.visibility = "visible";
        document.getElementById("determinante").style.removeProperty("display");
        document.getElementById("determinante_2").style.visibility = "visible";
        document.getElementById("determinante_2").style.removeProperty("display");
        document.getElementById("determinante_2").innerHTML = det;
    }
}
function det_3(B11, B12, B13, B21, B22, B23, B31, B32, B33) {
    try{
    B11 = eval(B11);
    B12 = eval(B12);
    B13 = eval(B13);
    B21 = eval(B21);
    B22 = eval(B22);
    B23 = eval(B23);
    B31 = eval(B31);
    B32 = eval(B32);
    B33 = eval(B33);
    } catch (e){
        if (e instanceof ReferenceError){
                B11 = parseFloat(B11);
                B12 = parseFloat(B12);
                B13 = parseFloat(B13);
                B21 = parseFloat(B21);
                B22 = parseFloat(B22);
                B23 = parseFloat(B23);
                B31 = parseFloat(B31);
                B32 = parseFloat(B32);
                B33 = parseFloat(B33);
        }
    }
    det = ((B11 * det_2(B22,B23,B32,B33)) - (B12 * det_2(B21,B23,B31,B33)) + (B13 * det_2(B21, B22, B31, B32))).toFixed(2);
    return det;
}

function mudar_sistema() {
    let sistema = document.getElementById("botao").innerHTML;

    if (sistema == "Sistema 3x3"){
        document.getElementById("botao").innerHTML = "Sistema 2x2";
        document.getElementById("s2x2").style.visibility = "hidden";
        document.getElementById("s2x2").style.display = "none";
        document.getElementById("s3x3").style.visibility = "visible";
        document.getElementById("s3x3").style.removeProperty("display");
    }
    else {
        document.getElementById("botao").innerHTML = "Sistema 3x3";
        document.getElementById("s3x3").style.visibility = "hidden";
        document.getElementById("s3x3").style.display = "none";
        document.getElementById("nan").style.visibility = "hidden";
        document.getElementById("nan").style.display = "none" ;
        document.getElementById("nan2").style.visibility = "hidden";
        document.getElementById("nan2").style.display = "none" ; 
        document.getElementById("s2x2").style.visibility = "visible";
        document.getElementById("s2x2").style.removeProperty("display");
        document.getElementById("resultado").style.visibility = "hidden";
        document.getElementById("resultado").style.display = "none" ;
        document.getElementById("solucao").style.visibility = "hidden";
        document.getElementById("solucao").style.display = "none";
        document.getElementById("incognitas").style.visibility = "hidden";
        document.getElementById("incognitas").style.display = "none";
        document.getElementById("incognitas").innerHTML = "";

    }

};

function sis_2() {
    event.preventDefault();
    document.getElementById("no_det1").style.visibility = "hidden";
    document.getElementById("no_det1").style.display = "none";
    document.getElementById("no_det2").style.visibility = "hidden";
    document.getElementById("no_det2").style.display = "none" ;
    document.getElementById("nan").style.visibility = "hidden";
    document.getElementById("nan").style.display = "none" ;
    document.getElementById("nan2").style.visibility = "hidden";
    document.getElementById("nan2").style.display = "none" ;
    document.getElementById("resultado").style.visibility = "visible";
    document.getElementById("resultado").style.removeProperty("display");
    
    console.log(eval("2"))
    try{
    C11 = eval(document.getElementById("C11").value);
    C12 = eval(document.getElementById("C12").value);
    C13 = eval(document.getElementById("C13").value);
    C21 = eval(document.getElementById("C21").value);
    C22 = eval(document.getElementById("C22").value);
    C23 = eval(document.getElementById("C23").value);
    } catch (e) {
        if (e instanceof ReferenceError){
            C11 = parseFloat(document.getElementById("C11").value);
            C12 = parseFloat(document.getElementById("C12").value);
            C13 = parseFloat(document.getElementById("C13").value);
            C21 = parseFloat(document.getElementById("C21").value);
            C22 = parseFloat(document.getElementById("C22").value);
            C23 = parseFloat(document.getElementById("C23").value);
        }
    }

    det_sis = det_2(C11,C12,C21,C22);
    det_x = det_2(C13,C12,C23,C22);
    det_y = det_2(C11,C13,C21,C23);
    if (isNaN(det_sis) || isNaN(det_x) || isNaN(det_y)) {
        document.getElementById("nan").style.visibility = "visible";
        document.getElementById("nan").style.removeProperty("display");
        document.getElementById("nan2").style.visibility = "visible";
        document.getElementById("nan2").style.removeProperty("display"); 

    }
    else if (det_sis == 0 || det_x == 0 || det_y == 0){
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("s2x2").style.visibility = "hidden";
        document.getElementById("s2x2").style.display = "none";
        document.getElementById("s3x3").style.visibility = "hidden";
        document.getElementById("s3x3").style.display = "none";
        document.getElementById("no_det1").style.visibility = "visible";
        document.getElementById("no_det1").style.removeProperty("display");
        document.getElementById("no_det2").style.visibility = "visible";
        document.getElementById("no_det2").style.removeProperty("display");
        document.getElementById("incognitas").innerHTML = "";

    }
    else {
        x = (det_x/det_sis).toFixed(2);
        y = (det_y/det_sis).toFixed(2);
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("s2x2").style.visibility = "hidden";
        document.getElementById("s2x2").style.display = "none";
        document.getElementById("s3x3").style.visibility = "hidden";
        document.getElementById("s3x3").style.display = "none";
        document.getElementById("solucao").style.visibility = "visible";
        document.getElementById("solucao").style.removeProperty("display");
        document.getElementById("incognitas").style.visibility = "visible";
        document.getElementById("incognitas").style.removeProperty("display");
        document.getElementById("incognitas").innerHTML = `x = ${x} & y = ${y}`;
    }





}
function sis_3() {
    event.preventDefault();
    document.getElementById("no_det1").style.visibility = "hidden";
    document.getElementById("no_det1").style.display = "none";
    document.getElementById("no_det2").style.visibility = "hidden";
    document.getElementById("no_det2").style.display = "none" ;
    document.getElementById("nan").style.visibility = "hidden";
    document.getElementById("nan").style.display = "none" ;
    document.getElementById("nan2").style.visibility = "hidden";
    document.getElementById("nan2").style.display = "none" ;
    document.getElementById("resultado").style.visibility = "visible";
    document.getElementById("resultado").style.removeProperty("display");
    try{
    D11 = eval(document.getElementById("D11").value);
    D12 = eval(document.getElementById("D12").value);
    D13 = eval(document.getElementById("D13").value);
    D14 = eval(document.getElementById("D14").value);
    D21 = eval(document.getElementById("D21").value);
    D22 = eval(document.getElementById("D22").value);
    D23 = eval(document.getElementById("D23").value);
    D24 = eval(document.getElementById("D24").value);
    D31 = eval(document.getElementById("D31").value);
    D32 = eval(document.getElementById("D32").value);
    D33 = eval(document.getElementById("D33").value);
    D34 = eval(document.getElementById("D34").value);
    } catch (e){
        if (e instanceof ReferenceError){
                D11 = parseFloat(document.getElementById("D11").value);
                D12 = parseFloat(document.getElementById("D12").value);
                D13 = parseFloat(document.getElementById("D13").value);
                D14 = parseFloat(document.getElementById("D14").value);
                D21 = parseFloat(document.getElementById("D21").value);
                D22 = parseFloat(document.getElementById("D22").value);
                D23 = parseFloat(document.getElementById("D23").value);
                D24 = parseFloat(document.getElementById("D24").value);
                D31 = parseFloat(document.getElementById("D31").value);
                D32 = parseFloat(document.getElementById("D32").value);
                D33 = parseFloat(document.getElementById("D33").value);
                D34 = parseFloat(document.getElementById("D34").value);
        }
    }
    det_sis = det_3(D11,D12,D13,D21,D22,D23,D31,D32,D33);
    det_x = det_3(D14,D12,D13,D24,D22,D23,D34,D32,D33);
    det_y = det_3(D11,D14,D13,D21,D24,D23,D31,D34,D33);
    det_z = det_3(D11,D12,D14,D21,D22,D24,D31,D32,D34);
    if (isNaN(det_sis) || isNaN(det_x) || isNaN(det_y)) {
        document.getElementById("nan").style.visibility = "visible";
        document.getElementById("nan").style.removeProperty("display");
        document.getElementById("nan2").style.visibility = "visible";
        document.getElementById("nan2").style.removeProperty("display"); 

    }
    else if (det_sis == 0 || det_x == 0 || det_y == 0){
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("s2x2").style.visibility = "hidden";
        document.getElementById("s2x2").style.display = "none";
        document.getElementById("s3x3").style.visibility = "hidden";
        document.getElementById("s3x3").style.display = "none";
        document.getElementById("no_det1").style.visibility = "visible";
        document.getElementById("no_det1").style.removeProperty("display");
        document.getElementById("no_det2").style.visibility = "visible";
        document.getElementById("no_det2").style.removeProperty("display");
        document.getElementById("incognitas").innerHTML = "";

    }
    else {
        x = (det_x/det_sis).toFixed(2);
        y = (det_y/det_sis).toFixed(2);
        z = (det_z/det_sis).toFixed(2);
        document.getElementById("botao").innerHTML = "voltar";
        document.getElementById("s2x2").style.visibility = "hidden";
        document.getElementById("s2x2").style.display = "none";
        document.getElementById("s3x3").style.visibility = "hidden";
        document.getElementById("s3x3").style.display = "none";
        document.getElementById("solucao").style.visibility = "visible";
        document.getElementById("solucao").style.removeProperty("display");
        document.getElementById("incognitas").style.visibility = "visible";
        document.getElementById("incognitas").style.removeProperty("display");
        document.getElementById("incognitas").innerHTML = `x = ${x} & y = ${y} & z = ${z}`;
    }





}

function information(){
    if (info == 1){
        document.getElementById("principal").style.visibility = "hidden";
        document.getElementById("principal").style.display = "none";
        document.getElementById("documento").style.visibility = "visible";
        document.getElementById("documento").style.removeProperty("display");
        info = 2;
    }
    
    else{
        document.getElementById("principal").style.visibility = "visible";
        document.getElementById("principal").style.removeProperty("display");
        document.getElementById("documento").style.visibility = "hidden";
        document.getElementById("documento").style.display = "none";
        info = 1; 
    }

} 