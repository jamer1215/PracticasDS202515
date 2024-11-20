//NOTA: Es el mismo optional que vimos en la clase del patrón iterador
import { Optional } from "../../../Optional";//Ojo, solo por exquisitez mia quise usar Optional para "limpiar" código, se que no es el eje principal del ejercicio

abstract class Casilla<F, V> {
  private vecinos: Map<F, Casilla<F, V>> = new Map()//esto lo quité del constructor!
  constructor(
    private valor: Optional<V>
  ) {
    this.valor = valor;
  }

  addVecino(lado: F, vecino: Casilla<F, V>): void {
    this.vecinos.set(lado, vecino);
  }

  setValor(valor: V): void {
    this.valor = new Optional(valor);
  }

  getValor(): Optional<V> {
    return this.valor;
  }

  // ojo, lo ando añadiendo acá para ver la cuestión en el console.log - no me genera relevancia en el ejercicio como tal!
  getVecinos(): Map<F, Casilla<F, V>> {
    return this.vecinos;
  }

  abstract iguales(valor1: V, valor2: V): boolean;
  abstract unificar(valor: V): V;
  abstract clear(): void;
}

enum Cuadrado {
  Arriba,
  Abajo,
  Derecha,
  Izquierda,
}

class CuadradoNumerico extends Casilla<Cuadrado, number> {
  constructor(valor: Optional<number>) {
    super(valor);
  }
  iguales(valor1: number, valor2: number): boolean {
    return valor1 === valor2;
  }

  unificar(valor: number): number {
    return valor * 2;
  }

  clear(): void {
    this.setValor(0);
  }
}

class Board<F, V> {
  private casillas: Map<number, Casilla<F, V>>;

  constructor() {
    this.casillas = new Map();
  }

  //como casillas es un atributo private (he visto en libros y demás fuentes que se acostumbra a poner atributos así), hago métodos alusivos a getters y setters que son publicos!
  addCasilla(id: number, casilla: Casilla<F, V>): void {
    this.casillas.set(id, casilla);
  }

  getCasilla(id: number): Optional<Casilla<F, V>> {
    let casillaObtenida = this.casillas.get(id);

    //Limpio con el optional :)
    if (!casillaObtenida) {
      return new Optional();
    } else {
      return new Optional(this.casillas.get(id));
    }
  }

  // esto lo hago con fines de verlo en el console.log
  getCasillas(): Map<number, Casilla<F, V>> {
    return this.casillas;
  }
}

interface BoardBuilder<F, V> {
  board: Board<F, V>;//como el prof. lo puso en la pizarra - inyectarle el board

  addCasilla(idCasilla: number, valor: Optional<V>): BoardBuilder<F, V>;

  addVecino(idCasilla: number, lado: F, idVecino: number): BoardBuilder<F, V>;

  build(): Board<F, V>;
}

//Como casilla es una clase abstracta, definí el BoardBuilder como interface y mi idea es que cada tipo de casilla tenga un builder particular
class ConcreteSquareBuilder implements BoardBuilder<Cuadrado, number> {
  board: Board<Cuadrado, number>;

  constructor() {
    this.board = new Board<Cuadrado, number>();;
  }

  addCasilla(idCasilla: number, valor: Optional<number>): BoardBuilder<Cuadrado, number> {
    this.board.addCasilla(idCasilla, new CuadradoNumerico(valor));
    return this;
  }
  addVecino(idCasilla: number, lado: Cuadrado, idVecino: number) {

    let casillaOpt = this.board.getCasilla(idCasilla);
    let vecinoOpt = this.board.getCasilla(idVecino);

    // descersioriandome de que la casilla y el vecino ya exitan (como lo hice con Optional se ve por decirlo limpio así pero en parcial es solo ver si al hacer getCasilla por id me devuelve algo!)
    if (casillaOpt.hasValue() && vecinoOpt.hasValue()) {
      let casilla = casillaOpt.getValue();
      let vecino = vecinoOpt.getValue();
      casilla.addVecino(lado, vecino);
      
      // no entra al else = la casilla y/o el vecino no existe(n)
    } else {
      if (!casillaOpt.hasValue()) {
        // this.addCasilla(idCasilla, new Optional());
        throw new Error("ERROR: Hey mi pana mosca esa casilla no existe en el Board")
      }

      if (!vecinoOpt.hasValue()) {
        // this.addCasilla(idVecino, new Optional());
        throw new Error("ERROR: Hey mi pana mosca ese vecino no existe en el Board")
      }
    }

    return this;
  }

  build(): Board<Cuadrado, number> {
    return this.board;
  }
}

// cliente - sabe que tipo de tablero quiere
class Game {
  static main(): void {
    let builder = new ConcreteSquareBuilder();//bridge

    // Construcción del tablero mediante el builder
    builder
      .addCasilla(1, new Optional(1))//Ejemplo casilla de id = 1 con valor = 1
      .addCasilla(2, new Optional(2))
      .addCasilla(3, new Optional(3))
      .addVecino(1, Cuadrado.Derecha, 2)//Ejemplo a la casilla de id = 1, en el lado derecho (de esta casilla que es cuadrada), asígnale por vecino la casilla que tiene id = 2
      .addVecino(2, Cuadrado.Izquierda, 1)
      .addVecino(2, Cuadrado.Derecha, 3)
      .addVecino(1, Cuadrado.Abajo,3)
      .addVecino(1,Cuadrado.Abajo,33)
      .build();

    // Admito que le dije a ChatGPT que lo imprima bonito xd - solo es para probar que sirva envés de solo imprimir las casillas así como normalitas
    //(pruebas técnicas mías jejeje)
    console.log("Tablero:");
    builder.board.getCasillas().forEach((casilla, id) => {
      console.log(`Casilla ${id} con valor: ${casilla.getValor().getValue()}`);

      console.log("Vecinos:");
      casilla.getVecinos().forEach((vecino, lado) => {
        let vecinoValor = vecino.getValor().getValue();
        console.log(
          `  Lado: ${Cuadrado[lado]} => Vecino ID: ${builder.board
            .getCasillas()
            .get(id)
            ?.getVecinos()
            .get(lado)
            ?.getValor()
            .getValue()}, Vecino Valor: ${vecinoValor}`
        );
      });
      console.log("---");
    });
  }
}

Game.main();//Invocando la clase cliente tal como la idea que dan en el enunciado del ejercicio :)
