const convertDate = (date) => {
  const inputDate = new Date(date);
  const currentDate = new Date();

  const diff = currentDate - inputDate;
  const diffInMinutes = diff / 1000 / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  let message = "";

  if (diffInMinutes < 1) {
    message = "less than 1 minute ago";
  } else if (diffInMinutes < 60) {
    message = `${Math.floor(diffInMinutes)} minutes ago`;
  } else if (diffInHours < 24) {
    message = `${Math.floor(diffInHours)} hours ago`;
  } else {
    message = `${Math.floor(diffInDays)} days ago`;
  }

  const minute = inputDate.getMinutes();
  const hour = inputDate.getHours();
  const day = inputDate.getDate();
  const wordDay = inputDate.toLocaleString("default", { weekday: "long" });
  const ampm = hour >= 12 ? "pm" : "am";

  message += ` - ( ${day} ${wordDay}  ${hour}:${minute} ${ampm} )`;
  return message;
};

export const convertDateSimple = (date) => {
  if (!date) {
    return "No date";
  }

  const inputDate = new Date(date);
  const day = inputDate.getDate();
  const monthName = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();

  let message = `${day} ${monthName}  ${year}`;
  return message;
};

export default convertDate;
