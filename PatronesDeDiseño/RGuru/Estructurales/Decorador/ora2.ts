interface IOracle2 {  
    printNumber(min: number, max: number): void;  
}  

class Oracle2 implements IOracle2 {  
    printNumber(min: number, max: number): void {  
        console.log(Math.floor(Math.random() * (max - min + 1)) + min); // Se usa Math.floor para enteros  
    }  
}  

abstract class BaseDecoratorPrinter2 implements IOracle {  
    constructor(protected wrappee: IOracle) {}  

    printNumber(min: number, max: number): void {  
        this.wrappee.printNumber(min, max);  
    }  
}  

class WelcomeMessagePrinterDecorator2 extends BaseDecoratorPrinter2 {  
    printMessage(): void {  
        console.log(`Welcome to Oracle! A random number printer`);  
    }  

    printNumber(min: number, max: number): void {  
        this.printMessage();  
        super.printNumber(min, max);  
    }  
}  

class GoodbyeMessagePrinterDecorator2 extends BaseDecoratorPrinter2 {  
    printMessage(): void {  
        console.log(`Thanks for using Oracle Random Generator! Goodbye!`);  
    }  

    printNumber(min: number, max: number): void {  
        super.printNumber(min, max);  
        this.printMessage();  
    }  
}  

class CombinedMessageDecorator2 extends BaseDecoratorPrinter2 {  
    constructor(wrappee: IOracle2) {  
        super(wrappee);  
    }  

    printNumber(min: number, max: number): void {  
        // Este decorador imprime el mensaje de bienvenida primero y luego el de despedida  
        const welcomeDecorator = new WelcomeMessagePrinterDecorator2(this.wrappee);  
        welcomeDecorator.printNumber(min, max);  
        
        const goodbyeDecorator = new GoodbyeMessagePrinterDecorator2(this.wrappee);  
        goodbyeDecorator.printNumber(min, max);  
    }  
}  

// Ejemplo de uso  
let oraC: Oracle2 = new Oracle2();  
let minC: number = 1;  
let maxC: number = 3;  

console.log("\nprintNumber() de ora:");  
ora.printNumber(min, max);  

let welcomeC: WelcomeMessagePrinterDecorator2 = new WelcomeMessagePrinterDecorator2(oraC);  
console.log("\nprintNumber() de welcome que tiene ora:");  
welcome.printNumber(min, max);  

let goodbyeC: GoodbyeMessagePrinterDecorator2 = new GoodbyeMessagePrinterDecorator2(welcomeC);  
console.log("\nprintNumber() de goodbye que tiene welcome:");  
goodbye.printNumber(min, max);  

let combined: CombinedMessageDecorator2 = new CombinedMessageDecorator2(oraC);  
console.log("\nprintNumber() de combined que tiene ora:");  
combined.printNumber(min, max);