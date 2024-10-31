import { Optional } from "../PatronesDeDiseño/Optional";

class Celda2 <T>{

    constructor(public valor: T){

        this.valor=valor;

    }

    public reducir (f:(e1:T,e2:T)=>T, predicado:(e:T)=>boolean):Optional<T>{

        //esto está mal programado a nivel de lógica
        //si cumple con el predicado el return es this.valor (sin aplicarle f)
        //con el uso de optional contemplo el caso en el que no cumpla con el predicado para no retornar nada

        let operacion:Optional<T>=new Optional();//inicializo la vaina en null

        //si cumple el predicado devuelve la vaina con valor
        if (predicado(this.valor)){
           operacion = new Optional(this.valor) //segun lo visto en clase es solo devolver el valor
        }//no entrar al if=no cumple predicado y operacion queda nullo

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
    public reducir (f:(e1:T,e2:T)=>T, predicado:(e:T)=>boolean):Optional<T>{
        // Inicializamos un Optional vacío para el resultado
        let resultado: Optional<T> = new Optional<T>();
        let elemento: Celda2<T>;
         
            //creo que esta vez si me fume una buena lumpia
            for(elemento of this.elementos){//elemento es la variable que se asigna a cada elemento en cada iteracion y elementos es lo iterable
                let valorReducido = elemento.reducir(f, predicado); // Reducimos cada elemento presente en caja (celdas)
                if(valorReducido.hasValue() && predicado(this.valor)){//si la operacion reducir en celda retorna un valor y el valor de esta caja cumple con el predicado
                    // Si el valor reducido está presente y el valor de la caja también cumple el predicado
                    if (!resultado.hasValue()) {
                    resultado = new Optional(this.valor); // Inicializamos el resultado con el valor de la caja
                    }else{
                    // Aplicamos la función de reducción f con el valor reducido
                    resultado = new Optional(f(resultado.getValue(), valorReducido.getValue()));
                    }
                }

            }


      return resultado;//si no entra en el if entonces retornará el valor de la var. valor en esa iteración
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