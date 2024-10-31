abstract class AComponente{

    private padre?:ACarpeta
    

    constructor(public name:string){
        this.name=name
    }

    setPadre(padre:ACarpeta){
        this.padre=padre;
    }

    cumple(predicado:(p:string)=>boolean):boolean{

        return predicado(this.name)//retorname el valor de verdad de aplicarle el predicado al nombre
    }

    abstract contar(predicado:(p:string)=>boolean):number;
}

//hoja
class Archivo extends AComponente{
    contar(predicado: (p: string) => boolean): number {

        let contador = 0

        if (this.cumple(predicado)){
            contador++
        }

        return contador;
    }

    

}

class ACarpeta extends AComponente{
    
    componentes:AComponente[]=[]

    addComponente(co:AComponente){
        this.componentes.push(co)
    }

    removeComponente(co:AComponente){
         //Utiliza el método indexOf del arreglo componentes para encontrar la posición del componente c.
        // Si c está presente en el arreglo, indexOf devuelve su posición (un número mayor o igual a 0).
        // Si c no se encuentra en el arreglo, indexOf devuelve -1.

        let mensaje = 'Nada que eliminar';

        const index = this.componentes.indexOf(co);//Busca la posición del componente c dentro del arreglo componentes
        if (index !== -1) {//si index fuera -1 entonces no hubiera nada que eliminar y no entra al if
            mensaje = "Se procederá a eliminar el componente: " + this.componentes[index] + " del array";
            this.componentes.splice(index, 1); // Eliminar un (1) componente de la posición index
            
        }

        return mensaje;
    }

    contar(predicado: (p: string) => boolean): number {
        let contador = 0

        //si yo como carpeta cumplo

        if(super.cumple(predicado)){
            contador++
        }

        for(let compo of this.componentes){

            contador+=compo.contar(predicado)

        }

        return contador
    }

}

//probando el codigooo

//el root que me hablaba Fornari
const carpetaRaiz = new ACarpeta("Raiz");
const carpetaDocumentos = new ACarpeta("Documentos");
const carpetaImagenes = new ACarpeta("Imágenes");

const archivo1 = new Archivo("curriculum.docx");
const archivo2 = new Archivo("foto.jpg");
const archivo3 = new Archivo("lista_compras.txt");

carpetaRaiz.addComponente(carpetaDocumentos);
carpetaRaiz.addComponente(carpetaImagenes);

carpetaDocumentos.addComponente(archivo1);
carpetaDocumentos.addComponente(archivo3);
carpetaImagenes.addComponente(archivo2);

// Definir un predicado (criterio de búsqueda)
// Contar componentes cuyo nombre termine con ".docx"
const predicadoDocx = (nombre: string) => nombre.endsWith(".txt");

console.log("Número de archivos .docx en la estructura: " + carpetaRaiz.contar(predicadoDocx));

// Contar componentes cuyo nombre tenga más de 10 caracteres
const predicadoNombreLargo = (nombre: string) => nombre.length > 10;

console.log("Número de archivos/carpetas con nombre largo en la estructura: " + carpetaRaiz.contar(predicadoNombreLargo));
