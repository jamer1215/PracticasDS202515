// La clase base Comando define la interfaz común a todos los
// comandos concretos.
abstract class CommandCom1 {
    protected app: ApplicationCom1;
    protected editor: EditorCom1;
    protected backup: string='';

    constructor(app: ApplicationCom1, editor: EditorCom1) {
        this.app = app;
        this.editor = editor;
    }

    // Realiza una copia de seguridad del estado del editor.
    protected saveBackup(): void {
        this.backup = this.editor.text;
    }

    // Restaura el estado del editor.
    public undo(): void {
        this.editor.text = this.backup;
    }

    // El método de ejecución se declara abstracto para forzar a
    // todos los comandos concretos a proporcionar sus propias
    // implementaciones. El método debe devolver verdadero o
    // falso dependiendo de si el comando cambia el estado del
    // editor.
    abstract execute(): boolean;
}

// Los comandos concretos van aquí.
class CopyCommandCom1 extends CommandCom1 {
    // El comando copiar no se guarda en el historial ya que no
    // cambia el estado del editor.
    public execute(): boolean {
        this.app.clipboard = this.editor.getSelection();
        return false;
    }
}

class CutCommandCom1 extends CommandCom1 {
    // El comando cortar cambia el estado del editor, por lo que
    // debe guardarse en el historial si el método devuelve verdadero.
    public execute(): boolean {
        this.saveBackup();
        this.app.clipboard = this.editor.getSelection();
        this.editor.deleteSelection();
        return true;
    }
}

class PasteCommandCom1 extends CommandCom1 {
    public execute(): boolean {
        this.saveBackup();
        this.editor.replaceSelection(this.app.clipboard);
        return true;
    }
}

// La operación deshacer también es un comando.
class UndoCommandCom1 extends CommandCom1 {
    public execute(): boolean {
        this.app.undo();
        return false;
    }
}

// El historial global de comandos es simplemente una pila (stack).
class CommandHistoryCom1 {
    private history: CommandCom1[] = [];

    // Agrega un comando al final de la matriz del historial.
    public push(command: CommandCom1): void {
        this.history.push(command);
    }

    // Elimina y devuelve el último comando en el historial.
    public pop(): CommandCom1 | undefined {
        return this.history.pop();
    }
}

// La clase Editor tiene operaciones reales de edición de texto.
// Juega el papel de receptor: todos los comandos terminan delegando
// la ejecución a los métodos del editor.
class EditorCom1 {
    public text: string = "Public text string mi pana";

    // Devuelve el texto seleccionado.
    public getSelection(): string {
        // Simulación: devolver parte del texto como selección.
        return this.text.substring(0, 5);
    }

    // Borra el texto seleccionado.
    public deleteSelection(): void {
        // Simulación: elimina la parte seleccionada del texto.
        this.text = this.text.slice(5);
    }

    // Inserta los contenidos del portapapeles en la posición actual.
    public replaceSelection(text: string): void {
        this.text += text;
    }
}

// La clase Application establece relaciones entre objetos.
// Actúa como un emisor: cuando algo debe hacerse, crea un objeto de
// comando y lo ejecuta.
class ApplicationCom1 {
    public clipboard: string = "";
    public editors: EditorCom1[] = [];
    public activeEditor: EditorCom1;
    public history: CommandHistoryCom1 = new CommandHistoryCom1();

    constructor() {
        // Simulación de un editor activo.
        this.activeEditor = new EditorCom1();
        this.editors.push(this.activeEditor);
    }

    // El código que asigna comandos a objetos de la interfaz de usuario
    // puede tener este aspecto.
    public createUI(): void {
        const copy = () => this.executeCommand(new CopyCommandCom1(this, this.activeEditor));
        const cut = () => this.executeCommand(new CutCommandCom1(this, this.activeEditor));
        const paste = () => this.executeCommand(new PasteCommandCom1(this, this.activeEditor));
        const undo = () => this.executeCommand(new UndoCommandCom1(this, this.activeEditor));

        // Simulación de asignación de comandos a botones y atajos de teclado.
        console.log("Comandos asignados a botones y atajos de teclado.");
        // Ejemplo: asignar los comandos a eventos de botones o teclas.
        // copyButton.setCommand(copy);
        // shortcuts.onKeyPress("Ctrl+C", copy);
        // cutButton.setCommand(cut);
        // shortcuts.onKeyPress("Ctrl+X", cut);
        // pasteButton.setCommand(paste);
        // shortcuts.onKeyPress("Ctrl+V", paste);
        // undoButton.setCommand(undo);
        // shortcuts.onKeyPress("Ctrl+Z", undo);
    }

    // Ejecuta un comando y verifica si debe añadirse al historial.
    public executeCommand(command: CommandCom1): void {
        if (command.execute()) {
            this.history.push(command);
        }
    }

    // Toma el comando más reciente del historial y ejecuta su método deshacer.
    // No se necesita conocer la clase del comando, ya que el comando sabe
    // cómo deshacer su propia acción.
    public undo(): void {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

// Código para probar la funcionalidad
const appCom1 = new ApplicationCom1();
appCom1.createUI();

// Simulación de operaciones de prueba.
console.log("Texto inicial del editor:", appCom1.activeEditor.text);
appCom1.executeCommand(new PasteCommandCom1(appCom1, appCom1.activeEditor));
console.log("Texto después de pegar:", appCom1.activeEditor.text);
appCom1.undo();
console.log("Texto después de deshacer:", appCom1.activeEditor.text);

// Casos de prueba adicionales

// 1. Prueba del comando "Copy"
// Verifica que el comando de copiar no cambia el estado del editor y no se agrega al historial.
console.log("\n--- Prueba del comando Copy ---");
const copyCommand = new CopyCommandCom1(appCom1, appCom1.activeEditor);
appCom1.executeCommand(copyCommand);
console.log("Estado del editor después de Copy (sin cambios esperados):", appCom1.activeEditor.text);

// 2. Prueba del comando "Cut"
// Verifica que el comando de cortar cambie el estado del editor y se guarde en el historial.
console.log("\n--- Prueba del comando Cut ---");
const cutCommand = new CutCommandCom1(appCom1, appCom1.activeEditor);
appCom1.executeCommand(cutCommand);
console.log("Estado del editor después de Cut:", appCom1.activeEditor.text);

// 3. Prueba del comando "Paste"
// Verifica que el comando de pegar cambie el estado del editor y se guarde en el historial.
console.log("\n--- Prueba del comando Paste ---");
const pasteCommand = new PasteCommandCom1(appCom1, appCom1.activeEditor);
appCom1.executeCommand(pasteCommand);
console.log("Estado del editor después de Paste:", appCom1.activeEditor.text);

// 4. Prueba del comando "Undo"
// Verifica que la operación de deshacer restaure el estado anterior del editor.
console.log("\n--- Prueba del comando Undo ---");
appCom1.undo();
console.log("Estado del editor después de Undo (deshacer Paste):", appCom1.activeEditor.text);
appCom1.undo();
console.log("Estado del editor después de Undo (deshacer Cut):", appCom1.activeEditor.text);

// 5. Prueba del historial de comandos
// Verifica que el historial sea consistente después de varias operaciones.
console.log("\n--- Prueba del historial de comandos ---");
appCom1.executeCommand(new CutCommandCom1(appCom1, appCom1.activeEditor));
appCom1.executeCommand(new PasteCommandCom1(appCom1, appCom1.activeEditor));
console.log("Estado del editor después de varias operaciones:", appCom1.activeEditor.text);
appCom1.undo();
console.log("Estado del editor después de Undo (deshacer Paste):", appCom1.activeEditor.text);
appCom1.undo();
console.log("Estado del editor después de Undo (deshacer Cut):", appCom1.activeEditor.text);

// 6. Prueba de "Undo" cuando no hay historial
console.log("\n--- Prueba de Undo sin historial ---");
appCom1.undo(); // Intento de deshacer sin comandos en el historial
