import { Draggable } from "@hello-pangea/dnd";

const Task = ({ task, index }: { task: TaskType; index: number }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="p-3 rounded-md bg-white  "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          //    isDragging={snapshot.isDragging}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task