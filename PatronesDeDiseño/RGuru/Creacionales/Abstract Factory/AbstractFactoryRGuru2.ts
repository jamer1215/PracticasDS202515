/**
 * La interfaz Fábrica Abstracta declara un conjunto de métodos que devuelven
 * diferentes productos abstractos. Estos productos se denominan familia y están
 * relacionados por un tema o concepto de alto nivel. Los productos de una familia
 * pueden colaborar entre sí. Una familia de productos puede tener varias variantes,
 * pero los productos de una variante son incompatibles con productos de otra variante.
 */
interface FabricaAbstracta {
    crearProductoA(): ProductoAbstractoA;
    crearProductoB(): ProductoAbstractoB;
}

/**
 * Las fábricas concretas producen una familia de productos que pertenecen a una
 * única variante. La fábrica garantiza que los productos resultantes sean compatibles.
 * Observa que las firmas de los métodos de la Fábrica Concreta devuelven un producto
 * abstracto, mientras que dentro del método se instancia un producto concreto.
 */
class FabricaConcreta1 implements FabricaAbstracta {
    public crearProductoA(): ProductoAbstractoA {
        return new ProductoConcretoA1();
    }

    public crearProductoB(): ProductoAbstractoB {
        return new ProductoConcretoB1();
    }
}

/**
 * Cada Fábrica Concreta tiene una variante correspondiente de producto.
 */
class FabricaConcreta2 implements FabricaAbstracta {
    public crearProductoA(): ProductoAbstractoA {
        return new ProductoConcretoA2();
    }

    public crearProductoB(): ProductoAbstractoB {
        return new ProductoConcretoB2();
    }
}

/**
 * Cada producto distinto de una familia de productos debe tener una interfaz base.
 * Todas las variantes del producto deben implementar esta interfaz.
 */
interface ProductoAbstractoA {
    funcionUtilA(): string;
}

/**
 * Estos productos concretos son creados por las Fábricas Concretas correspondientes.
 */
class ProductoConcretoA1 implements ProductoAbstractoA {
    public funcionUtilA(): string {
        return 'El resultado del producto A1.';
    }
}

class ProductoConcretoA2 implements ProductoAbstractoA {
    public funcionUtilA(): string {
        return 'El resultado del producto A2.';
    }
}

/**
 * Esta es la interfaz base de otro producto. Todos los productos pueden interactuar
 * entre sí, pero la interacción adecuada solo es posible entre productos de la misma
 * variante concreta.
 */
interface ProductoAbstractoB {
    /**
     * Producto B puede hacer su propia funcionalidad...
     */
    funcionUtilB(): string;

    /**
     * ...pero también puede colaborar con el ProductoA.
     *
     * La Fábrica Abstracta garantiza que todos los productos que crea sean de la
     * misma variante y, por lo tanto, compatibles.
     */
    otraFuncionUtilB(colaborador: ProductoAbstractoA): string;
}

/**
 * Estos productos concretos son creados por las Fábricas Concretas correspondientes.
 */
class ProductoConcretoB1 implements ProductoAbstractoB {
    
    public funcionUtilB(): string {
        return 'El resultado del producto B1.';
    }

    /**
     * La variante, Producto B1, solo puede trabajar correctamente con la variante,
     * Producto A1. Sin embargo, acepta cualquier instancia de ProductoAbstractoA como
     * argumento.
     */
    public otraFuncionUtilB(colaborador: ProductoAbstractoA): string {
        const resultado = colaborador.funcionUtilA();
        return `El resultado del B1 colaborando con (${resultado})`;
    }
}

class ProductoConcretoB2 implements ProductoAbstractoB {
    
    public funcionUtilB(): string {
        return 'El resultado del producto B2.';
    }

    /**
     * La variante, Producto B2, solo puede trabajar correctamente con la variante,
     * Producto A2. Sin embargo, acepta cualquier instancia de ProductoAbstractoA como
     * argumento.
     */
    public otraFuncionUtilB(colaborador: ProductoAbstractoA): string {
        const resultado = colaborador.funcionUtilA();
        return `El resultado del B2 colaborando con (${resultado})`;
    }
}

/**
 * El código cliente funciona con fábricas y productos únicamente a través de tipos
 * abstractos: FabricaAbstracta, ProductoAbstractoA y ProductoAbstractoB. Esto te
 * permite pasar cualquier subclase de fábrica o producto al código cliente sin romperlo.
 */
function codigoClienteAF(fabrica: FabricaAbstracta) {
    // Se crea el producto A y el producto B usando la fábrica concreta proporcionada.
    const productoA = fabrica.crearProductoA();
    const productoB = fabrica.crearProductoB();

    // Se ejecuta la funcionalidad del producto B.
    console.log(productoB.funcionUtilB());
    // Se muestra cómo el producto B colabora con el producto A.
    console.log(productoB.otraFuncionUtilB(productoA));
}

/**
 * El código cliente puede trabajar con cualquier clase de fábrica concreta.
 */
console.log('Cliente: Probando el código cliente con el primer tipo de fábrica...');
codigoClienteAF(new FabricaConcreta1());

console.log('');

console.log('Cliente: Probando el mismo código cliente con el segundo tipo de fábrica...');
codigoClienteAF(new FabricaConcreta2());
