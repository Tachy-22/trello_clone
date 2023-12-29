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
};

type userDbDataType =
  | {
      id: string;
      email: string;
      name: string | null;
    }
  | undefined;

type BoardDataType =
  | ({
      columns: ({
        tasks: { id: string; content: string; columnId: string }[];
      } & {
        id: string;
        title: string;
        taskIds: string[];
        boardId: string;
      })[];
    } & {
      id: string;
      title: string;
      authorId: string;
      backgroundColor: string;
      backgroundImage: string;
      columnOrder: string[];
    })
  | null
  | undefined;

type BoardListType =
  | ({
      boards: {
        id: string;
        title: string;
        authorId: string;
        backgroundColor: string;
        backgroundImage: string;
        columnOrder: string[];
      }[];
    } & {
      id: string;
      email: string;
      name: string | null;
    })
  | null
  | undefined;
