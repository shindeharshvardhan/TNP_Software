import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function TaskForm({ company, onSubmit }) {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numberOfTasks: 1,
    },
  });

  useEffect(() => {
    // Initialize tasks array based on the selected number of tasks
    const initialTasks = Array.from({ length: numberOfTasks }, () => ({
      taskName: "",
      taskDescription: "",
      date: "",
    }));
    setTasks(initialTasks);
  }, [numberOfTasks]);

  const saveCurrentTaskData = () => {
    const currentValues = getValues();
    const updatedTasks = [...tasks];
    updatedTasks[currentTask] = {
      taskName: currentValues.taskName,
      taskDescription: currentValues.taskDescription,
      date: currentValues.date,
    };
    setTasks(updatedTasks);
  };

  const handleNext = () => {
    saveCurrentTaskData();
    if (currentTask < numberOfTasks - 1) {
      setCurrentTask((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    saveCurrentTaskData();
    if (currentTask > 0) {
      setCurrentTask((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setValue("taskName", tasks[currentTask]?.taskName || "");
    setValue("taskDescription", tasks[currentTask]?.taskDescription || "");
    setValue("date", tasks[currentTask]?.date || "");
  }, [currentTask, tasks, setValue]);

  const handleFormSubmit = async () => {
    saveCurrentTaskData();

    try {
      const response = await fetch("http://localhost:5000/api/events/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: company._id,
          companyName: company.name,
          tasks: tasks,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        onSubmit(result);
        alert("Tasks submitted successfully!");
      } else {
        alert("Failed to submit tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting tasks:", error);
      alert("An error occurred while submitting tasks.");
    }
  };

  return (
    <form className="glassmorphism mt-4 w-full bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Tasks for: {company.name}</h3>

      <label className="mb-2 mt-3">
        Number of Tasks:
        <select
          value={numberOfTasks}
          onChange={(e) => setNumberOfTasks(Number(e.target.value))}
          className="glassmorphism border p-2 w-full rounded bg-slate-100 text-neutral-950"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <div className="mb-4">
        <h4 className="font-bold">Task {currentTask + 1}</h4>
        <label className="mb-2 mt-3">
          Task Name:
          <input
            type="text"
            {...register("taskName", { required: true })}
            className="glassmorphism border p-2 w-full rounded bg-slate-100 text-neutral-950"
          />
          {errors.taskName && <p className="text-red-500">Task name is required</p>}
        </label>

        <label className="mb-2">
          Date:
          <input
            type="date"
            {...register("date", { required: true })}
            className="glassmorphism border p-2 w-full rounded bg-slate-100 text-neutral-950"
          />
          {errors.date && <p className="text-red-500">Date is required</p>}
        </label>

        <label className="mb-2">
          Task Description:
          <textarea
            {...register("taskDescription", { required: true })}
            className="glassmorphism border p-2 w-full rounded bg-slate-100 text-neutral-950"
          />
          {errors.taskDescription && <p className="text-red-500">Task description is required</p>}
        </label>
      </div>

      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentTask === 0}
          className={`py-1 px-3 rounded ${currentTask === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>

        {currentTask < numberOfTasks - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white py-1 px-3 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit(handleFormSubmit)}
            className="bg-green-500 text-white py-1 px-3 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
