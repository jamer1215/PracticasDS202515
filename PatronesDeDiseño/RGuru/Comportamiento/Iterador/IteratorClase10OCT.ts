interface Iterador <T>{
    next(): T | null;//esto hay que arreglarlo con la clase OPTIONAL
    hasNext():boolean;
}

//ESTE PANA DE ACÁ NO REPRESENTA NI EL ITERATOR
class ListNode<T>{

    constructor(
        public next: ListNode<T> | null,//esto hay que arreglarlo con la clase OPTIONAL
        public data: T,
    ){}

}

//esta clase está acoplada con ListNode, e implementa la interface Iterator (es un Iterator)
class ListIterator<T> implements Iterador<T>{
    constructor(
        private root:ListNode<T> | null,//esto hay que arreglarlo con la clase OPTIONAL
    ){}
    next(): T | null {
        let data: T;
        if (this.hasNext()){
            data = this.root!.data;//ajuro no sera null sino imaginate no entra al if mi pana
            this.root = this.root!.next;//con el ! fue la manera que no me diera error pero creo que esta mal
            return data;
        }else{
            return null;
        }
        
    }
    hasNext(): boolean {
        return this.root !== null;
    }
}

//Este es el que el prof dice que es modelable con otro patrón (Proxy) - hazlo en Template Method ¿es posible?
class ListAggregate<T>{
    constructor(private rootList:ListNode<T>){}

    getListIterator():ListIterator<T>{
        return new ListIterator(this.rootList);
    }
}


//probemos este beta:
const list = new ListNode(new ListNode(new ListNode(null,10),5),15);

//para mi lo anterior - list: se ve más bonito y entendible:
const node1 = new ListNode(null,10);
const node2 = new ListNode(node1,5);
const lista = new ListNode(node2,15)

//el agreggate
const aggregate = new ListAggregate(lista);
const iterador = aggregate.getListIterator();
console.log(iterador.next());//15
console.log(iterador.next());//5
console.log(iterador.next());//10
console.log(iterador.next());//null

if(!iterador.hasNext()){
    console.log("Llegó el fin!!!");
}