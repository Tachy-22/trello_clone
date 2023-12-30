type ColumnType = {
  columnIdentifier: any;
  id: string;
  title: string;
  taskIds: string[];
  boardId: string;
} | null;

type TaskType = { id: string; content: string; boardId: string } | null;

type userDbDataType = {
  id: string;
  email: string;
  name: string | null;
} | null;

type BoardDataType =
  | ({
      tasks: {
        id: string;
        content: string;
        boardId: string;
      }[];
      columns: {
        id: string;
        title: string;
        columnIdentifier: string;
        taskIds: string[];
        boardId: string;
      }[];
    } & {
      id: string;
      title: string;
      authorId: string;
      backgroundColor: string;
      backgroundImage: string;
      columnOrder: string[];
    })
  | null;

type BoardListType =
  | ({
      boards: BoardDataType[];
    } & userDbDataType)
  | null;
