import { Link } from "lucide-react";

const ShareBoardForm = () => {
  return (
    <div className=" p-3  w-full">
      <h1 className="text-lg font-semibold mb-4">Invite to Workspace</h1>
      <input
        className="w-full mb-4  px-3 py-2 border rounded-md focus:outline-none  focus:border-blue-500"
        type="text"
        placeholder="Email address or name"
      />

      <div className="flex justify-between">
        {" "}
        <div className="flex-col flex justify-between items-start mb-4">
          <p className="text-sm font-medium" data-testid="ws-share-link-label">
            Invite someone to this Workspace with a link:
          </p>
          <button className="text-blue-500 hover:text-blue-700" type="button">
            Disable link
          </button>
        </div>
        <button
          className="text-gray-500 mt-2 flex h-fit gap-2 items-center hover:text-gray-700 bg-black/10 p-2 rounded-md"
          type="button"
        >
          <Link />
          Copy link
        </button>
      </div>
    </div>
  );
};

export default ShareBoardForm;
