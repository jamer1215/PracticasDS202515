//! Definición de la interfaz IWidget que establece los atributos de un Widget
interface IWidget {
    footer: boolean;// Determina si el widget tiene pie de página (footer)
    header: boolean;// Determina si el widget tiene encabezado (header)
    combo: Map<number,string>;// Lista de elementos 'combo' asociados con el widget
}

//! Implementación de la clase Widget que sigue los requisitos de IWidget
class Widget implements IWidget {
    footer: boolean = false;// Se inicializa sin footer por defecto
    header: boolean = false;// Se inicializa sin header por defecto
    combos: Map<number,string>=new Map()// Se inicializa sin elementos en combo por defecto
    items: Map<number,>

    
    constructor() {}// Constructor vacío, los valores se definen con el Builder

    addCombo(idCombo:number, comboData: string){
        this.combos.set(idCombo,comboData)
    }
}

//! BuilderWidget: clase que actúa como constructor de objetos Widget
class BuilderWidget {
    constructor(
        private widget: Widget// Se recibe una instancia de Widget para personalizar
    ) {}

    //! Método para agregar el footer al widget
    addFooter(): BuilderWidget {
        this.widget.footer = true;// Activa el footer en el widget
        return this;// Retorna el builder para continuar el encadenamiento
    }

    //! Método para agregar el header al widget
    addHeader(): BuilderWidget {
        this.widget.header = true;// Activa el header en el widget
        return this; // Retorna el builder para continuar el encadenamiento
    }

    //! Método para agregar varios elementos de tipo 'combo' al widget
    addCombo(idCombo: number, comboData:string): BuilderWidget {
        widget.addCombo(idCombo, comboData)
        return this;  // Retorna el builder para continuar el encadenamiento
    }

    addItem(idItem: number, )

    //! Método que construye y devuelve el objeto Widget final
    build(): Widget {
        let w = this.widget;// Guarda la instancia actual de widget
        this.widget = new Widget(); // Crea una nueva instancia de widget (reinicia el builder)
        return w;// Retorna la instancia final construida
    }
}

//! Uso del builder para crear instancias personalizadas de Widget

// Crear una instancia de BuilderWidget con un objeto Widget
let builder = new BuilderWidget(new Widget());//1) Encapsulamiento de creación - Aquí, solo usamos new una vez, 
//al iniciar el builder. Luego, el Widget finalizado lo obtenemos a través del método build() 

// Se usa el builder para crear un widget con combo, footer y header
let widget = builder.addCombo(4).addFooter().addHeader().build();

//3) Representación futura de un widget:
// Se usa el builder para crear otro widget, sin reiniciar el builder entre creaciones
let anotherwidget = builder.addCombo(4).addHeader().build();

console.log(widget);
console.log(anotherwidget);