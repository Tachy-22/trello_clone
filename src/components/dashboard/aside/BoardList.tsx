import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DeleteBoardButton from "./DeleteBoardButton";
import getBackground from "@/controls/getBackground";

const BoardList = () => {
  const { boardList } = useAppSelector((state) => state.board);
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {boardList?.boards?.map((board) => {
        return (
          <div
            className={` transition-all duration-250 group   flex hover:bg-black/10 justify-between items-center w-full ${
              pathname.split("/").at(-1) === board?.id ? "bg-black/20" : ""
            }`}
            key={board?.id as string}
          >
            <Link
              className={`" pl-4   py-2 w-full  flex gap-2 justify-start items-center "`}
              href={`${board?.id}`}
            >
              <div
                style={{
                  background: getBackground(board),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="rounded-md w-[1.5rem] h-[1.5rem] border"
              />

              <p className=""> {board?.title}</p>
            </Link>
            <span className=" group-hover:block hidden pr-4">
              <DeleteBoardButton type="delete" board={board} />
            </span>
          </div>
        );
      })}
      {boardList?.boards?.length === 0 && (
        <p className="text-blue-400/50 text-sm px-2 w-full flex flex-col">
          <span className=""> You currently dont have any boards.</span>
          <span className=""> click the "+" icon to get started !</span>
        </p>
      )}
    </div>
  );
};

export default BoardList;
