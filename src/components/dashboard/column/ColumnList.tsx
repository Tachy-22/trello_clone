import Column from "./Column";

const ColumnList = ({
  column,
  taskMap,
  index,
}: {
  column: ColumnType;
  taskMap: TaskType[];
  index: number;
}) => {
  const tasks = column?.taskIds?.map((taskId) =>
    taskMap.find((task: any) => {
      console.log("task map:", task.taskIdentifier, taskId);
      return taskId === task.taskIdentifier;
    })
  ) as TaskType[];
  console.log("task map:", tasks, column?.taskIds, taskMap);
  return <Column column={column} tasks={tasks} index={index} />;
};

export default ColumnList;
