interface Predicado <T>{

    cumple(t:T): boolean

}

//clase de ejemplo ideada por mi para probar la vaina

class persona implements Predicado<String>{
    constructor(public nombre:string){
        this.nombre=nombre;//no voy a rebuscarme con los atributos de la clase
    }

    cumple(name:string):boolean{
        let condicion = false;

        if(name.length>=5){
            condicion=true;
        }

        return condicion;
    }

    
}

interface Funcion<T>{
    aplicar(t:T):void

}

//Usa (NO IMPLEMENTA) las dos interfaces anteriores
class Nodo<T> {
    constructor(public valor:T, public hijos:Nodo<T>[]=[]){
        this.valor=valor;
    }

    // Método para agregar un hijo
    agregarHijo(hijo: Nodo<T>) {
        this.hijos.push(hijo);
    }

    //ESTO ES LO QUE ME PIDEN IMPLEMENTAR
    //Metodo que cuenta los nodos que cumplen con el predicado
    cumplen(p:Predicado<T>):number{

        let cont: number = 0;

        if(p.cumple(this.valor)){//verifico si el metodo cumple del objeto Predicado es true en el nodo principal
            cont++;//incrementamos el contador si
        }

        //veamos si los hijos del nodo tambien cumplen con el predicado p
        for(const hijo of this.hijos){
            cont+=hijo.cumplen(p);
        }

        return cont;

    }

}

class NodoCompuesto<T> extends Nodo<T>{

    constructor(valor:T, hijos:Nodo<T>[]=[], public nodo_interno?: Nodo<T>){
        super(valor,hijos);
        this.nodo_interno=nodo_interno;
    }

        //ESTO ES LO QUE ME PIDEN IMPLEMENTAR
    //Metodo que cuenta los nodos que cumplen con el predicado
    cumplen(p:Predicado<T>):number{

        let cont: number = 0;//creo que definir esta variable acá está demás

        super.cumplen(p);//reutilizar codigo de manera limpia - sobreescritura por refinamiento!

        //lo que cambia en esta estructura es verificar si el nodo interno a partr de que exista, cumple con el predicado p
        if(this.nodo_interno && p.cumple(this.nodo_interno.valor)){
            cont++;
        }

        return cont;

    }





}

    //probemos

    const jamal = new persona('Jamal')

    const nodogabriel = new Nodo<String>('Gabriel',[])

    const nodocristhian = new Nodo<String>('Cristhian',[])

    const nodowilliam = new Nodo<String> ('William',[])

    const nodojorge = new Nodo <String> ('Jorge',[])

    const nodoluis = new Nodo<String>('Luisillo',[nodowilliam,nodojorge])

    const nodojamal = new Nodo<String>('Jamal',[nodogabriel,nodocristhian,nodoluis, nodowilliam])//por lo visto este funciona de pinga.

   console.log(nodojamal.cumplen(jamal));//funciona de pinga
