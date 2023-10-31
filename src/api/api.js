import axios from "axios";

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

/*const options = {
  method: "GET",
  params: {
    bl_latitude: "33.463854",
    tr_latitude: "33.519776",
    bl_longitude: "126.541633",
    tr_longitude: "126.456661",
    bl_latitude: bounds.bl_latitude,
    tr_latitude: bounds.tr_latitude,
    bl_longitude: bounds.bl_longitude,
    tr_longitude: bounds.tr_longitude,
  },
  headers: {
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    "X-RapidAPI-Key": "3daf7d8310mshca433694e4f186fp17228cjsn02d7f4abb32d",
  },
};*/

export const getPlacesData = async (bounds) => {
  try {
    const options = {
      method: "GET",
      params: {
        /*bl_latitude: "33.463854",
    tr_latitude: "33.519776",
    bl_longitude: "126.541633",
    tr_longitude: "126.456661",*/
        bl_latitude: bounds.bl_latitude,
        tr_latitude: bounds.tr_latitude,
        bl_longitude: bounds.bl_longitude,
        tr_longitude: bounds.tr_longitude,
      },
      headers: {
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": "3daf7d8310mshca433694e4f186fp17228cjsn02d7f4abb32d",
      },
    };
    const { data } = await axios.get(URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};
