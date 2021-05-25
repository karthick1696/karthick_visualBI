import { MONTH_NAMES } from "./constants";

export const setItem = (key = "", value = "") => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key = "") => {
  const value = localStorage.getItem(key);
  if (!value) {
    return "";
  }

  return JSON.parse(value);
};

const padValue = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const formatDate = (date) => {
  date = date ? new Date(date) : new Date();
  if (`${date}` === "Invalid Date") {
    return "";
  }

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const minute = padValue(date.getMinutes());

  let hour = date.getHours();
  let meridian = "AM";

  const hourCheck = parseInt(hour);

  if (hourCheck > 12) {
    meridian = "PM";
    hour = hourCheck - 12;
  } else if (hourCheck === 0) {
    hour = "12";
  }

  hour = padValue(hour);

  return `${MONTH_NAMES[monthIndex]} ${
    day < 10 ? `0${day}` : day
  }, ${year} ${hour}:${minute} ${meridian}`;
};
