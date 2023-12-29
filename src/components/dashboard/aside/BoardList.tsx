import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import Link from "next/link";

const BoardList = () => {
  const { userDbData, boardList } = useAppSelector((state) => state.board);
  console.log("myBoards :",  boardList);

  return (
    <div>
      <div className="flex flex-col">
        {boardList?.boards.map((board) => {
          return (
            <div key={board.id}>
              <Link
                className="px-4 py-2 hover:bg-black/10 flex gap-2 justify-start items-center"
                href={`${board.id}-${userDbData?.id}`}
              >
                <div
                  style={{ backgroundColor: board.backgroundColor }}
                  className="rounded-md w-[1.5rem] h-[1.5rem] border"
                ></div>
                <p className=""> {board.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardList;
