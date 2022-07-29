export const onHandleChange = (event, setData) => {
  setData(
    event.target.name,
    event.target.type === "checkbox" ? event.target.checked : event.target.value
  );
};
