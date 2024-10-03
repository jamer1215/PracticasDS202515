
//DUDA 0: en refactoring guru definen esto como una clase abstracta... cuando se cual me conviene?
interface Componente{
    calcularPrecio():number;
}

// DUDA 4: Es necesario contemplar lo de establecer quien es papá de quien?
// tengo que ver porque componente en ref. es una clase abstracta
//y ahi declaran getters y setters de establecer paternidad (Además de atributo padre)

class Elemento implements Componente{

    constructor(public precio: number){
        this.precio=precio;
    }

    public isComposite(): boolean {
        return false;
    }

    calcularPrecio(): number {

        return this.precio;
        
    }

}

class Compositor implements Componente{

    //DUDA 1: public o private? (sería los children)

    constructor(public componentes: Componente[]){
        this.componentes=componentes;
    }

    //DUDA 2: Corroborar si Segun refactoring debemos implementar siempre en el composite los métodos add, remove y get children

    add(c:Componente):void{
        this.componentes.push(c);//añadir elementos a un array es con el push
    }

    remove(c:Componente):string{

         //Utiliza el método indexOf del arreglo componentes para encontrar la posición del componente c.
        // Si c está presente en el arreglo, indexOf devuelve su posición (un número mayor o igual a 0).
        // Si c no se encuentra en el arreglo, indexOf devuelve -1.

        let mensaje = 'Nada que eliminar';

        const index = this.componentes.indexOf(c);//Busca la posición del componente c dentro del arreglo componentes
        if (index !== -1) {//si index fuera -1 entonces no hubiera nada que eliminar y no entra al if
            mensaje = "Se procederá a eliminar el componente: " + this.componentes[index] + " del array";
            this.componentes.splice(index, 1); // Eliminar un (1) componente de la posición index
            
        }

        return mensaje;
        
    }

    //método en el que se implementa la delegación recursiva pertinente
    calcularPrecio(): number {

        let precio = 0;

        for (let co of this.componentes){
            precio+=co.calcularPrecio();
        }

        return precio;//precio=me retorna la suma de los precios de la serie de componentes que este (this) composite tiene
    
    }

    public isComposite(): boolean {
        return true; // Indica que este componente es un composite
    }
    
}

//jugando y creando objetos para probar:


// Caso de Prueba 1: Comportamiento de Elemento
const elemento1 = new Elemento(100);
console.log("Precio de elemento1:", elemento1.calcularPrecio()); // Debería imprimir 100

const elemento2 = new Elemento(200);
console.log("Precio de elemento2:", elemento2.calcularPrecio()); // Debería imprimir 200

// Caso de Prueba 2: Comportamiento Básico de Compositor
const compositor1 = new Compositor([]);
console.log("Precio inicial de compositor1 (vacío):", compositor1.calcularPrecio()); // Debería imprimir 0

compositor1.add(elemento1);
compositor1.add(elemento2);
console.log("Precio de compositor1 con elemento1 y elemento2:", compositor1.calcularPrecio()); // Debería imprimir 300

// Caso de Prueba 3: Comportamiento Recursivo de Compositor
const elemento3 = new Elemento(50);
const compositor2 = new Compositor([elemento3]); // Un compositor que tiene un elemento

compositor2.add(compositor1); // Añadiendo compositor1 que ya tiene elementos
console.log("Precio de compositor2 con compositor1 y elemento3:", compositor2.calcularPrecio()); // Debería imprimir 350

// Caso de Prueba 4: Remover Componentes
console.log(compositor1.remove(elemento1)); // Debería indicar que elemento1 fue eliminado
console.log("Precio de compositor1 después de eliminar elemento1:", compositor1.calcularPrecio()); // Debería imprimir 200

console.log(compositor2.remove(compositor1)); // Debería indicar que compositor1 fue eliminado de compositor2
console.log("Precio de compositor2 después de eliminar compositor1:", compositor2.calcularPrecio()); // Debería imprimir 50

console.log(compositor1.remove(elemento1)); // Debería indicar que no hay nada que eliminar, ya fue removido

