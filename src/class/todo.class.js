
export class Todo {


    // metodo para recuperar los metodos al momento de regresar los datos con el metodo cargarLocalStorage RECOSTRUYENDO LAS INSTANCIAS DE TODO
    static fromJson({id,tarea,completado,creado}){

        const tempTodo= new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;
        

        return tempTodo;
    }

    constructor(tarea){

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();

    }

    imprimirClase(){
    
        console.log(`${this.tarea} - ${this.id}`);
    }
}