import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface CounterState {
  value: number;
  tasks: TaskType[] | null;
  columns: ColumnType[] | null;
  columnOrder: string[] | null;
  userDbData: userDbDataType | null;
  boardList: BoardListType | null;
  currentBoardData: BoardDataType | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  tasks: null,
  columns: null,
  columnOrder: null,
  userDbData: null,
  boardList: null,
  currentBoardData: null,
};

export const boardSlice = createSlice({
  name: "board",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    addTask: (state, action: PayloadAction<TaskType>) => ({
      ...state,
      tasks: [...(state?.tasks as TaskType[]), action.payload],
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
  increment,
  decrement,
  incrementByAmount,
  addTask,
  updateColumns,
  updateColumnOrder,
  updateUserDbData,
  updateBoardList,
  updateCurrentBoardData,
} = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.board.value;

export default boardSlice.reducer;
