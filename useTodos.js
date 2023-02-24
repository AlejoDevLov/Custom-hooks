import { useEffect, useReducer } from "react";
import { todoReducer } from "../09-useReducer";


const initialState = [];

// mantener los valores del localStorage despues del refresh 
const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || []; // en caso de que lo primero sea null, retornar un array vacio
}

export const useTodos = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));    
    }, [todos]);

    const handleNewTodo = ( todo ) => {
        // console.log( todo );
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
        dispatch( action );
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id,
        }
        dispatch( action );
    }

    const handleToggleTodo = (id) => {
        // console.log(id);
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }

    const pending = todos.filter( todo => todo.done === false ).length;

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        pending,
        todosCount: todos.length,
    }
}