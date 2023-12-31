import { Board } from "@/components/dashboard/board/Board";
import DashboardHeader from "./DashboardHeader";
import { fetchBoard } from "@/actions/board/fetchBoard";

const DashBoard = async ({
  params,
}: {
  params: { boardId: string; authorId: string };
}) => {
  const boardData = await fetchBoard(params.boardId, params.authorId);

  const color1 = boardData?.backgroundColor.split("-")[0];
  const color2 = boardData?.backgroundColor.split("-")[1];

  const background =
    boardData?.backgroundColor !== ""
      ? `linear-gradient(to  right,  ${color1} 0%,${color2} 100%)`
      : `url(${boardData?.backgroundImage})`;
  return (
    <div
      style={{
        background: background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex relative bg-[image:var(--image-url) bg-contain flex-col border-gray-500 border-l  w-full "
    >
      <DashboardHeader boardData={boardData as BoardDataType} />
      <section className="h-full   w-full overflow-auto flex  ">
        <Board
          boardId={params.boardId}
          boardData={boardData as BoardDataType}
        />
      </section>
    </div>
  );
};

export default DashBoard;
