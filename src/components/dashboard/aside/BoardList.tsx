import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import DeleteBoardButton from "./DeleteBoardButton";

const BoardList = () => {
  const { userDbData, boardList } = useAppSelector((state) => state.board);
  const pathname = usePathname();
  console.log("myBoards :", boardList, pathname.split("/").at(-1));

  return (
    <div className="flex flex-col">
      {boardList?.boards?.map((board) => {
        const color1 = board?.backgroundColor.split("-")[0];
        const color2 = board?.backgroundColor.split("-")[1];

        const background =
          board?.backgroundColor !== ""
            ? `linear-gradient(to  right,  ${color1} 0%,${color2} 100%)`
            : `url(${board?.backgroundImage})`;
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
                  background: background,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="rounded-md w-[1.5rem] h-[1.5rem] border"
              />
              <p className=""> {board?.title}</p>
            </Link>
            <span className=" group-hover:block hidden pr-4">
              <DeleteBoardButton board={board} />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BoardList;
