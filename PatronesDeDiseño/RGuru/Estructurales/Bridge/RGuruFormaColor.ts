//Abstracción - dimensión forma
abstract class Forma{
    
    constructor(public color:Color,public descripcion:string){
        this.descripcion=descripcion;
        this.color=color;
    }
    //no se, no se me ocurre nada pues
    abstract dibujar():void;


}

//Refined abstraction - opcional
class Circulo extends Forma{
    dibujar(): void {//creo que este es el feature no sé
        console.log(`Dibujando un circulo cuya descripcion es: ${this.descripcion}`)
    }
    constructor(color:Color, descripcion:string){
        super(color,descripcion)
    }
}

//implementacion
interface Color{
    codigoHexadecimal:string
    getColorName():string
}

//implementacion concreta
class Rojo implements Color{
    constructor(public codigoHexadecimal: string){
        this.codigoHexadecimal=codigoHexadecimal;
    }
    getColorName(): string {
        return this.constructor.name//es para retornar el nombre de la clase
    }
    
}

//probemos

const hexarojo = "AAABBBCCC"
const rojo = new Rojo(hexarojo);
console.log(rojo.getColorName());

const descripcion="Soy una figura lalala - yo soy el círculo"
const cir = new Circulo(rojo,descripcion)
cir.dibujar();