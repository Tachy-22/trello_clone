import { Board } from "@/components/dashboard/board/Board";
import DashboardHeader from "../DashboardHeader";
import { fetchBoard } from "@/actions/board/fetchBoard";

const DashBoard = async ({ params }: { params: { boardId: string } }) => {
  const boardData = await fetchBoard(
    params.boardId.split("-")[0],
    params.boardId.split("-")[1]
  );
  return (
    <div className="flex flex-col  w-full">
      <DashboardHeader boardId={params.boardId} boardData={boardData} />
      <section className="h-full  w-full">
        <Board boardId={params.boardId} boardData={boardData} />
      </section>
    </div>
  );
};

export default DashBoard;
