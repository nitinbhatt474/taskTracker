const validateForm = (state) => {
  let message = "";
  if (state.name.trim() === "") message = "Task Name cannot be empty";
  else if (state.deadline.trim() === "")
    message = "Deadline date not entered please select a valid date";
  else if (new Date(state.deadline) < new Date()) {
    message = "Invalid Deadline, deadline must be today or a later date.";
  } else if (state.price < 0)
    message = "Invalid Price for task, it can only be 0 or positive";
  else if (state.Repetitions < 0)
    message =
      "Invalid value for repetitions there should 0 or more repetitions";
  else return [false, message];
  return [true, message];
};

export default validateForm;
