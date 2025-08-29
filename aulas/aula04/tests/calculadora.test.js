const calculadora = require('../src/calculadora');

describe("Testa as funções da calculadora.js", function () {
    test("2 + 2 = 4?", function () {
        expect(calculadora.soma(2, 2)).toBe(4);
    });

    test("1 + 0 = 1?", function () {
        expect(calculadora.soma(1, 0)).toBe(1);
    });

    test("1 + -1 = 0?", function () {
        expect(calculadora.soma(1, -1)).toBe(0);
    });

    test("Multiplicação de inteiros deve resultar em inteiro", function () {
        expect(calculadora.multiplicacao).toBeDefined();
        expect(calculadora.multiplicacao(2, 2)).toBe(4);
        expect(calculadora.multiplicacao(2, 0)).toBe(0);
        expect(calculadora.multiplicacao(2, -2)).toBe(-4);
        expect(calculadora.multiplicacao(-2, -1)).toBe(2);
    });

    test("Não pode dividir por zero", function () {
        expect(calculadora.divisao).toBeDefined();
        expect(() => calculadora.divisao(4, 0)).toThrow("Não pode dividir por zero!");
    });

    test("Divisão de inteiros deve resultar em _algo_", function () {
        expect(calculadora.divisao(2, 2)).toBe(1);
        expect(calculadora.divisao(2, 1)).toBe(2);
    });
});