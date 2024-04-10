import { useState } from 'react';


type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export function useTodoList() {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [nextId, setNextId] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [editingId, setEditingId] = useState<number | null>(null);

    const addTodo = (text: string) => {
        if (text.trim() !== '') {
            setTodos([...todos, { id: nextId, text, completed: false }]);
            setNextId(nextId + 1);
        }
    };

    const updateTodo = (id: number, newText: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        return filter === 'completed' ? todo.completed : !todo.completed;
    });

    return {
        todos,
        inputValue,
        setInputValue,

        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        setFilter,

        filter,
        filteredTodos,

        editingId,
        setEditingId
    };
}
