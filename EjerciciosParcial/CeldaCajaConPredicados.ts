class Celda2 <T>{

    constructor(public valor: T){

        this.valor=valor;

    }

    public reducir (f:(e1:T,e2:T)=>T, predicado:(e:T)=>boolean):T{

        //esto está mal programado a nivel de lógica
        //si cumple con el predicado el return es this.valor (sin aplicarle f)
        //con el uso de optional contemplo el caso en el que no cumpla con el predicado para no retornar nada

        let operacion=this.valor;//inicializo una variable igual al atributo valor

        //si no cumple el predicado, operacion se limita a devolver al valor inicializado anteriormente - this.valor
        if (predicado(this.valor)){
           operacion = f(this.valor,this.valor) //return debería ser this.valor sin aplicarle f
        }

        return operacion;
    }
}

class Caja2<T> extends Celda2<T>{

    elementos: Celda2<T>[]//relación de composición de Caja con celda

    constructor(valor: T, elementos:Celda2<T>[]) {
        super(valor); // Llama al constructor de Celda2
        this.elementos = elementos; // Inicializa el array de elementos
        if(this.elementos.length < 2 ){
            throw new Error("La caja debe contener dos o más elementos de tipo Celda")
        }
        
    }

    //lo jodido
    public reducir (f:(e1:T,e2:T)=>T, predicado:(e:T)=>boolean):T{
        let valor: T = this.valor;//declaramos una variable que almacene el valor que tiene la caja
        let suma: T = this.elementos[0].valor;//inicializamos con el valor de la primera celda.
        let elemento: Celda2<T>;
         
       
            //tengo que corregir esto
            for(elemento of this.elementos){//elemento es la variable que se asigna a cada elemento en cada iteracion y elementos es lo iterable
                //el predicado lo tiene que cumplir el valor con f aplicado, no f en sí (CREOOOO)
                if(predicado(elemento.valor) && predicado(valor)){//tengo que validar que valor de caja cumpla?
                    console.log("Valor de la variable valor antes de f = ",valor)
                    console.log("Elemento en la iteracion antes de f es:",elemento)//por control
                    console.log("Elemento.reducir despues de f:",elemento.reducir(f,predicado))//por control
                    //lo verdaderamente primordial
                    suma = f(valor, elemento.reducir(f,predicado))
                    console.log("Valor de la variable valor despues de f = ",valor)
                    console.log("Valor de suma despues de f:",suma)//por control
                    console.log("Elemento.reducir despues de f:",elemento.reducir(f,predicado))//por control
                }

            }


      return suma;//si no entra en el if entonces retornará el valor de la var. valor en esa iteración
    }

}

const celdaa1 = new Celda2(111);

const celdaa2 = new Celda2(224);

const cajaa2: Caja2<number> = new Caja2(37,[celdaa1,celdaa2]);

const sumaa =  (a:number,b:number) => a+b;

const esPar = (n:number) => n % 2 ===0; //N MOD 2 = 0 ¿?

console.log(cajaa2)

console.log("resultado de la operacion reducir: ", cajaa2.reducir(sumaa,esPar))

console.log("Hola Mundo");

//CORRER CODIGO EN TERMINAL ASÍ: ts-node CeldaCaja.ts