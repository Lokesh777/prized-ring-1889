import axios from "axios";
import {
  FILTER_BY_PRICE_FAILURE,
  FILTER_BY_PRICE_REQ,
  FILTER_BY_PRICE_SUCCESS,
  GET_HOTELS_FAILURE,
  GET_HOTELS_REQUEST,
  GET_HOTELS_SUCCESS,
  GET_HOTEL_DETAILS_FAILURE,
  GET_HOTEL_DETAILS_REQUEST,
  GET_HOTEL_DETAILS_SUCCESS,
} from "./typesHotelSearch";

const URL = `http://localhost:8080`;

export const getHotelAction = (city) => async (dispatch) => {
  // console.log("city:", city);
  try {
    dispatch({ type: GET_HOTELS_REQUEST });
    if (city) {
      let responseCity = await axios.get(`${URL}/hotel?city=${city}&limit=10`);
      dispatch({ type: GET_HOTELS_SUCCESS, payload: responseCity.data });
      localStorage.removeItem("searchQuery");

    } else {
      let response = await axios.get(`${URL}/hotel?limit=12`);
      dispatch({ type: GET_HOTELS_SUCCESS, payload: response.data });
    }
    // console.log("GetHotel response:", response.data);
    localStorage.removeItem("hotelBooking");

  } catch (error) {
    dispatch({ type: GET_HOTELS_FAILURE, payload: error.message });

    console.log("Error While calling get hotel API Action", error.message);
  }
};

export const getHotelDetailsAction = (id) => async (dispatch) => {
  // console.log("getHotelDetailsAction:", id);

  try {
    dispatch({ type: GET_HOTEL_DETAILS_REQUEST });

    const { data } = await axios.get(`${URL}/hotel/${id}`);
    // console.log("data:", data);

    dispatch({ type: GET_HOTEL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_HOTEL_DETAILS_FAILURE, payload: error.message });

    console.log("Error While  getting hotel Detail API Action", error.message);
  }
};

export const filterByPriceAction = (a, b) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_BY_PRICE_REQ });
    let response = await axios.get(`${URL}/hotel?limit=12`);

    if (a === 0 && b === 0) {
      dispatch({ type: FILTER_BY_PRICE_SUCCESS, payload: response.data });
    } else {
      const newData = response.data.filter((item) => {
        // console.log("item:", item.rooms[0].price);

        return item.rooms[0].price >= a && item.rooms[0].price <= b;
      });
      // console.log("newData:", newData);
      dispatch({ type: FILTER_BY_PRICE_SUCCESS, payload: newData });
    }
  } catch (error) {
    dispatch({ type: FILTER_BY_PRICE_FAILURE, payload: error.message });

    console.log("Error While calling get products API Action", error.message);
  }
};
