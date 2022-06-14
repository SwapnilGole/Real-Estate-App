import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  //! to get data--> destructuring response into "data"
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "a6d785fd5amsh07216810bb5e314p1c332djsn59961d79caaa",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
