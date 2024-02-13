import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaEdit } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface TodoProps {
  id: number;
  text: string;
  type: string;
  index: string;
  markDoneHandler: () => void;
  onDeleteHandler: () => void;
  editHandler: () => void;
}

const Todo: React.FC<{ todoObj: TodoProps }> = ({ todoObj }) => {
  const markAsDoneHandler = () => {
    todoObj.markDoneHandler();
  };

  const deleteHandler = () => {
    todoObj.onDeleteHandler();
  };

  const editHandler = () => {
    todoObj.editHandler();
  };

  return (
    <Draggable draggableId={todoObj.id.toString()} index={todoObj.id}>
      {(provided) => (
        <div
          {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
          className="todo bg-white shadow-sm rounded grid grid-cols-2 py-5 px-2 my-3 cursor-pointer hover:shadow-lg hover:scale-105 transition-all ease duration-500"
        >
          <p className={`${todoObj.type === "DONE" && "line-through"}`}>
            {todoObj.text}
          </p>
          <div className="flex justify-end items-center gap-3">
            <button
              className="flex justify-center items-center w-max"
              onClick={editHandler}
            >
              <FaEdit className="cursor-pointer" />
            </button>
            <button className="flex justify-center items-center w-max">
              <MdFileDownloadDone onClick={markAsDoneHandler} />
            </button>
            <button
              className="flex justify-center items-center w-max"
              onClick={deleteHandler}
            >
              <MdDelete onClick={deleteHandler} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
