import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function TaskForm({ event, onSubmit }) {
  const [tasks, setTasks] = useState([]); // Array to hold all tasks
  const [currentTask, setCurrentTask] = useState(0); // Track the current task index
  const [numberOfTasks, setNumberOfTasks] = useState(1); // Number of tasks selected

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      numberOfTasks: 1,
    },
  });

  useEffect(() => {
    // Initialize tasks array with empty objects based on the number of tasks
    const initialTasks = Array.from({ length: numberOfTasks }, () => ({
      taskName: "",
      taskDescription: "",
    }));
    setTasks(initialTasks);
  }, [numberOfTasks]);

  const saveCurrentTaskData = () => {
    // Save the current task data to the tasks array
    const currentValues = getValues();
    const updatedTasks = [...tasks];
    updatedTasks[currentTask] = {
      taskName: currentValues.taskName,
      taskDescription: currentValues.taskDescription,
    };
    setTasks(updatedTasks);
  };

  const handleNext = () => {
    saveCurrentTaskData(); // Save data on every click
    // Move to the next task
    if (currentTask < numberOfTasks - 1) {
      setCurrentTask((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    saveCurrentTaskData(); // Save data on every click
    // Move to the previous task
    if (currentTask > 0) {
      setCurrentTask((prev) => prev - 1);
    }
  };

  useEffect(() => {
    // Populate form with the task data when task index changes
    setValue("taskName", tasks[currentTask]?.taskName || "");
    setValue("taskDescription", tasks[currentTask]?.taskDescription || "");
  }, [currentTask, tasks, setValue]);

  const handleFormSubmit = () => {
    // Save current task data before submitting
    saveCurrentTaskData();
    // Submit all tasks
    onSubmit({ event, tasks });
  };

  // Progress visualizer function
  const renderProgressVisualizer = () => {
    return (
      <div className="flex justify-center items-center mb-4">
        {Array.from({ length: numberOfTasks }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Each bubble */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                index <= currentTask ? "bg-indigo-500 text-white" : "border-2 border-indigo-500"
              }`}
            >
              {index + 1}
            </div>
            {/* Line connector */}
            {index < numberOfTasks - 1 && (
              <div className="w-10 h-1 bg-indigo-300 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <form className="block mt-4 w-full bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-bold mb-1">Event: {event.name}</h3>


       {/* Render progress visualizer */}
       {renderProgressVisualizer()}

      <label className="mb-2 mt-3">
        Number of Tasks:
        <select
          value={numberOfTasks}
          onChange={(e) => setNumberOfTasks(Number(e.target.value))}
          className="block border p-2 w-full rounded bg-slate-100 text-neutral-950"
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
            className="block border p-2 w-full rounded bg-slate-100 text-neutral-950"
          />
          {errors.taskName && <p className="text-red-500">Task name is required</p>}
        </label>

        <label className="mb-2">
          Task Description:
          <input
            type="text"
            {...register("taskDescription", { required: true })}
            className="block border p-2 w-full rounded bg-slate-100 text-neutral-950"
          />
          {errors.taskDescription && <p className="text-red-500">Task description is required</p>}
        </label>
      </div>

      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentTask === 0}
          className={`py-1 px-3 rounded ${currentTask === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
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
