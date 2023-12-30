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
    taskMap.find((task: any) => taskId === task.id)
  ) as TaskType[];
  return <Column column={column} tasks={tasks} index={index} />;
};

export default ColumnList;
