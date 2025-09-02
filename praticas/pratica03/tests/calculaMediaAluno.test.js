const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test("calcularMediaAluno deve estar definida", function () {
    expect(calcularMediaAluno).toBeDefined();
});

test("deve retornar erro se a1 ou a2 forem indefinidos", function () {
    expect(() => calcularMediaAluno(2)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(undefined, 2)).toThrow("Notas a1 ou a2 não informadas");
});

test("deve validar se a1 e a2 são positivos", function () {
    expect(() => calcularMediaAluno(-1, 2)).toThrow("Notas a1 ou a2 não podem ser negativas")
    expect(() => calcularMediaAluno(4, -10)).toThrow("Notas a1 ou a2 não podem ser negativas")
});

test("deve calcular a média somente com a1 e a2", function () {
    const a1 = 4, a2 = 6;
    expect(calcularMediaAluno(a1, a2)).toBeCloseTo((a1 * 0.4) + (a2 * 0.6))
});

test("deve validar se a3 é positivo", function () {
    expect(() => calcularMediaAluno(4, 10, -6)).toThrow("Nota a3 não pode ser negativa")
});

test("deve calcular a melhor média substituindo a1 por a3", function(){
    const a1 = 4, a2 = 10, a3=9;
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo((a3 * 0.4) + (a2 * 0.6));
});

test("deve calcular a melhor média substituindo a2 por a3", function(){
    const a1 = 10, a2 = 4, a3=9;
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo((a1 * 0.4) + (a3 * 0.6));
});