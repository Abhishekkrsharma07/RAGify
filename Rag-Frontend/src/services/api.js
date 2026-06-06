const BASE_URL = "http://localhost:5000";

export const uploadPDF = async (formData) => {
  return fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
};

export const askAI = async (question) => {
  return fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
};