import axios from "axios";

export const GET = (query: string, callBack: (response: unknown) => void) =>
  axios
    .get(query)
    .then((response) => callBack(response))
    .catch((err) => err);

export const apiGenerateQuestions = (
  queryString: string,
  callBack: () => void
) => GET(queryString, callBack);
