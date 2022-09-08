import { ReactElement } from "react";

const InvitePage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-zinc-800 flex justify-center items-center">
      <div className="bg-black w-96 text-gray-100 px-3 py-4 rounded">
        <h3 className="font-bold text-xl text-center">
          You are invited on {`"Server name"`}
        </h3>
        <button className="mt-4 w-full btn-primary">Accept invite</button>
      </div>
    </div>
  );
};

InvitePage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default InvitePage;
