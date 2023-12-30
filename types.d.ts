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
      tasks: TaskType[] | null | undefined;
      columns: ColumnType[] | null | undefined;
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
      boards: BoardDataType[] | null | undefined;
    } & userDbDataType)
  | null
  | undefined;
