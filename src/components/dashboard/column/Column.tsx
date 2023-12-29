import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskList from "../task/TaskList";
import AddTask from "../task/AddTask";

const Column = ({
  column,
  tasks,
  index,
}: {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
}) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="bg-slate-100 rounded-md  flex flex-col gap- w-[20rem] h-fit"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h1
            className="pt-3 px-4 text-black font-semibold text-lg"
            {...provided.dragHandleProps}
          >
            {column.title}
          </h1>
          <AddTask columnId={column.id} />
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`${
                  snapshot.isDraggingOver ? "bg-black/30 pt-2" : ""
                } px-4 pb-4 rounded-lg`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                //  isDraggingOver={snapshot.isDraggingOver}
              >
                <TaskList tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
