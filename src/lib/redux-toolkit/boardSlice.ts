import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface CounterState {
  tasks: TaskType[];
  columns: ColumnType[];
  columnOrder: string[];
  userDbData: userDbDataType | null;
  boardList: BoardListType | null;
  currentBoardData: BoardDataType;
}

// Define the initial state using that type
const initialState: CounterState = {
  tasks: [],
  columns: [],
  columnOrder: [],
  userDbData: null,
  boardList: null,
  currentBoardData: null,
};

export const boardSlice = createSlice({
  name: "board",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<TaskType>) => ({
      ...state,
      tasks: [...state?.tasks, action.payload],
    }),
    updateColumns: (state, action: PayloadAction<ColumnType[]>) => ({
      ...state,
      columns: action.payload,
    }),
    updateColumnOrder: (state, action: PayloadAction<string[]>) => ({
      ...state,
      columnOrder: action.payload,
    }),
    updateUserDbData: (
      state,
      action: PayloadAction<userDbDataType | null>
    ) => ({
      ...state,
      userDbData: action.payload,
    }),
    updateBoardList: (state, action: PayloadAction<BoardListType | null>) => ({
      ...state,
      boardList: action.payload,
    }),
    updateCurrentBoardData: (
      state,
      action: PayloadAction<BoardDataType | null>
    ) => ({
      ...state,
      currentBoardData: action.payload,
    }),
  },
});

export const {
  updateTask,
  updateColumns,
  updateColumnOrder,
  updateUserDbData,
  updateBoardList,
  updateCurrentBoardData,
} = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default boardSlice.reducer;
