function calcularMediaAluno(a1, a2, a3) {

    if (!a1 || !a2) throw new Error("Notas a1 ou a2 não informadas");
    if (a1 < 0 || a2 < 0) throw new Error("Notas a1 ou a2 não podem ser negativas");

    if (!a3) return (a1 * 0.4) + (a2 * 0.6); //a3 não informada
    if (a3 < 0) throw new Error("Nota a3 não pode ser negativa");

    return Math.max(
        (a1 * 0.4) + (a2 * 0.6), // a3 não substitui
        (a1 * 0.4) + (a3 * 0.6), // a3 substitui a2
        (a3 * 0.4) + (a2 * 0.6)  // a3 substitui a1
    )

}

module.exports = { calcularMediaAluno };