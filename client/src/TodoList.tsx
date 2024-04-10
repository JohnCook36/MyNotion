import {List, Input, Checkbox, Button, Radio} from 'antd';
import {useTodoList} from './useTodoList';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export const TodoList = () => {
    const {
        inputValue,
        setInputValue,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        filter,
        setFilter,
        filteredTodos,
        editingId,
        setEditingId
    } = useTodoList();


    return (
        <div>
            <Input.Search
                placeholder="Enter a new task"
                enterButton="Add"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={(value) => {
                    addTodo(value);
                    setInputValue('');
                }}
                onBlur={() => {
                    addTodo(inputValue);
                    setInputValue('');
                }}
            />

            <Radio.Group onChange={(e) => setFilter(e.target.value)} value={filter}>
                <Radio value={'all'}>All</Radio>
                <Radio value={'completed'}>Completed</Radio>
                <Radio value={'incomplete'}>Incomplete</Radio>
            </Radio.Group>

            <List
                bordered
                dataSource={filteredTodos}
                renderItem={(item) => (
                    <List.Item>
                        {editingId === item.id ? (
                            <Input
                                value={item.text}
                                onChange={(e) => updateTodo(item.id, e.target.value)}
                                onBlur={() => {
                                    updateTodo(item.id, item.text);
                                    setEditingId(null); // Закончить редактирование
                                }}
                                disabled={item.completed}
                            />
                        ) : (
                            <div>
                                {item.text}
                                {!item.completed && <Button onClick={() => setEditingId(item.id)}><EditOutlined /></Button>}
                            </div>
                        )}
                        <Checkbox
                            checked={item.completed}
                            onChange={() => toggleTodo(item.id)}
                        />
                        <Button type="text" danger onClick={() => deleteTodo(item.id)}>
                            <DeleteOutlined/>
                        </Button>
                    </List.Item>
                )}
            />
        </div>
    );
};
