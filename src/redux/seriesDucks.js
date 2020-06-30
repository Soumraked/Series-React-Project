import axios from "axios";

//Const
const dataInitial = {
  array: [],
};

//Types
const GET_SERIES = "GET_SERIES";

//Reducer
export default function seriesReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_SERIES:
      return { ...state, array: action.payload };
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
