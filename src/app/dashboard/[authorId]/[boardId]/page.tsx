import { Board } from "@/components/dashboard/board/Board";
import DashboardHeader from "./DashboardHeader";
import { fetchBoard } from "@/actions/board/fetchBoard";

const DashBoard = async ({
  params,
}: {
  params: { boardId: string; authorId: string };
}) => {
  const boardData = await fetchBoard(
    params.boardId.split("-")[0],
    params.boardId.split("-")[1]
  );
  return (
    <div className="flex relative flex-col border-gray-500 border-l  w-full">
      <DashboardHeader boardId={params.boardId} boardData={boardData} />
      <section
        style={{ backgroundColor: boardData?.backgroundColor }}
        className="h-full   w-full overflow-auto flex  "
      >
        <Board boardId={params.boardId} boardData={boardData} />
      </section>
    </div>
  );
};

export default DashBoard;
