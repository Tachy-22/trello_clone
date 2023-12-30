type ColumnType =
  | {
      columnIdentifier: any;
      id: string;
      title: string;
      taskIds: string[];
      boardId: string;
    }
  | null
  | undefined;

type TaskType =
  | { id: string; content: string; boardId: string }
  | null
  | undefined;

type userDbDataType =
  | {
      id: string;
      email: string;
      name: string | null | undefined;
    }
  | null
  | undefined;

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
  | null
  | undefined;

type BoardListType =
  | ({
      boards: BoardDataType[];
    } & userDbDataType)
  | null
  | undefined;
