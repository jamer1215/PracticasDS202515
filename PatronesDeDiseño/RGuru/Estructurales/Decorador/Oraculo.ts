interface IOracle{
    printNumber(min:number, max:number):void
}

class Oracle implements IOracle{
    printNumber(min: number, max: number): void {
        console.log( Math.random() * (max - min + 1) + min);
    }

}

abstract class BaseDecoratorPrinter implements IOracle{

    constructor(private wrappee: IOracle){
        this.wrappee=wrappee;
    }

    printNumber(min: number, max: number): void {
        this.wrappee.printNumber(min,max);
    }

}

class PrintFromFirstDecorator extends BaseDecoratorPrinter{

    constructor(wrappee: IOracle, private mensaje:string){
        super(wrappee)
        this.mensaje=mensaje
    }

    setMessage(mensaje:string):void{
        this.mensaje=mensaje
    }

    getMessage():string{
        return this.mensaje
    }
    

    printNumber(min: number, max: number):void{

        this.printMessage()
        super.printNumber(min,max);

    }

    printMessage():void{
        console.log(this.getMessage())
    }
    
}

class PrintFromLastDecorator extends BaseDecoratorPrinter{
    
    constructor(wrappee: IOracle, private mensaje:string){
        super(wrappee)
        this.mensaje=mensaje
    }

    setMessage(mensaje:string):void{
        this.mensaje=mensaje
    }

    getMessage():string{
        return this.mensaje
    }

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

let fromFirst:PrintFromFirstDecorator = new PrintFromFirstDecorator(ora,mensajeBienvenida)
console.log("\nprintNumber() de fromFirst que tiene ora:")
fromFirst.printNumber(min,max)

let fromLast:PrintFromLastDecorator = new PrintFromLastDecorator(fromFirst,mensajeDespedida)
console.log("\nprintNumber() de fromLast que tiene welcome")
fromLast.printNumber(min,max)

//para hacer la reversión:
fromFirst.setMessage(mensajeDespedida)
fromLast.setMessage(mensajeBienvenida)

console.log("\nprintNumber() con la reversión pertinente (Con fromLast porque es el que tiene a welcome)")
fromLast.printNumber(min,max)