import axios from "axios";

import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	FILTER_BY_CREATED,
	FILTER_BY_TEMPERAMENT,
	SORT,
	GET_BY_NAME,
	GET_DETAIL,
	CLEAR_DETAIL,
} from "./action-types";

export function getDogs() {
	return async function (dispatch) {
		const results = await axios.get("/dogs");
		return dispatch({
			type: GET_DOGS,
			payload: results.data,
		});
	};
}

export function getTemperaments() {
	return function (dispatch) {
		return axios.get("/temperaments").then(results => {
			dispatch({ type: GET_TEMPERAMENTS, payload: results.data });
		});
	};
}

export function getDogsByName(name) {
	return async function (dispatch) {
		const results = await axios.get(`/dogs?name=${name}`);
		return dispatch({
			type: GET_BY_NAME,
			payload: results.data,
		});
	};
}

export function getDetail(id) {
	return async function (dispatch) {
		const results = await axios.get(`/dogs/${id}`);
		return dispatch({
			type: GET_DETAIL,
			payload: results.data,
		});
	};
}

export function clearDetail() {
	return {
		type: CLEAR_DETAIL,
		payload: {},
	};
}

// --------------------Sort----------------------
export function sort(payload) {
	return {
		type: SORT,
		payload,
	};
}

// ----------------------------------------------

// ------------------Filters---------------------
export function filterByCreated(payload) {
	return {
		type: FILTER_BY_CREATED,
		payload,
	};
}

export function filterByTemperament(payload) {
	return {
		type: FILTER_BY_TEMPERAMENT,
		payload,
	};
}
// ----------------------------------------------
