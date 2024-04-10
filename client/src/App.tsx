import { ConfigProvider } from "antd";
import { TodoList } from "./TodoList";

export function App() {
    return (
        <ConfigProvider>
            <div>
                <TodoList />
            </div>
        </ConfigProvider>
    );
}