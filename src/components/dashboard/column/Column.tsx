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
    <Draggable draggableId={column?.columnIdentifier as string} index={index}>
      {(provided) => (
        <div
          className="bg-slate-100 rounded-xl  flex flex-col gap- w-[18rem] h-fit"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h1
            className="py-3  px-4 text-black font-semibold text-lg"
            {...provided.dragHandleProps}
          >
            {column?.title}
          </h1>

          <Droppable
            droppableId={column?.columnIdentifier as string}
            type="task"
          >
            {(provided, snapshot) => (
              <div
                className={`${
                  snapshot.isDraggingOver ? "bg-black/30 pt-2" : ""
                } px-4 pb-2 rounded-lg`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                //  isDraggingOver={snapshot.isDraggingOver}
              >
                <TaskList tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddTask columnId={column?.id as string} />
        </div>
      )}
    </Draggable>
  );
};

export default Column;
