import axios from "axios";

//Const
const dataInitial = {
  lastChapter: [],
  seriesData: [],
  moviesData: [],
  details: {},
  chapter: {},
  names: {},
  rol: {},
};

//API URL
const baseUrl = "https://us-central1-koonga.cloudfunctions.net/api";

//Types

//Gets
const GET_SERIES = "GET_SERIES";
const GET_ALL_SERIES = "GET_ALL_SERIES";
const GET_ALL_MOVIES = "GET_ALL_MOVIES";
const GET_DETAILS = "GET_DETAILS";
const GET_CHAPTER = "GET_CHAPTER";
const GET_SEARCH = "GET_SEARCH";

//Set
const SET_ROL = "SET_ROL";

//Reducer
export default function seriesReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_SERIES:
      return { ...state, lastChapter: action.payload };
    case GET_ALL_SERIES:
      return { ...state, seriesData: action.payload };
    case GET_ALL_MOVIES:
      return { ...state, moviesData: action.payload };
    case GET_DETAILS:
      return { ...state, details: action.payload };
    case GET_CHAPTER:
      return { ...state, chapter: action.payload };
    case GET_SEARCH:
      return { ...state, names: action.payload };
    case SET_ROL:
      return { ...state, rol: action.payload };
    default:
      return state;
  }
}

//Actions
export const getSeries = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${baseUrl}/last/get`);
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
    const res = await axios.get(`${baseUrl}/getApi/getSerie`);
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
    const res = await axios.get(`${baseUrl}/getApi/getSerie/${id}`);
    dispatch({
      type: GET_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_DETAILS,
      payload: { error: "Ha ocurrido un error." },
    });
    console.log(error);
  }
};

export const cleanDetails = () => (dispatch, getState) => {
  dispatch({
    type: GET_DETAILS,
    payload: {},
  });
};

export const getChapter = (id, num) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${baseUrl}/chapter/get/${id}/${num}`);
    dispatch({
      type: GET_CHAPTER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAPTER,
      payload: { error: "Ha ocurrido un error." },
    });
    console.log(error);
  }
};

export const cleanChapter = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHAPTER,
    payload: {},
  });
};

export const getSearch = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${baseUrl}/serie/name`);
    dispatch({
      type: GET_SEARCH,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMovies = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${baseUrl}/getApi/getSerie`);
    var movies = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].type === "Película") {
        movies.push(res.data[i]);
      }
    }
    dispatch({
      type: GET_ALL_MOVIES,
      payload: movies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setRol = (rol) => (dispatch, getState) => {
  dispatch({
    type: SET_ROL,
    payload: { rol },
  });
};
