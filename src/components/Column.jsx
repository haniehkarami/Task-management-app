import TaskCard from "./TaskCard";

function Column({
  title,
  tasks,
  onDelete,
  onEdit,
}) {
  return (
<div
  style={{
    width:"100%",
 boxSizing:"border-box",
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "16px",
  }}
>
      <h2
        style={{
          marginBottom: "16px",
           fontSize: "18px",
        }}
      >
        {title}
      </h2>

      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default Column;