// math.js — funções para determinantes e método de Cramer

function getNumber(id) {
    const v = document.getElementById(id).value;
    return v === '' ? NaN : Number(v);
}

function show(id, text) {
    document.getElementById(id).innerHTML = text;
}

function calculateDet2() {
    const a = getNumber('d2_a');
    const b = getNumber('d2_b');
    const c = getNumber('d2_c');
    const d = getNumber('d2_d');
    if ([a,b,c,d].some(x => isNaN(x))) {
        show('resultDet2', 'Preencha todos os campos com números.');
        return;
    }
    const det = a*d - b*c;
    show('resultDet2', 'Determinante 2×2 = ' + det);
}

function calculateDet3() {
    const a11 = getNumber('d3_a11');
    const a12 = getNumber('d3_a12');
    const a13 = getNumber('d3_a13');
    const a21 = getNumber('d3_a21');
    const a22 = getNumber('d3_a22');
    const a23 = getNumber('d3_a23');
    const a31 = getNumber('d3_a31');
    const a32 = getNumber('d3_a32');
    const a33 = getNumber('d3_a33');
    const vals = [a11,a12,a13,a21,a22,a23,a31,a32,a33];
    if (vals.some(x => isNaN(x))) {
        show('resultDet3', 'Preencha todos os campos com números.');
        return;
    }
    // Regra de Sarrus
    const det = a11*a22*a33 + a12*a23*a31 + a13*a21*a32 - a13*a22*a31 - a11*a23*a32 - a12*a21*a33;
    show('resultDet3', 'Determinante 3×3 = ' + det);
}

function clearDet2() {
    ['d2_a','d2_b','d2_c','d2_d'].forEach(id => document.getElementById(id).value='');
    show('resultDet2','');
}

function clearDet3() {
    ['d3_a11','d3_a12','d3_a13','d3_a21','d3_a22','d3_a23','d3_a31','d3_a32','d3_a33'].forEach(id => document.getElementById(id).value='');
    show('resultDet3','');
}

// utilitário para determinante 3x3 dado array 3x3
function det3(m) {
    return m[0][0]*m[1][1]*m[2][2] + m[0][1]*m[1][2]*m[2][0] + m[0][2]*m[1][0]*m[2][1]
         - m[0][2]*m[1][1]*m[2][0] - m[0][0]*m[1][2]*m[2][1] - m[0][1]*m[1][0]*m[2][2];
}

function solveSystem() {
    const a11 = getNumber('s_a11');
    const a12 = getNumber('s_a12');
    const a13 = getNumber('s_a13');
    const a21 = getNumber('s_a21');
    const a22 = getNumber('s_a22');
    const a23 = getNumber('s_a23');
    const a31 = getNumber('s_a31');
    const a32 = getNumber('s_a32');
    const a33 = getNumber('s_a33');
    const b1 = getNumber('s_b1');
    const b2 = getNumber('s_b2');
    const b3 = getNumber('s_b3');
    const vals = [a11,a12,a13,a21,a22,a23,a31,a32,a33,b1,b2,b3];
    if (vals.some(x => isNaN(x))) {
        show('resultSystem', 'Preencha todos os campos com números.');
        return;
    }

    const M = [[a11,a12,a13],[a21,a22,a23],[a31,a32,a33]];
    const D = det3(M);
    if (D === 0) {
        // Verificar determinantes substituídos
        const Dx = det3([[b1,a12,a13],[b2,a22,a23],[b3,a32,a33]]);
        const Dy = det3([[a11,b1,a13],[a21,b2,a23],[a31,b3,a33]]);
        const Dz = det3([[a11,a12,b1],[a21,a22,b2],[a31,a32,b3]]);
        if (Dx===0 && Dy===0 && Dz===0) {
            show('resultSystem','Determinante D = 0. O sistema pode ter infinitas soluções (dependente).');
        } else {
            show('resultSystem','Determinante D = 0. O sistema não tem solução única (inconsistente ou dependente).');
        }
        return;
    }
    const Dx = det3([[b1,a12,a13],[b2,a22,a23],[b3,a32,a33]]);
    const Dy = det3([[a11,b1,a13],[a21,b2,a23],[a31,b3,a33]]);
    const Dz = det3([[a11,a12,b1],[a21,a22,b2],[a31,a32,b3]]);
    const x = Dx / D;
    const y = Dy / D;
    const z = Dz / D;
    show('resultSystem', `Solução: x = ${Number(x.toFixed(6))}, y = ${Number(y.toFixed(6))}, z = ${Number(z.toFixed(6))}`);
}

function clearSystem() {
    ['s_a11','s_a12','s_a13','s_a21','s_a22','s_a23','s_a31','s_a32','s_a33','s_b1','s_b2','s_b3'].forEach(id => document.getElementById(id).value='');
    show('resultSystem','');
}

// Export functions to global scope for inline onclick handlers (browsers already do this but explicit assignment helps some bundlers)
window.calculateDet2 = calculateDet2;
window.calculateDet3 = calculateDet3;
window.clearDet2 = clearDet2;
window.clearDet3 = clearDet3;
window.solveSystem = solveSystem;
window.clearSystem = clearSystem;
