import Task from "./Task";

const TaskList = ({
  tasks,
  column
}: {
  tasks: TaskType[];
  column: ColumnType
  }) => {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task, index) => (
        <Task key={task?.taskIdentifier as string} task={task} index={index} column={column} />
      ))}
    </div>
  );
};

export default TaskList;
