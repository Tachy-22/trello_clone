import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BoardList = () => {
  const { userDbData, boardList } = useAppSelector((state) => state.board);
  const pathname = usePathname();
  console.log("myBoards :", boardList, pathname.split("/").at(-1));

  return (
    <div className="flex flex-col">
      {boardList?.boards?.map((board) => {
        return (
          <div key={board?.id as string}>
            <Link
              // {`link ${pathname === '/' ? 'active' : ''}`}
              className={`"  ${
                pathname.split("/").at(-1) === board?.id ? "bg-black/20" : ""
              } px-4 py-2  hover:bg-black/10 flex gap-2 justify-start items-center "`}
              href={`${board?.id}`}
            >
              <div
                style={{ backgroundColor: board?.backgroundColor }}
                className="rounded-md w-[1.5rem] h-[1.5rem] border"
              ></div>
              <p className=""> {board?.title}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BoardList;
