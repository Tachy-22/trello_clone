type ColumnType = {
  columnIdentifier: any;
  id: string;
  title: string;
  taskIds: string[];
  boardId: string;
};

type TaskType =
  | {
      id: string;
      content: string;
      boardId: string;
      taskIdentifier: string;
    }
  | undefined;

type userDbDataType =
  | {
      id: string;
      email: string;
      name: string | null | undefined;
      invites: string[];
    }
  | null
  | undefined;

type BoardDataType =
  | ({
      tasks: TaskType[] | null | undefined;
      columns: ColumnType[];
    } & {
      id: string;
      title: string;
      authorId: string;
      backgroundColor: string;
      backgroundImage: string;
      columnOrder: string[];
      members?: string[];
    })
  | null
  | undefined;

type BoardListType =
  | ({
      boards: BoardDataType[] | null | undefined;
    } & userDbDataType)
  | undefined;
