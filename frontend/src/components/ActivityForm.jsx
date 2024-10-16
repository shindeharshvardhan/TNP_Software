import React from "react";
import { useForm } from "react-hook-form";

function ActivityForm({ event, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: event.name,
      date: event.date,
      description: event.description || "",
    },
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="block mt-4 w-full bg-gray-100 p-4 rounded"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <h3 className="text-lg font-bold mb-1">Event: {event.name}</h3>
      <p>Date: {event.date}</p>

      <label className="mt-3 mb-2">
        Activity Name:
        <input
          type="text"
          {...register("name", { required: true })}
          className="block border p-2 w-full rounded bg-slate-100 text-neutral-950"
        />
        {errors.name && <p className="text-red-500">Activity name is required</p>}
      </label>

      <label className="mb-2">
        Date:
        <input
          type="date"
          {...register("date", { required: true })}
          className="block border p-2 w-full rounded bg-slate-100 text-neutral-950"
        />
        {errors.date && <p className="text-red-500">Date is required</p>}
      </label>

      <label className="mb-2">
        Description (Optional):
        <input
          type="text"
          {...register("description")}
          className="block border p-2 w-full rounded bg-slate-100 text-neutral-950"
        />
      </label>

      <button type="submit" className="mt-3 bg-green-500 text-neutral-950 py-1 px-3 rounded">
        Save Activity
      </button>
    </form>
  );
}

export default ActivityForm;
