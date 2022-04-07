import moment from "moment";

const createLog = (type, ...messages) => {
  const now = Date.now();
  const pre = `[${type}][${moment(now).format("YYYY-MM-DD HH:mm:ss")}]`;
  type === "LOG" && console.log(pre, ...messages);
  type === "ERR" && console.error(pre, ...messages);
};

global.log = (...messages) => {
  createLog("LOG", ...messages);
};
global.err = (...messages) => {
  createLog("ERR", ...messages);
};

export const seconds = 1000;
export const minutes = 1000 * 60;
export const hours = 1000 * 60 * 60;
