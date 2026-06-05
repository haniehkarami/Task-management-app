import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, onDelete, onEdit }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
      <div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  style={{
  
  width: "100%",
  boxSizing: "border-box",
    background: "#fff",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    border: "1px solid #e5e7eb",
    ...provided.draggableProps.style,
  }}
>
 <h4
  style={{
    margin: 0,
    marginBottom: "10px",
    fontSize: "18px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  }}
>
  {task.title}
</h4>

<p
  style={{
    color: "#6b7280",
    marginBottom: "16px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  }}
>
  {task.description}
</p>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    }}
  >
    <span
      style={{
        background:
          task.priority === "High"
            ? "#fee2e2"
            : task.priority === "Medium"
            ? "#fef3c7"
            : "#dcfce7",

        color:
          task.priority === "High"
            ? "#dc2626"
            : task.priority === "Medium"
            ? "#d97706"
            : "#16a34a",

        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {task.priority}
    </span>

    <span
      style={{
        fontSize: "13px",
        color: "#6b7280",
      }}
    >
      {task.assignee}
    </span>
  </div>

  <div
    style={{
      display: "flex",
      gap: "8px",
      marginTop: "12px",
    }}
  >
    <button
      onClick={() => onEdit(task)}
      style={{
        flex: 1,
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Edit
    </button>

    <button
      onClick={() => onDelete(task.id)}
      style={{
        flex: 1,
        background: "#ef4444",
        color: "#fff",
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  </div>
</div>
      )}
    </Draggable>
  );
}

export default TaskCard;
