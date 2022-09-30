import React, { useReducer, useRef, useEffect } from 'react';
import { render } from 'react-dom';

import './style.css';
import { TODOS } from './constants';

const initialState = [...TODOS];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return (action.name.length)
      ? [...state, {
        id: state.length ? Math.max(...state.map(todo => todo.id)) + 1 : 0,
        name: action.name,
        complete: false
      }]
      : state;
    }
    case 'TOGGLE_COMPLETE': {
      return state.map((item) => item.id === action.id ? {...item, complete: !item.complete } : item)
    }
    case 'DELETE_TODO': {
      return state.filter((item) => item.id !== action.id)
    }
    case 'CLEAR_TODOS': {
      return []
    }
    default: {
      return state;
    };
  }
}

const Todo = () => {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const completedTodos = todos.filter(todo => todo.complete);
  useEffect(() => {
    document.title = `You have ${completedTodos.length} items completed!`;
  })

  const addTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      name: inputRef.current.value,
      complete: false
    })
    inputRef.current.value = ''
  }

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id })
  }

  const clearTodos = () => {
    dispatch({ type: 'CLEAR_TODOS' })
  }

  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', id })
  }

  return (
    <>
      <div className="todo-input">
        <form onSubmit={addTodo}>
          <input ref={inputRef} type="search" id="add-todo" placeholder="Add Todo..." />
        </form>
      </div>

      <div className="column-container">
        {todos.map((todo) => (
          <div key={todo.id} className={`column-item ${todo.complete ? 'completed' : 'incomplete'}`}>
            <div className="flex-container">
              <div className="todo-name" onClick={() => toggleComplete(todo.id)}>{todo.name}</div>
              <div className="todo-delete" onClick = {() => deleteTodo(todo.id)}>&times;</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => clearTodos()}>
        CLEAR TODOS
      </button>
    </>
  );
}

render(<Todo />, document.getElementById('root'));
