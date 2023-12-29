import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface CounterState {
  value: number;
  tasks: TaskType[];
  columns: ColumnType[];
  columnOrder: string[];
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  tasks: [
    { id: "task-1", content: "Take out the garbage" },
    { id: "task-2", content: "Watch my favorite show" },
    { id: "task-3", content: "Charge my phone" },
    { id: "task-4", content: "Cook dinner" },
  ],
  columns: [
    {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2"],
    },
    {
      id: "column-2",
      title: "In progress",
      taskIds: ["task-3", "task-4"],
    },
  ],
  columnOrder: ["column-1", "column-2"],
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
      tasks: [...state.tasks, action.payload],
    }),
    updateColumns: (state, action: PayloadAction<ColumnType[]>) => ({
      ...state,
      columns: action.payload,
    }),
    updateColumnOrder: (state, action: PayloadAction<string[]>) => ({
      ...state,
      columnOrder: action.payload,
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
} = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.board.value;

export default boardSlice.reducer;
