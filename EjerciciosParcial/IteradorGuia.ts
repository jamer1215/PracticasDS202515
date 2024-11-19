// Ejercicio 10
// Elaborar un iterador que permita recorrer un vector tanto en sentido ascendente como en sentido descendente.
// Es importante elaborar un diseño que permita extender la implementación a iteradores del mismo
// tipo útiles para recorrer listas ligadas u otro tipo de estructuras.

//Interface

import { Optional } from "../PatronesDeDiseño/Optional";


// Interfaz Iterador define los métodos necesarios para recorrer una colección
//esto sirve para cualquier estructura asi que cumplo a cabalidad el ultimo punto del ejercicio
interface Iterator<T> {
    next(): Optional<T>;  // Devuelve el siguiente elemento (en caso de tenerlo - Optional súper útil!)
    previous(): Optional<T> 
    hasNext(): boolean;  // Verifica si hay más elementos
    hasPrev():boolean;
}

//ahora como ESTE ejercicio me pide la vaina con arrays bueno con arrays (de elementos de cualquier tipo)
class ArrayIterator<T> implements Iterator<T>{

    private index: number;


    constructor(private array:T[]){
        this.array=array;
        this.index=0
    }

    next(): Optional<T> {
        if (this.hasNext()){
            this.index++
            return new Optional(this.array[this.index])//array[i+1]
        }else{
            return new Optional();
        }
    }
    previous(): Optional<T> {
        if (this.hasPrev()){
            this.index--
            return new Optional(this.array[this.index])//array[i-1]
            
        }else{
            return new Optional();
        }
    }
    hasNext(): boolean {
        return this.index<this.array.length//indice del array debe ser menos que la longitud, si es igual no hay next
    }
    hasPrev(): boolean {
        return this.index>0//Cuando index llega a 0 quiere decir que resté el indice a tal punto de que llegue al primer elemento
    }
    
}

// abstract class ArrayAggregate<T>{
//     public index: number
//     public valor:T[]
// }


//codigo cochino y asqueroso cliente:
const arreglo:number[]=[10,20,30,40,60,50]

let valor = 0;

const arrayIterator = new ArrayIterator<number>(arreglo)

//probando hacia adelante
while(arrayIterator.hasNext()){
   console.log(arrayIterator.next())
}

//probando hacia atrás
while(arrayIterator.hasPrev()){
    console.log(arrayIterator.previous())
 }