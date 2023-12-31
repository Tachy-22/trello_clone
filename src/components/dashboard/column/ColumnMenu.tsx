const ColumnMenu = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-center p-2 py-3">List actions</h3>
      <div className="flex flex-col">
        <ul className="flex flex-col">
          <li className="hover:bg-black/10 py-2">Delete list</li>
          <li className="hover:bg-black/10 py-2">Edit title </li>
        </ul>
      </div>
    </div>
  );
};

export default ColumnMenu;
