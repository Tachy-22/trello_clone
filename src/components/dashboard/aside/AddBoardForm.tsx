"use client";

import { FC, useCallback, useMemo, useState } from "react";
import Image from "next/image";
// import { GoCheck } from "react-icons/go";
// import { addBoard } from "./controls/prisma/addBoard";
import { useRouter } from "next/navigation";
import { Check, PlusIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { addBoard } from "@/actions/aside/addBoard";
import { Button } from "@nextui-org/react";

interface AddBoardFormProps {
  onClose: () => void;
}

const backgroundImgs = [
  "https://images.unsplash.com/photo-1702529939203-04c666ee2b7f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1701962541409-e2c1256a8574?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1700517490336-6830d0d188a5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1699565784882-5009dd1a3ad6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703585266821-d8b612a25adc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1702820464555-45c805a3182b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1701609887749-4ab8029d903a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const backgroundColors = [
  "#000428-#004e92",
  "#ffafbd-#ffc3a0",
  "#2193b0-#6dd5ed",
  "#cc2b5e-#753a88",
  "#ee9ca7-#ffdde1",
  "#bdc3c7-#2c3e50",
  "#de6262-#ffb88c",
  "#141e30-#243b55",
  "#eb3349-#f45c43",
  "#eacda3-#d6ae7b",
  "#ba5370-#f4e2d8",
  "#4ca1af-#c4e0e5",
  "#c33764-#1d2671",
  "#aa076b-#61045f",
];

const AddBoardForm: FC<AddBoardFormProps> = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userDbData } = useAppSelector((state) => state.board);
  const [bgColor, setBgColor] = useState<string>(backgroundColors[0]);
  const [bgUrl, setBgUrl] = useState<string>("");

  const [boardTitle, setBoardTitle] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);

  const handleBackgroundColorSelection = useCallback((color: string) => {
    setBgColor(color);
    setBgUrl("");
  }, []);

  const handleBackgroundImageSelection = useCallback((url: string) => {
    setBgColor("");
    setBgUrl(url);
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBoardTitle(e.target.value);
    },
    []
  );

  const handleBoardCreation = useCallback(() => {
    const boardCreationData = {
      boardTitle,
      bgColor,
      bgUrl,
    };
    console.log("formdata :", boardCreationData, userDbData);
    setAdding(true);

    addBoard(boardCreationData, userDbData?.id as string)
      .then((boardPath) => {
        router.push(`${boardPath}` as string);
      })
      .then(() => {
        setAdding(false);

        onClose();
      })
      .catch(async (e) => {
        console.error(e);
      });
    setBoardTitle("");
  }, [bgColor, boardTitle, onClose, router, userDbData, bgUrl]);

  const isButtonDisabled = useMemo(() => boardTitle === "", [boardTitle]);

  const color1 = bgColor.split("-")[0];
  const color2 = bgColor.split("-")[1];
  const background =
    bgColor !== ""
      ? `linear-gradient(to  right,  ${color1} 0%,${color2} 100%)`
      : `url(${bgUrl})`;

  return (
    <form className="rounded-lg  p-3 w-full md:w-full flex flex-col gap-3">
      <div
        style={{
          background: background,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" flex justify-center rounded-md w-fit mx-auto"
      >
        <Image
          src={`/svgs/createBoardImg.svg`}
          alt={`template`}
          width={200}
          height={200}
          className=" p-2 rounded-md "
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8sHdvPQAHegLLmK17/gAAAABJRU5ErkJggg=="
        />
      </div>
      <div className="form flex flex-col gap-1">
        <>
          <label
            htmlFor="background-colors"
            className=" text-sm font-semibold  dark:text-white text-gray-700"
          >
            Background photo :
          </label>
          <ul className="grid grid-cols-7 gap-2 w-full justify-between   my-1">
            {backgroundImgs.map((imgUrl, id) => {
              const backgroundUrls = `url(${imgUrl})`;
              return (
                <li
                  onClick={() => {
                    handleBackgroundImageSelection(imgUrl);
                  }}
                  key={id}
                  className=" "
                >
                  <button
                    type="button"
                    style={{
                      background: backgroundUrls,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className={` h-10 w-10  rounded-md hover:brightness-90 transition-colors duration-[0.3s] flex justify-center items-center text-gray-200 text-base font-light `}
                  >
                    {imgUrl === bgUrl && <Check />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
        <>
          <label
            htmlFor="background-colors"
            className=" text-sm font-semibold  dark:text-white text-gray-700"
          >
            Background color:
          </label>
          <ul className="grid grid-cols-7 gap-2 w-full justify-between   my-1">
            {backgroundColors.map((color, id) => {
              const color1 = color.split("-")[0];
              const color2 = color.split("-")[1];
              const background = `linear-gradient(to  right,  ${color1} 0%,${color2} 100%)`;
              return (
                <li
                  onClick={() => {
                    handleBackgroundColorSelection(color);
                  }}
                  key={id}
                  className=" "
                >
                  <button
                    type="button"
                    style={{
                      background: background,
                    }}
                    className={` h-10 w-10  rounded-md hover:brightness-90 transition-colors duration-[0.3s] flex justify-center items-center text-gray-200 text-base font-light `}
                  >
                    {color === bgColor && <Check />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
        <div className="">
          <label
            htmlFor="title"
            className=" text-sm dark:text-white font-semibold mb-2 text-gray-700"
          >
            Board title :
          </label>
          <div className="w-full border border-gray-300 dark:border-gray-300/40 rounded-lg   my-1">
            <input
              type="text"
              id="title"
              name="board-title"
              className="outline- p-2 px-3 w-full rounded-lg outline-none"
              autoFocus
              autoComplete=""
              value={boardTitle}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        <Button
          disabled={isButtonDisabled}
          isLoading={adding}
          onPress={handleBoardCreation}
          className={`${
            isButtonDisabled
              ? "bg-black/20 dark:bg-white/20 dark:text-white/30 border dark:border-gray-300/50 border-gray-400 cursor-not-allowed "
              : "bg-blue-500 hover:bg-blue-500/90"
          } text-white w-full  text-center p-1 rounded-lg my-2 transition-colors duration-200 "`}
          radius="sm"
          startContent={adding ? <></> : <PlusIcon size={18} />}
        >
          Create board
        </Button>
      </div>
    </form>
  );
};

export default AddBoardForm;
