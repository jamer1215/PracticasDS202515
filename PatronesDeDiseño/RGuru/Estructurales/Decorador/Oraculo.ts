interface IOracle{
    printNumber(min:number, max:number):void
}

class Oracle implements IOracle{
    printNumber(min: number, max: number): void {
        console.log( Math.random() * (max - min + 1) + min);
    }

}

abstract class BaseDecoratorPrinter implements IOracle{

    constructor(private wrappee: IOracle, private mensaje:string){
        this.wrappee=wrappee;
        this.mensaje=mensaje
    }

    setMessage(mensaje:string):void{
        this.mensaje=mensaje
    }

    getMessage():string{
        return this.mensaje
    }
    

    printNumber(min: number, max: number): void {
        this.wrappee.printNumber(min,max);
    }

}

class WelcomeMessagePrinterDecorator extends BaseDecoratorPrinter{

    printNumber(min: number, max: number):void{

        this.printMessage()
        super.printNumber(min,max);

    }

    printMessage():void{
        console.log(this.getMessage())
    }
    
}

class GoodbyeMessagePrinterDecorator extends BaseDecoratorPrinter{

    printNumber(min: number, max: number):void{

        super.printNumber(min,max);
        this.printMessage()

    }

    printMessage():void{
        console.log(this.getMessage())
    }
    
}

//El asqueroso y horrible, codigo cliente:

let ora: Oracle = new Oracle()
let min:number = 1
let max:number = 3
let mensajeBienvenida = `Mensaje de bienvenida`
let mensajeDespedida = `Mensaje - saludo del final`

console.log("\nprintNumber() de ora:")
ora.printNumber(min,max)

let welcome:WelcomeMessagePrinterDecorator = new WelcomeMessagePrinterDecorator(ora,mensajeBienvenida)
console.log("\nprintNumber() de welcome que tiene ora:")
welcome.printNumber(min,max)

let goodbye:GoodbyeMessagePrinterDecorator = new GoodbyeMessagePrinterDecorator(welcome,mensajeDespedida)
console.log("\nprintNumber() de goodbye que tiene welcome")
goodbye.printNumber(min,max)

//para hacer la reversión:
welcome.setMessage(mensajeDespedida)
goodbye.setMessage(mensajeBienvenida)

console.log("\nprintNumber() con la reversión pertinente (Con goodbye porque es el que tiene a welcome)")
goodbye.printNumber(min,max)