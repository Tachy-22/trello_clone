import Task from "./Task";

const TaskList = ({ tasks }: { tasks: TaskType[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  );
};

export default TaskList;
