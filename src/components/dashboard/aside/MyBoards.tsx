import AddBoardButton from "./AddBoardButton";
import BoardList from "./BoardList";

const MyBoards = () => {
  return (
    <div className="flex flex-col gap-2 pt-[1rem] w-full px-[] h-fit">
      <div className="flex justify-between items-center px-[1rem] h-full">
        <p className="font-semibold">Your boards</p>
        <span className="">
          <AddBoardButton />
        </span>
      </div>
      <div className="h-full">
        <BoardList />
      </div>
    </div>
  );
};

export default MyBoards;
