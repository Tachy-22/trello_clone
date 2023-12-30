import { Draggable } from "@hello-pangea/dnd";

const Task = ({ task, index }: { task: TaskType; index: number }) => {
  return (
    <Draggable draggableId={task?.taskIdentifier as string} index={index}>
      {(provided, snapshot) => (
        <div
          className={`" p-3 rounded-md drop-shadow-md   bg-white ${
            snapshot.isDragging
              ? "border-2 border-dashed  border-gray-500"
              : " border border-gray-200"
          }  "`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          //    isDragging={snapshot.isDragging}
        >
          <p className="text-black ">{task?.content as string}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
