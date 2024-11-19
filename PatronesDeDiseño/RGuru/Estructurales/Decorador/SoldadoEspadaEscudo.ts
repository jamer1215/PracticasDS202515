//IComponente
abstract class Unidad {
    constructor(public name: string) {
        this.name = name;
    }
    abstract suprimir(u: Unidad): Unidad;

    // Nuevo método para mostrar la jerarquía
    verJerarquia(): string {
        return this.name; // Por defecto, retorna solo su propio nombre
    }
}

//Componente
class Soldado extends Unidad {
    constructor(name: string) {
        super(name);
    }
    suprimir(u: Unidad): Unidad {
        console.log("\nMetodo suprimir de un soldado de nombre:", this.name);
        console.log("El nombre de la unidad, que pasamos en el metodo suprimir, en soldado espada es:", u.name);
        return this; //IMPORTANTE, aunque soldado se retorna a si mismo, si al momento de ir recorriendo la jerarquía, llego a soldado
        //entonces si pongo null, entonces el apuntamiento se pierde y queda null!
    }

    // Soldado no tiene decoradores, así que su jerarquía es solo su nombre
    verJerarquia(): string {
        return `Soldado: ${this.name}`;
    }
}

//Base decorator (son soldados y complementos!)
class Complemento extends Unidad {
    constructor(name: string, private unidad: Unidad) {
        super(name);
        this.unidad = unidad;
    }
    suprimir(u: Unidad): Unidad {

        //mi lógica 

        console.log("\nMetodo suprimir de acá la clase Complemento de nombre:", this.name);
        console.log("El nombre de la unidad, que pasamos en el metodo suprimir, acá en Complemento es:", u.name);
        if (u === this) {
            console.log("\nYo como complemento debo ser suprimido. Se retorna la unidad que tengo yo de referencia cuyo nombre es:", this.unidad.name);
            return this.unidad;
        } else {
            console.log("No soy yo el complemento suprimible, me retornaré a mí mismo sin antes pasarle el mensaje a la unidad que tengo de referencia cuyo nombre es:", this.unidad.name);
            this.unidad = this.unidad.suprimir(u);
            return this;
        }
        

        //lógica de gabriel:
        //  if (u === this.unidad) this.unidad = this.unidad.suprimir(u);
        //  return this.unidad.suprimir(u);
  
    }

    // Combina su nombre con la jerarquía de la unidad que decora
    verJerarquia(): string {
        return `${this.name} -> ${this.unidad.verJerarquia()}`;
    }
}

//Decorador concreto 1 - escudo (es un complemento concreto)
class Escudo extends Complemento {
    suprimir(u: Unidad): Unidad {
        console.log("\nMetodo para suprimir acá en la clase escudo de nombre:", this.name);
        console.log("El nombre de la unidad, que pasamos en el metodo suprimir, en escudo es:", u.name);
        return super.suprimir(u);
    }
}

//Decorador concreto 2 - espada (es un complemento concreto)
class Espada extends Complemento {
    suprimir(u: Unidad): Unidad {
        console.log("\nMetodo para suprimir acá en la clase espada de nombre:", this.name);
        console.log("El nombre de la unidad, que pasamos en el metodo suprimir, en espada es:", u.name);
        return super.suprimir(u);
    }
}

//otros decoradores concretos pensados por carlos alonzo:

//Decorador concreto 3 (extra) - capa (es un complemento concreto)
class Capa extends Complemento {
    suprimir(u: Unidad): Unidad {
        console.log("\nMetodo para suprimir acá en la clase capa de nombre:", this.name);
        console.log("El nombre de la unidad, que pasamos en el metodo suprimir, en capa es:", u.name);
        return super.suprimir(u);
    }
}

//Decorador concreto 4 (extra) - cinturon (es un complemento concreto)
class Cinturon extends Complemento {
    suprimir(u: Unidad): Unidad {
        console.log("\nMetodo para suprimir acá en la clase cinturon de nombre:", this.name);
        console.log("El nombre de la unidad, que pasamos en el metodo suprimir, en cinturon es:", u.name);
        return super.suprimir(u);
    }
}

//Codigo cliente:
let soldado: Unidad = new Soldado("Robertotototo"); //NOTA 0: Soy un soldado (muñeca rusa más interna), no estoy en composición directa con nadie
let escudo: Unidad = new Escudo("Escudo Hyliano", soldado); //NOTA 1: escudo está en composición directa con soldado
let espada: Unidad = new Espada("Master Sword", escudo); //NOTA 2: espada está en composición directa con escudo - que a su vez NOTA 1
let capa: Unidad = new Capa("Capa de Robertotototo", espada); //NOTA 3: capa está en composición directa con espada - que a su vez NOTA 2
let cinturon: Unidad = new Cinturon("Cinturon de Robertotototo", capa); //NOTA 4: cinturon está en composición directa con espada - que a su vez NOTA 3
let cinturon2: Unidad = new Cinturon("cinturon equis", soldado);

// Muestra la jerarquía actual
console.log("\nJerarquía inicial:");
console.log(cinturon.verJerarquia());

// let unidad:Unidad = espada.suprimir(escudo)
let unidad: Unidad = cinturon.suprimir(escudo);

// Vamos a ver la jerarquía despues de aplicar suprimir a espada
console.log("\nJerarquía después de hacer unidad = cinturon.suprimir(escudo):");
console.log(unidad.verJerarquia());