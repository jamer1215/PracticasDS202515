// El patron Observador es uno de los patrones mas utilizados hoy en da, principalmente en
// la programacion reactiva. Sin embargo, posee un problema: el manejo del estado del subject
// desde el observer puede generar violaciones del principio LSP. Esto debido a que si
// acoplamos mediante una composicion el estado del subject con el observer, necesitaremos
// modelar el estado con un tipo Object o Any, dependiendo del lenguaje de programacion.
// Para corregir esta situacion, lo que se plantea es utilizar clases genericas, es decir, aplicar Programacion
// Generica o Polimorfismo Parametrico tanto a las abstracciones Subject como Observer.
// En lo sucesivo vamos a definir dos abstracciones genericas: la primera Observable<T>
// que representa el Subject, y la segunda Observer<T> que corresponde al Observer.

// Usted debe completar esta implementacion en Java o Typescript para demostrar su dominio
// en la aplicacion del patron Observador utilizando genericos.

interface Observer<T>
{
update(subject: T):void

}

//Esto lo estoy haciendo yo para probar
class ConcreteSuscribier1<T> implements Observer<T>{
    constructor(public name:string){
        this.name=name
    }
    //depende de las condiciones del estado que recibe, el suscriptor reacciona de i
    update(subject: T): void {
        console.log("Soy un suscriptor de tipo 1 llamado:", this.name, "y estoy REACCIONANDO a un cambio de estado a la entidad a la que estoy suscrita de valor:",subject)
    }
    
}

//Este es el subject - publisher - notifier
class Observable<T>{
   private observers: Observer<T>[]=[]
   private subject:T//este es el estado del subject - publisher - notifier

    constructor(subject: T) {
    this.subject=subject
    }

    update():void {
    for(let obs of this.observers){
        obs.update(this.subject)
    }
    }

    set(subject:T):void {
        this.subject=subject
        //acuerdate que cuando el estado (subject) cambia, se debe notificar a los suscriptores
        this.update()
    }
    
    get():T {

        return this.subject;//supongo yo que es esto jejeje
    }

    add(observer: Observer<T>):void {
        this.observers.push(observer)
    }
}

//a probarlo - código cliente. Recuerda que el cliente se acopla a un suscritor concreto y al subject

const observable: Observable<number> = new Observable<number>(4)
const subjectObservable=observable.get();
console.log("Valor del atributo subject del observable creado:",subjectObservable)

const jamal: ConcreteSuscribier1<number> = new ConcreteSuscribier1<number>("Jamal")
const gabriel: ConcreteSuscribier1<number> = new ConcreteSuscribier1<number>("Gabriel")
const cristhian: ConcreteSuscribier1<number> = new ConcreteSuscribier1<number>("Cristhian")

//añadiendo suscriptores al subject creado:
observable.add(jamal)
observable.add(gabriel)
observable.add(cristhian)

//observable.update();

observable.set(55)