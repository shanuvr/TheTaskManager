"use client";

interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
  onDelete: (_id: string) => void;
  onEdit: (_id: string) => void;
}

export default function TaskCard({
  _id,
  title,
  description,
  completed,
  onDelete,
  onEdit,
}: TaskCardProps) {
  return (
    <div className="p-4 border border-black rounded">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-800">{description}</p>

      <span
        className={`inline-block mt-2 text-sm px-2 py-1 border border-black rounded`}
      >
        {completed ? "Completed" : "Pending"}
      </span>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(_id)}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
