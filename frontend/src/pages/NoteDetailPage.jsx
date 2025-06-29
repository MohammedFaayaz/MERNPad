import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // NOTE: use 'react-router-dom' not 'react-router'
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React from "react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoaderIcon className="animate-spin w-10 h-10 text-green-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-green-400 hover:underline transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-400 border border-red-400 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
          >
            <Trash2Icon className="w-4 h-4 inline mr-2" />
            Delete Note
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 shadow-lg">
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-green-300">Title</label>
            <input
              type="text"
              placeholder="Note title"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-semibold text-green-300">Content</label>
            <textarea
              placeholder="Write your note here..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>

          <div className="text-right">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
