//! Definición de la interfaz IWidget que establece los atributos de un Widget
interface IWidget {
    footer: boolean;   // Determina si el widget tiene pie de página (footer)
    header: boolean;   // Determina si el widget tiene encabezado (header)
    combo: string[];   // Lista de elementos 'combo' asociados con el widget
}

//! Implementación de la clase Widget que sigue los requisitos de IWidget
class Widget implements IWidget {
    footer: boolean = false;   // Se inicializa sin footer por defecto
    header: boolean = false;   // Se inicializa sin header por defecto
    combo: string[] = [];      // Se inicializa sin elementos en combo por defecto
    
    constructor() {}           // Constructor vacío, los valores se definen con el Builder
}

//! BuilderWidget: clase que actúa como constructor de objetos Widget
class BuilderWidget {
    constructor(
        private widget: Widget    // Se recibe una instancia de Widget para personalizar
    ) {}

    //! Método para agregar el footer al widget
    addFooter(): BuilderWidget {
        this.widget.footer = true;    // Activa el footer en el widget
        return this;                  // Retorna el builder para continuar el encadenamiento
    }

    //! Método para agregar el header al widget
    addHeader(): BuilderWidget {
        this.widget.header = true;    // Activa el header en el widget
        return this;                  // Retorna el builder para continuar el encadenamiento
    }

    //! Método para agregar varios elementos de tipo 'combo' al widget
    addCombo(number: number): BuilderWidget {
        // Agrega elementos "combo X" a la lista combo del widget
        for (let i = 0; i < number; i++) {
            this.widget.combo.push(`combo ${i}`);
        }
        return this;  // Retorna el builder para continuar el encadenamiento
    }

    //! Método que construye y devuelve el objeto Widget final
    build(): Widget {
        let w = this.widget;          // Guarda la instancia actual de widget
        this.widget = new Widget();   // Crea una nueva instancia de widget (reinicia el builder)
        return w;                     // Retorna la instancia final construida
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