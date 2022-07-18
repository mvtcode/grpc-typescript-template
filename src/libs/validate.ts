import { Types } from "mongoose";
import { isUuid } from "uuidv4";

export const isEmail = (email: string) : boolean => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

export const isObjectId = (id: string) => {
  return Types.ObjectId.isValid(id);
};

export const isUuidV4 = (id: string) => {
  return isUuid(id);
};

export const validateText = (text: string) => {
  const regex = /^[.0-9a-zA-Z\s,-_]+$/;
  if (text.match(regex)) {
    return true;
  }
  return false;
};

export const isInt = (value: string) => {
  const regex = /^(-?[1-9]+\d*)$/;
  if (value.match(regex)) {
    return true;
  }
  return false;
};

export const isNumber = (value: string) => {
  const regex = /^(0|[1-9]\d*)(\.\d+)?$/;
  if (value.match(regex)) {
    return true;
  }
  return false;
};

export const isJsonString = (value: string) => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

export const isBoolean = (value: string) => {
  value = value.toLowerCase();
  if (value === "true" || value === "false") {
    return true;
  }
  return false;
};

export const isStripeCard = (typeCard: string) => {
  return new RegExp("^STRIPE_.+", "gi").test(typeCard);
};

export const isValidPassword = (password: string) => {
  if (!password) return false;
  // 1 lower, 1 upper, 1 number, at least 8
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  );
};
