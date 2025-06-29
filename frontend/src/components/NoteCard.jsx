import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import React from "react";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="bg-gray-900 border-t-4 border-[#00FF9D] rounded-lg p-4 hover:shadow-lg transition-all duration-200 flex flex-col gap-2"
    >
      <h3 className="text-white text-lg font-semibold">{note.title}</h3>
      <p className="text-gray-400 line-clamp-3">{note.content}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex items-center gap-1">
          <PenSquareIcon className="w-4 h-4 text-gray-300" />
          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="text-red-500 hover:text-red-600 p-1 rounded transition duration-200"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
