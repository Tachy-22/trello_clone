import { Board } from "@/components/dashboard/board/Board";
import DashboardHeader from "./DashboardHeader";
import { fetchBoard } from "@/actions/board/fetchBoard";
import BoardView from "./BoardView";
import getBackground from "@/controls/getBackground";

const DashBoard = async ({
  params,
}: {
  params: { boardId: string; authorId: string };
}) => {
  const boardData = await fetchBoard(params.boardId, params.authorId);

  return (
    <div
      style={{
        background: getBackground(boardData as BoardDataType),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex relative bg-[image:var(--image-url) bg-contain flex-col border-gray-500 border-l  w-full "
    >
      {params.boardId !== "view" && (
        <>
          <DashboardHeader boardData={boardData as BoardDataType} />
          <section className="h-full   w-full overflow-auto flex  ">
            <Board boardData={boardData as BoardDataType} />
          </section>
        </>
      )}
      {params.boardId === "view" && (
        <>
          <section className="h-full   w-full overflow-auto flex  ">
            <BoardView />
          </section>
        </>
      )}
    </div>
  );
};

export default DashBoard;
