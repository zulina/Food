// --- 1 ---

// const promisify = (item, delay) =>
//     new Promise(resolve => setTimeout(() => resolve(item), delay));
 
// const a = () => promisify('a', 100);
// const b = () => promisify('b', 5000);
// const c = () => promisify('c', 3000);
 
// function one() {
//     const promises = [a(), b(), c()];
//     Promise.all(promises).then(values => console.log(values))
// }
 
// one();

// --- 2 ---

// const promisify = (item, delay) =>
//     new Promise(resolve => setTimeout(() => resolve(item), delay));
 
// const a = () => promisify('a', 100);
// const b = () => promisify('b', 5000);
// const c = () => promisify('c', 3000);
 
// async function two() {
//     const promises = [a(), b(), c()];
//     const outpu1 = await Promise.race(promises);
//     return `two is done: ${outpu1}`;
// }
 
// two().then(console.log);

// --- 3 ---

// const promisify = (item, delay) =>
//     new Promise(resolve => setTimeout(() => resolve(item), delay));
 
// const a = () => promisify('a', 100);
// const b = () => promisify('b', 5000);
// const c = () => promisify('c', 3000);
 
// async function three() {
//     const outpu1 = await a();
//     const outpu2 = await b();
//     const outpu3 = await c();
//     return `three is done: ${outpu1} ${outpu2} ${outpu3}`
// }
 
// three().then(console.log);

// class Example {
//     constructor(prop){
//         this.prop = prop;
//     }
 
//     showThis() {
//         console.log(this)
//     }
// }
 
// new Example('smth').showThis();

class Example {
    constructor(prop){
        this.prop = prop;
    }
 
    showThis() {
        console.log(this)
    }
 
    doSmth(){
        console.log('Действие');
        console.log(this)
        return this.showThis;
    }
}

console.log('1');
const func = new Example('smth').doSmth();
console.log('2');
func();