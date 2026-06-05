import Column from "./Column";
import { TASK_STATUS } from "../utils/constants";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Board({ tasks, onDelete, onEdit, onDragEnd, allTasks }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
<div
  className="board"
>

        {TASK_STATUS.map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status);

          return (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                
                <div  ref={provided.innerRef} {...provided.droppableProps}>
                  <Column
                    title={status}
                    tasks={filteredTasks}
                    allTasks={tasks}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Board;