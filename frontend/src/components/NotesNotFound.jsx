import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-[#00FF9D1A] rounded-full p-8">
        <NotebookIcon className="w-10 h-10 text-[#00FF9D]" />
      </div>
      <h3 className="text-2xl font-bold text-white">No notes yet</h3>
      <p className="text-gray-400">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link
        to="/create"
        className="bg-[#00FF9D] text-black font-medium px-4 py-2 rounded-md hover:bg-[#00e68c] transition duration-200"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
