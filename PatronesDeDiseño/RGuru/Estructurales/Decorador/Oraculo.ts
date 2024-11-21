interface IOracle{
    printNumber():void
}

class Oracle implements IOracle{
    printNumber(): void {
        console.log( Math.random()*100);
    }

}

abstract class BaseDecoratorPrinter implements IOracle{

    constructor(private wrappee: IOracle){
        this.wrappee=wrappee;
    }

    printNumber(): void {
        this.wrappee.printNumber();
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
    

    printNumber():void{

        this.printMessage()
        super.printNumber();

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

    setMessage(mensaje:string):void{//Pensandolo bien, mejor recurrir mas a opcion 2 que se ve mas adelante con codigo cliente!
        this.mensaje=mensaje
    }

    getMessage():string{
        return this.mensaje
    }

    printNumber():void{

        super.printNumber();
        this.printMessage()

    }

    printMessage():void{
        console.log(this.getMessage())
    }
    
}

//El asqueroso y horrible, codigo cliente:

let ora: Oracle = new Oracle()
let mensajeBienvenida = `Mensaje de bienvenida`
let mensajeDespedida = `Mensaje - saludo del final`

console.log("\nprintNumber() de ora:")
ora.printNumber()

let fromFirst:PrintFromFirstDecorator = new PrintFromFirstDecorator(ora,mensajeBienvenida)
console.log("\nprintNumber() de fromFirst que tiene ora:")
fromFirst.printNumber()

let fromLast:PrintFromLastDecorator = new PrintFromLastDecorator(fromFirst,mensajeDespedida)
console.log("\nprintNumber() de fromLast que tiene welcome")
fromLast.printNumber()

//para hacer la reversión:

//opcion 1: modificar los mensajes de una estructura decoradora ya creada que es la anterior (mejor evitar esto si fuera una evaluación)
fromFirst.setMessage(mensajeDespedida)
fromLast.setMessage(mensajeBienvenida)

console.log("\nprintNumber() con la reversión pertinente (Con fromLast porque es el que tiene a welcome)")
fromLast.printNumber()

//Opcion 2, hacemos nuevas instancias para crear la misma estructura decoradora pero pasandole distintos mensajes!
const decorador2 = new PrintFromLastDecorator(new PrintFromFirstDecorator(ora,mensajeDespedida),mensajeBienvenida)
console.log("\nprintNumber() con opcion 2 - decorador 2:)")
decorador2.printNumber()