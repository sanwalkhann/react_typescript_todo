import React, { useState, ChangeEvent  } from "react";
import Todo from "./components/todoCard/Todo";
import Nav from "./components/nav/Nav";

import "./App.css";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
interface TodoItem {
  id: number;
  text: string;
  type: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      text: "Todo Text...",
      type: "TODO",
    },
    {
      id: 2,
      text: "another todo..",
      type: "DONE",
    },
  ]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoItem>({
    id: 0,
    text: "",
    type: "",
  });
  const markTodoDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, type: todo.type === "DONE" ? "TODO" : "DONE" }
        : todo
    );
    setTodos(updatedTodos);
  };

  const onEditHandler = (id: number) => {
    setError(false);
    setEditMode(true);
    setTodo(todos[todos.findIndex((todo) => todo.id === id)]);
  };
  console.log(todo);
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  // adding todo

  const [error, setError] = useState<boolean>(false);
  const onChangeTodoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setTodo(() => {
      return {
        id: todo.id ? todo.id : 0,
        text: event.target.value,
        type: "TODO",
      };
    });
  };
  console.log(todo);
  const onAddNewTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (todo.text.trim() === "") {
      setTodo((prev) => {
        return {
          ...prev,
          text: "",
        };
      });
      setError(true);
      return;
    }
    if (todo.text.trim().length > 20) {
      setError(true);
      alert("Text length should not be more than 20 characters!");
    }
    setError(false);
    if (!editMode) {
      setTodos(() => [
        ...todos,
        { id: Math.random(), text: todo.text, type: "TODO" },
      ]);
    } else {
      const index = todos.findIndex((t) => t.id === todo.id);
      console.log(index);
      const allTodos = [...todos];
      allTodos[index] = todo;
      setTodos(allTodos);

      setEditMode(false);
    }
    setTodo({
      id: 0,
      text: "",
      type: "TODO",
    });
  };
  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result)
    // if user lifts todo in non-droppable area
    if (!destination) return;
    // if user lifts todo in same area
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
      // if user changes todo status
    if(destination.droppableId === "TODOLIST") {
      markTodoDone(Number(result.draggableId));
    } 
    if(destination.droppableId === "DONELIST") {
      markTodoDone(Number(result.draggableId));
    }
    
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Nav />
      <div className="z-10 container mx-auto p-2">
        {/* form */}
         <div
          className={`${
            error && "border-red-500 border"
          } relative max-w-[500px] z-20 h-[50px] mx-auto rounded-full overflow-hidden border`}
        >
          <form onSubmit={onAddNewTodo} className="h-full w-full">
            <input
              className={`${
                error && "text-red-500 placeholder-red-500"
              } outline-none p-2 block h-full w-full`}
              type="text"
              placeholder={`${
                error ? "Can not add empty todo..." : "Enter todo..."
              }`}
              onChange={onChangeTodoHandler}
              value={todo.text}
              name="text"
            />
            <button
              type="submit"
              className={`${
                error && "bg-red-500"
              } z-30 absolute top-[50%] translate-y-[-50%] right-[1px] h-[45px] w-[45px] rounded-full bg-black text-white`}
            >
              NEW
            </button>
          </form>
        </div> 
        {/* form ends */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 col- w-full gap-4">
          {/* showing todo todos */}
          <Droppable droppableId="TODOLIST">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-2 rounded bg-light w-full h-max"
              >
                <div className="text-black text-sm font-bold">TODO</div>
                <div className="wrapper">
                  {todos
                    .filter((t) => t.type === "TODO").reverse()
                    .map((t, i) => (
                      <Todo
                        key={t.id}
                        todoObj={{
                          index: i.toString(),
                          id: t.id,
                          text: t.text,
                          type: t.type,
                          markDoneHandler: () => markTodoDone(t.id),
                          onDeleteHandler: () => deleteTodo(t.id),
                          editHandler: () => onEditHandler(t.id),
                        }}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          {/* showing done todos */}
          <Droppable droppableId="DONELIST">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-2 rounded bg-light w-full h-max"
              >
                <div className="text-black text-sm font-bold">DONE</div>
                <div className="wrapper">
                  {todos
                    .filter((t) => t.type === "DONE").reverse()
                    .map((t, i) => (
                      <Todo
                        key={t.id}
                        todoObj={{
                          index: i.toString(),
                          id: t.id,
                          text: t.text,
                          type: t.type,
                          markDoneHandler: () => markTodoDone(t.id),
                          onDeleteHandler: () => deleteTodo(t.id),
                          editHandler: () => onEditHandler(t.id),
                        }}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
