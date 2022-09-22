import axios from "axios";

import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	FILTER_BY_CREATED,
	FILTER_BY_TEMPERAMENT,
	ALPHABETICAL_ORDER,
	ORDER_BY_WEIGHT,
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

export function postDog(payload) {
	return async function (dispatch) {
		const results = await axios.post("/dogs", payload);
		return results;
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

export function deleteDog(id) {
	return async function (dispatch) {
		const results = await axios.get(`/dogs?id=${id}`, id);
		return results;
	};
}

export function clearDetail() {
	return {
		type: CLEAR_DETAIL,
		payload: {},
	};
}

// -------------------Orders---------------------
export function alphabeticalOrder(payload) {
	return {
		type: ALPHABETICAL_ORDER,
		payload,
	};
}

export function orderByWeight(payload) {
	return {
		type: ORDER_BY_WEIGHT,
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
