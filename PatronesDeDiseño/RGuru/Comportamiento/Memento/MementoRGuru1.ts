// El originador contiene información importante que puede
// cambiar con el paso del tiempo. También define un método para
// guardar su estado dentro de un memento, y otro método para
// restaurar el estado a partir de él.
class Editor {
    // Variables que representan el estado del editor.
    // `text`: El texto actual que contiene el editor.
    // `curX`, `curY`: Las coordenadas del cursor.
    // `selectionWidth`: El ancho de la selección actual en el editor.
    private text: string = "";
    private curX: number = 0;
    private curY: number = 0;
    private selectionWidth: number = 0;

    // Método para cambiar el texto actual del editor.
    // Este método establece el valor del texto en la variable `text`.
    public setText(text: string): void {
        this.text = text;
    }

    // Método para configurar la posición del cursor.
    // Establece las coordenadas X e Y del cursor en el editor.
    public setCursor(x: number, y: number): void {
        this.curX = x;
        this.curY = y;
    }

    // Método para definir el ancho de la selección en el editor.
    // Establece el valor de `selectionWidth` a partir del parámetro `width`.
    public setSelectionWidth(width: number): void {
        this.selectionWidth = width;
    }

    // Guarda el estado actual del editor dentro de un memento.
    // Crea un objeto `Snapshot` (memento) con el estado actual del editor.
    public createSnapshot(): Snapshot {
        // El memento es un objeto inmutable; ese es el motivo
        // por el que el originador pasa su estado a los
        // parámetros de su constructor.
        return new Snapshot(this, this.text, this.curX, this.curY, this.selectionWidth);
    }
}

// La clase memento almacena el estado pasado del editor.
class Snapshot {
    // El editor asociado con este memento.
    // También almacena el estado del editor (texto, posición del cursor y selección).
    private editor: Editor;
    private text: string;
    private curX: number;
    private curY: number;
    private selectionWidth: number;

    // Constructor del memento. Recibe el editor y su estado para almacenarlo.
    // El memento guarda una "instantánea" del estado del editor.
    constructor(editor: Editor, text: string, curX: number, curY: number, selectionWidth: number) {
        this.editor = editor;
        this.text = text;
        this.curX = curX;
        this.curY = curY;
        this.selectionWidth = selectionWidth;
    }

    // En cierto punto, puede restaurarse un estado previo del
    // editor utilizando un objeto memento.
    public restore(): void {
        // Se restaura el estado guardado del editor.
        // El memento pasa el estado almacenado al editor original.
        this.editor.setText(this.text);
        this.editor.setCursor(this.curX, this.curY);
        this.editor.setSelectionWidth(this.selectionWidth);
    }
}

// Un objeto de comando puede actuar como cuidador. En este
// caso, el comando obtiene un memento justo antes de cambiar el
// estado del originador. Cuando se solicita deshacer, restaura
// el estado del originador a partir del memento.
class Command {
    // El campo `backup` almacena el estado de respaldo del editor en forma de memento.
    private backup: Snapshot | null = null;

    // Referencia al editor que está siendo manejado por este comando.
    // Este editor será respaldado y restaurado.
    constructor(private editor: Editor) {}

    // Método para crear un respaldo del estado actual del editor.
    // Guarda el estado actual del editor en un memento (Snapshot).
    public makeBackup(): void {
        this.backup = this.editor.createSnapshot();
    }

    // Método para deshacer el cambio en el editor.
    // Restaura el estado del editor al estado que fue respaldado previamente.
    public undo(): void {
        if (this.backup != null) {
            this.backup.restore();
        }
    }

    // Aquí podrían definirse más métodos que realicen operaciones sobre el editor.
    // Cada operación debería ser acompañada de una llamada a `makeBackup` para
    // poder deshacer los cambios en el futuro.
}

// Ejemplo de uso:

// Creamos una instancia de `Editor`.
const editor = new Editor();

// Creamos un comando que trabajará con el editor.
const command = new Command(editor);

// Establecemos un texto en el editor.
editor.setText("Texto original");

// Guardamos el estado actual del editor en un memento.
command.makeBackup();

// Cambiamos el estado del editor.
editor.setText("Texto modificado");

// Ahora podemos deshacer el cambio restaurando el estado previo.
command.undo();

// Si verificamos el estado del editor ahora, debería volver a "Texto original".
console.log(command);