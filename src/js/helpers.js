import { TIMEOUT_REQUEST_SECONDS } from "./config.js";

const timeout = (seconds) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000);
  });
};

export const AJAX = async (URL, uploadData = undefined) => {
  try {
    const fetchFunction = uploadData
      ? fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        })
      : fetch(URL);
    const res = await Promise.race([
      fetchFunction,
      timeout(TIMEOUT_REQUEST_SECONDS),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
};
