interface FuncionF<T> {
    aplicar(e: ElementoE<T>): void;
}

//una clase random, sencilla y sin tanta locura que se me ocurrió con la excusa de probar nada más, sin rebuscarme
class OperacionesM implements FuncionF<number> {
    aplicar(e: ElementoE<number>):void {
       console.log(`Elemento de valor ${e.valor} con el aplicar realizado resulta:${e.valor * 2}`); // Multiplicamos el valor por 2 y lo mostramos
    }
}

//declaré todos esos métodos como abstractos porque no se me ocurría alguna implementación particular
abstract class ComponenteC<T> {
    constructor(public valor: T) {
        this.valor = valor;
    }
    abstract getElementos(): ElementoE<T>[]; // Retorna un array de ElementoE
    abstract aplicarC(f: FuncionF<T>): void; // Método para aplicar función
}

class ComposicionC<T> extends ComponenteC<T> {
    constructor(valor: T, public componentes: ComponenteC<T>[] = []) {
        super(valor);
    }

    getElementos(): ElementoE<T>[] {
        let ele: ElementoE<T>[] = []; // Inicializa el array vacío

        if (this.componentes.length > 0) { // Verifica si hay componentes
            for (let eleme of this.componentes) {
                ele.push(...eleme.getElementos()); // Agrega el elemento al array
                //El método getElementos() devuelve un array de elementos. Para asegurarte de que todos los elementos de ese 
                //array se agreguen correctamente a ele, debes usar el operador de propagación ... para "expandir" ese array y agregar cada elemento individualmente.
                //De esta forma, si getElementos() devuelve un array con varios elementos, todos serán agregados al array ele sin problemas.
                //es equivalente a hacer: ele.push(getElementos()[1],...,getElementos()[n]) - que sabes tu hasta donde llega n
            }
        }

        return ele; // Retorna el array de elementos
    }

    aplicarC(f: FuncionF<T>) {
        if (this.componentes) {
            for (let e of this.componentes) {
                e.aplicarC(f); // Aplica recursivamente si es una composición
            }
        }
    }
}

class ElementoE<T> extends ComponenteC<T> {
    getElementos(): ElementoE<T>[] {
        return [this]; // Retorna a sí mismo como único elemento
    }

    aplicarC(f: FuncionF<T>) {
        f.aplicar(this); // Aplica la función
    }
}

// Creando unos cuantos elementos
const ele1 = new ElementoE<number>(1);
const ele2 = new ElementoE<number>(2);
const ele3 = new ElementoE<number>(3);
const ele4 = new ElementoE<number>(4);

const ele5 = new ElementoE<number>(5);
const ele6 = new ElementoE<number>(6);
const ele7 = new ElementoE<number>(7);

// Creando composiciones
const compos1 = new ComposicionC<number>(11,[ele5,ele6]);
const compos2 = new ComposicionC<number>(22);
const compos3 = new ComposicionC<number>(33);
const compos4 = new ComposicionC<number>(44,[ele7,compos1]);

// Uno compuesto que tenga varios componentes:
const compoN = new ComposicionC<number>(0, [ele1, ele2, ele3, compos1, compos4]);
const elem = compoN.getElementos();
console.log(`Elementos de compoN del tipo ElementoE:`, elem);

// Probando el getElementos directamente en un objeto del tipo ElementoE
const eleme4 = ele4.getElementos();
console.log(`Elementos de ele4 del tipo ElementoE:`, eleme4);

// Probando la operación
const operaciones = new OperacionesM();

let apl = compoN.aplicarC(operaciones); // Aplicar las operaciones a la composición
let apl4 = ele4.aplicarC(operaciones);
