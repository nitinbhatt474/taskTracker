const validateForm = (state) => {
  let message = "";
  if (state.taskName === "" || !state.taskName)
    message = "Task Name cannot be empty";
  else if (!state.taskDeadline)
    message = "Deadline date not entered please select a valid date";
  else if (new Date(state.taskDeadline) < new Date()) {
    message = "Invalid Deadline, deadline must be today or a later date.";
  } else if (state.taskPrice < 0 || state.taskPrice === null)
    message = "Invalid Price for task, it can only be 0 or positive";
  else if (state.taskRepetitions < 0 || state.taskRepetitions === null)
    message =
      "Invalid value for repetitions there should 0 or more repetitions";
  else return [false, message];
  return [true, message];
};

export default validateForm;
