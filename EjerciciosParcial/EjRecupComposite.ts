import { Optional } from "../PatronesDeDiseño/Optional";

    abstract class Component<T> {
        value: T;
        constructor(v: T) { this.value = v; }
        abstract count(predicate: (e: T) => boolean): number;
        abstract first(predicate: (e: T) => boolean): Optional<T>;
    }

    class Leaf<T> extends Component<T> {//acuerdate que tiene un value
        count(predicate: (e: T) => boolean): number {//se encarga de contar todos los componentes que cumplen con el predicado
            //*******COMPLETAR´
            let contador=0;
            if(predicate(this.value)){
            contador++
            }

            return contador;

        }
        first(predicate: (e: T) => boolean): Optional<T> {

           let primero=new Optional<T>();

            if(this.count(predicate)>0){

                console.log(`Yo, una hoja de valor = ${this.value},cumplo con el predicado`)
               primero = new Optional<T>(this.value)
            }

            return primero;
    
        }
    }

    class Composite<T> extends Component<T> {

        components: Component<T>[];

        constructor(v: T) {
            super(v);
            this.components = [];
        }

        add(e: Component<T>) {
        this.components.push(e);
        }

        count(predicate: (e: T) => boolean): number {
            let contador=0
            //*******COMPLETAR
            if(this.components.length===0 && predicate(this.value)){

                contador++;

            }else{
                for(let compo of this.components){
                    contador+=compo.count(predicate)
                }
            }

            return contador;
        }

        first(predicate: (e: T) => boolean): Optional<T> {

            let primero:Optional<T>=new Optional();
            //mosca porque no sirve hacer !this.components, hay que hacerlo con la longitud del array
            if(this.components.length===0  && predicate(this.value)){

                primero=new Optional<T>(this.value)

            }else{
                for(let compo of this.components){
                    if(!primero.hasValue()){
                        primero = compo.first(predicate)
                    }
                }
            }
            //*******COMPLETAR

            //pregunta, que pasaría si:
            //1) si un composite no tiene components (children) y el value de ese composite
            //cumple con el predicado, me retorno a mi mismo? (creo que lo obvio es que sí)

            //2) si un composite C tiene componentes (de los cuales al menos 1 cumple el predicado)
            //y el valor de dicho composite C cumple el predicado, se considera que ese C es el primer
            //objeto de tipo T en cumplirlo y debo retornarlo a el mismo sin tan siquiera
            //importarme si hay algun componente que cumpla

            //si 1) y 2) son ciertos, entonces lo que programé está bien

            return primero;
        }
    }

//a probaaaar
//estoy super clarisimo que en algunas partes ando repitiendo código pero
//acá me importa saber si la vaina funciona y bueno me da lala
//programar una especie de functionclient o clase para código cliente
let hoja1= new Leaf<number>(1)
let hoja2= new Leaf<number>(2)
let hoja3= new Leaf<number>(3)
let hoja4= new Leaf<number>(4)


let prediPar=(va:number)=>va%2===0



//probando con hojas
//probando los count
//probando con hoja 1
let contah1 = hoja1.count(prediPar)
console.log(`Valor de contah1=${contah1}`)

//probando con hoja 2
let contah2 = hoja2.count(prediPar)
console.log(`Valor de contah2=${contah2}`)

//probando con hoja 3
let contah3 = hoja3.count(prediPar)
console.log(`Valor de contah3=${contah3}`)

//probando con hoja 4
let contah4 = hoja4.count(prediPar)
console.log(`Valor de contah4=${contah4}`)

//probando los first de las hojas
//probando con hoja 1
let firsth1 = hoja1.first(prediPar)
if(firsth1.hasValue()){

    console.log(`Valor de firsth1=${firsth1.getValue()}`)

}else{
    console.log("Mosca que firsth1 no retornó valor pq no cumple con el predicado")
}

//probando con hoja 2
let firsth2 = hoja2.first(prediPar)
if(firsth2.hasValue()){

    console.log(`Valor de firsth2=${firsth2.getValue()}`)

}else{
    console.log("Mosca que firsth2 no retornó valor pq no cumple con el predicado")
}

//probando con hoja 3
let firsth3 = hoja3.first(prediPar)
if(firsth3.hasValue()){

    console.log(`Valor de firsth3=${firsth3.getValue()}`)

}else{
    console.log("Mosca que firsth3 no retornó valor pq no cumple con el predicado")
}

//probando con hoja 4
let firsth4 = hoja4.first(prediPar)
if(firsth4.hasValue()){

    console.log(`Valor de firsth4=${firsth4.getValue()}`)

}else{
    console.log("Mosca que firsth4 no retornó valor pq no cumple con el predicado")
}


let compo1 = new Composite<number>(11)
compo1.add(hoja1)
compo1.add(hoja2)

//probando con composite 1
//el count
let contac1 = compo1.count(prediPar)
console.log(`Valor de contac1=${contac1}`)

//el first
let firstc1 = compo1.first(prediPar)
if(firstc1.hasValue()){

    console.log(`Valor de firstc1=${firstc1.getValue()}`)

}else{
    console.log("Mosca que firstc1 no retornó valor pq no cumple con el predicado")
}

let compo2= new Composite<number>(22)
let compofuego=new Composite<number>(222)

compo2.add(compo1)
compo2.add(hoja3)
compo2.add(hoja4)

//probando con composite 2
//el count
let contac2 = compo2.count(prediPar)
console.log(`Valor de contac2=${contac2}`)

//el first
let firstc2 = compo2.first(prediPar)
if(firstc2.hasValue()){

    console.log(`Valor de firstc2=${firstc2.getValue()}`)

}else{
    console.log("Mosca que firstc2 no retornó valor pq no cumple con el predicado")
}

//probando con composite fuego
//el count
let contacf = compofuego.count(prediPar)
console.log(`Valor de contacf=${contacf}`)

//el first
let firstcf = compofuego.first(prediPar)
if(firstcf.hasValue()){

    console.log(`Valor de firstcf=${firstcf.getValue()}`)

}else{
    console.log("Mosca que firstcf no retornó valor pq no cumple con el predicado")
}


