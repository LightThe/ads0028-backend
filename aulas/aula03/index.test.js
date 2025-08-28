import { soma, div } from './index.js';

console.log("\nTeste 1:");
if(soma(1,1) === 2) console.log("passou!");
else console.error("deu ruim");

console.log("\nTeste 2:");
if(soma(1,0) === 1) console.log("passou!");
else console.error("deu ruim");

console.log("\nTeste 3:");
if(soma(1,-1) === 0) console.log("passou!");
else console.error("deu ruim");

console.log("\nTeste 4:");
if(div(1,1) === 1) console.log("passou!");
else console.error("deu ruim");

console.log("\nTeste 5:");
if(div(6,3) === 2) console.log("passou!");
else console.error("deu ruim");

console.log("\nTeste 4:");
if(div(1,0) === undefined) console.log("passou!");
else console.error("deu ruim");

