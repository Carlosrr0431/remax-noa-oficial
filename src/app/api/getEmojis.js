import axios from "axios";

const url =
  "https://emoji-api.com/emojis?access_key=71d3c4edde8e2a3d4c3dfcdcf8a22caa52044664";

export const getEmojis = async () => {
  try {
    const resp = await axios.get(
      "https://emoji-api.com/emojis?access_key=71d3c4edde8e2a3d4c3dfcdcf8a22caa52044664"
    );

    return JSON.stringify(await resp.data)
  } catch (error) {}
};