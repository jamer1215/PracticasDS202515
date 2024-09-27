class Celda <T>{

    constructor(public valor: T){

        this.valor=valor;

    }

    public reducir (f:(e1:T,e2:T)=>T):T{
        return f(this.valor,this.valor)
    }

}

class Caja <T> extends Celda<T>{

    elementos: Celda<T>[]//relación de composición de Caja con celda

    constructor(valor: T, elementos:Celda<T>[]) {
        super(valor); // Llama al constructor de Celda
        this.elementos = elementos; // Inicializa el array de elementos
        if(this.elementos.length < 2 ){
            throw new Error("La caja debe contener dos o más elementos de tipo Celda")
        }
        
    }

    //lo jodido
    public reducir (f:(e1:T,e2:T)=>T):T{
        let valor: T = this.valor;//declaramos una variable que almacene el valor que tiene la caja
        let suma: T = this.elementos[0].valor;//inicializamos con el valor de la primera celda.
        let elemento: Celda<T>; 

        for(elemento of this.elementos){//elemento es la variable que se asigna a cada elemento en cada iteracion y elementos es lo iterable
            console.log("Valor de la variable valor antes de f = ",valor)
            console.log("Valor de suma antes de f:",suma)//por control
            console.log("Elemento.reducir despues de f:",elemento.reducir(f))//por control
            //lo verdaderamente primordial
            suma = f(valor, elemento.reducir(f))
            console.log("Valor de la variable valor despues de f = ",valor)
            console.log("Valor de suma despues de f:",suma)//por control
            console.log("Elemento.reducir despues de f:",elemento.reducir(f))//por control
        }

      return suma;
    }

}

const celda1 = new Celda(111);

const celda2 = new Celda(222);

const caja2: Caja<number> = new Caja(33,[celda1,celda2]);

const suma =  (a:number,b:number) => a+b;

console.log(caja2)

console.log("resultado de la operacion reducir: ", caja2.reducir(suma))

console.log("Hola Mundo");

//CORRER CODIGO EN TERMINAL ASÍ: ts-node CeldaCaja.ts