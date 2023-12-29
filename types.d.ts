type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

type TaskType = { id: string; content: string };

type BoardDataType = {
  tasks: TaskType[];
  columns: ColumnType[];
  taskIds: string[];
} ;
