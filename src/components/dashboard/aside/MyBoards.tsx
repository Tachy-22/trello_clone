import AddBoardButton from "./AddBoardButton";
import BoardList from "./BoardList";

const MyBoards = () => {
  return (
    <div className="flex flex-col gap-2 py-[1rem] w-full px-[]">
      <div className="flex justify-between px-[1rem]">
        <p className="font-semibold">Your boards</p>
        <span className="">
          <AddBoardButton />
        </span>
      </div>
      <div className="">
        <BoardList  />
      </div>
    </div>
  );
};

export default MyBoards;
