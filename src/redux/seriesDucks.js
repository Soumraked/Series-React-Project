import axios from "axios";

//Const
const dataInitial = {
  lastChapter: [],
  seriesData: [],
  details: {},
};

//Types
const GET_SERIES = "GET_SERIES";
const GET_ALL_SERIES = "GET_ALL_SERIES";
const GET_DETAILS = "GET_DETAILS";

//Reducer
export default function seriesReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_SERIES:
      return { ...state, lastChapter: action.payload };
    case GET_ALL_SERIES:
      return { ...state, seriesData: action.payload };
    case GET_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
}

//Actions
export const getSeries = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      "https://us-central1-monosotakos.cloudfunctions.net/api/last/get"
    );
    dispatch({
      type: GET_SERIES,
      payload: res.data.slice(0, 24),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllSeries = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      "https://us-central1-monosotakos.cloudfunctions.net/api/getApi/getSerie"
    );
    dispatch({
      type: GET_ALL_SERIES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `https://us-central1-monosotakos.cloudfunctions.net/api/getApi/getSerie/${id}`
    );
    dispatch({
      type: GET_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
