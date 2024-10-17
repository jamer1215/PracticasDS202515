/**
 * La interfaz Builder especifica los métodos para crear las diferentes partes
 * de los objetos Producto.
 */
interface Builder2 {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

/**
 * Las clases Constructor Concreto siguen la interfaz Builder y proporcionan
 * implementaciones específicas de los pasos de construcción. Tu programa puede
 * tener varias variaciones de Constructores, implementadas de manera diferente.
 */
class ConcreteBuilder1 implements Builder2 {
    private product: Product1=new Product1();

    /**
     * Una nueva instancia del constructor debe contener un objeto de producto en blanco,
     * que se utilizará en el ensamblaje posterior.
     */
    constructor() {
        this.reset();
    }

    /**
     * El método reset inicializa o restablece el objeto producto, dejando listo el
     * constructor para comenzar la creación de un nuevo producto.
     */
    public reset(): void {
        this.product = new Product1();
    }

    /**
     * Todos los pasos de producción trabajan con la misma instancia de producto.
     */
    public producePartA(): void {
        this.product.parts.push('PartA1');
    }

    public producePartB(): void {
        this.product.parts.push('PartB1');
    }

    public producePartC(): void {
        this.product.parts.push('PartC1');
    }

    /**
     * Los Constructores Concretos deben proporcionar sus propios métodos para
     * recuperar los resultados. Esto se debe a que varios tipos de constructores pueden
     * crear productos completamente diferentes que no siguen la misma interfaz.
     *
     * Generalmente, después de devolver el resultado final al cliente, se espera que
     * una instancia del constructor esté lista para comenzar a producir otro producto.
     * Por eso es una práctica común llamar al método reset al final del cuerpo del
     * método `getProduct`. Sin embargo, este comportamiento no es obligatorio, y
     * puedes hacer que tu constructor espere una llamada explícita a reset antes de
     * desechar el resultado anterior.
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * Tiene sentido usar el patrón Builder sólo cuando tus productos son bastante
 * complejos y requieren una configuración extensiva.
 *
 * A diferencia de otros patrones creacionales, los constructores concretos pueden
 * producir productos no relacionados. En otras palabras, los resultados de varios
 * constructores pueden no seguir la misma interfaz.
 */
class Product1 {
    public parts: string[] = [];

    /**
     * Método para listar las partes del producto.
     * Este método imprime en consola las partes que forman parte del producto.
     */
    public listParts(): void {
        console.log(`Partes del producto: ${this.parts.join(', ')}\n`);
    }
}

/**
 * El Director es responsable únicamente de ejecutar los pasos de construcción
 * en una secuencia particular. Resulta útil cuando se producen productos según
 * un orden o configuración específica. Estrictamente hablando, la clase Director
 * es opcional, ya que el cliente puede controlar los constructores directamente.
 */
class Director2 {
    private builder: Builder2;

    

    /**
     * El Director trabaja con cualquier instancia del constructor que el código
     * cliente le pase. De esta manera, el código cliente puede alterar el tipo final
     * del producto recién ensamblado.
     */
    public setBuilder(builder: Builder2): void {
        this.builder = builder;
    }

    /**
     * El Director puede construir varias variaciones de productos utilizando los
     * mismos pasos de construcción.
     */
    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

/**
 * El código cliente crea un objeto constructor, lo pasa al director y luego
 * inicia el proceso de construcción. El resultado final se obtiene del objeto constructor.
 */
function clientCode(director: Director2) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log('Producto básico estándar:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log('Producto completo estándar:');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    // Recuerda, el patrón Builder puede usarse sin una clase Director.
    console.log('Producto personalizado:');
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}

// Ejecución del código cliente.
const director = new Director2();
clientCode(director);
