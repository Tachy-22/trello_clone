import { deleteTask } from "@/actions/task/deleteTask";
import { updateTaskContent } from "@/actions/task/updateTaskContent";
import { updateCurrentBoardData } from "@/lib/redux-toolkit/boardSlice";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { Draggable } from "@hello-pangea/dnd";
import { Button, CircularProgress } from "@nextui-org/react";
import { Trash2Icon, TrendingUp } from "lucide-react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const Task = ({
  task,
  index,
  column,
}: {
  task: TaskType;
  index: number;
  column: ColumnType;
}) => {
  const {  currentBoardData } = useAppSelector(
    (state) => state.board
  );
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [content, setContent] = useState<string>(task?.content as string);
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    []
  );

  const handleContentSubmission = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEditable(false);

      if (task?.content !== content) {
        // const updatedColumn = currentBoardData?.columns?.filter(
        //   (col) => col.id === column.id
        // );
        // const updatedBoardList = Array.from(
        //   boardList?.boards as BoardDataType[]
        // );
        // const index = boardList?.boards?.findIndex(
        //   (obj) => obj?.id === column?.id
        // );
        // if (index == -1) {
        //   const boardIndex = ((boardList?.boards?.length as number) -
        //     1) as number;
        //   updatedBoardList?.splice(boardIndex, 1);

        //   updatedBoardList?.splice(boardIndex, 0, updatedBoard);
        //   console.log(
        //     "updatedBoardList",
        //     updatedBoardList,
        //     "boardIndex",
        //     boardIndex,
        //     boardList?.boards
        //   );
        // } else {
        //   updatedBoardList?.splice(index as number, 1);
        //   updatedBoardList?.splice(index as number, 0, updatedBoard);
        //   console.log("updatedBoardList", updatedBoardList, "id", index);
        // }
        //  dispatch(updateBoardList({ ...boardList, boards: updatedBoardList }));
        setIsUpdating(true);
        updateTaskContent(
          task?.id as string,
          task?.boardId as string,
          task?.taskIdentifier as string,
          content
        ).then(() => {
          setIsUpdating(false);
        });
        return;
      }
    },
    [task?.boardId, task?.content, task?.id, task?.taskIdentifier, content]
  );

  const handleSetIsEditable = useCallback(() => {
    setIsEditable(true);
  }, []);

  const handleTaskDeletion = useCallback(() => {
    console.log("deleting content");
    try {
      const newTaskIds = column.taskIds.filter(
        (id) => id !== (task?.taskIdentifier as string)
      ) as string[];
      const updatedColumns = currentBoardData?.columns?.filter(
        (col) => col.id !== column.id
      ) as ColumnType[];
      const updatedColumn = { ...column, taskIds: newTaskIds };
      const updatedBoardData = {
        ...currentBoardData,
        columns: [...updatedColumns, updatedColumn],
      } as BoardDataType;
      dispatch(updateCurrentBoardData(updatedBoardData));

      deleteTask(
        task?.id as string,
        column?.id,
        currentBoardData?.id as string,
        newTaskIds
      ).then(() => {
        console.log("deleting complete");
      });
    } catch (error) {
      console.error("an error occured during deletion :", error);
    }
  }, [column, currentBoardData, dispatch, task?.id, task?.taskIdentifier]);

  return (
    <Draggable draggableId={task?.taskIdentifier as string} index={index}>
      {(provided, snapshot) => (
        <div
          className={`" p-1 pr-2 group hover:border-blue-400 focus:border-0 border-2 rounded-lg  border-gray-300 drop-shadow-md  flex gap-6 justify-between items-center  bg-white ${
            snapshot.isDragging
              ? "border-2 border-dashed  border-gray-500"
              : " border border-gray-200"
          }  "`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          //    isDragging={snapshot.isDragging}
        >
          {isEditable ? (
            <input
              autoFocus
              onBlur={handleContentSubmission}
              onChange={handleContentChange}
              value={content}
              type="text"
              className="bg-transparent     bg-white p-1  rounded text-black w-full"
            />
          ) : (
            <h1
              onClick={handleSetIsEditable}
              className=" w-full  flex justify-between items-center text-black p-1"
            >
              <p> {content}</p>
              {isUpdating && (
                <span className="relative flex h-2 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </h1>
          )}
          <Button
            onPress={handleTaskDeletion}
            isIconOnly
            variant="light"
            size="sm"
            color="danger"
            className="group-hover:flex hidden"
          >
            <Trash2Icon size={18} />
          </Button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
