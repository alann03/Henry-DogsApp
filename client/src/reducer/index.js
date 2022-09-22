import {
	GET_DOGS,
	GET_TEMPERAMENTS,
	FILTER_BY_CREATED,
	FILTER_BY_TEMPERAMENT,
	ALPHABETICAL_ORDER,
	ORDER_BY_WEIGHT,
	GET_BY_NAME,
	POST_DOG,
	GET_DETAIL,
	CLEAR_DETAIL,
	DELETE_DOG,
} from "../actions/action-types";

const initialState = {
	allDogs: [],
	dogs: [],
	temperaments: [],
	detail: {},
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_DOGS:
			return {
				...state,
				allDogs: action.payload,
				dogs: action.payload,
			};
		case GET_TEMPERAMENTS:
			return {
				...state,
				temperaments: action.payload,
			};
		case GET_BY_NAME:
			return {
				...state,
				dogs: action.payload,
			};
		case POST_DOG:
			return {
				...state,
			};
		case GET_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case CLEAR_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case ALPHABETICAL_ORDER:
			const alphabeticalSorted =
				action.payload === "asc"
					? state.dogs.sort((a, b) => {
							if (a.name > b.name) return 1;
							if (a.name < b.name) return -1;
							return 0;
					  })
					: state.dogs.sort((a, b) => {
							if (a.name > b.name) return -1;
							if (a.name < b.name) return 1;
							return 0;
					  });
			return {
				...state,
				dogs: alphabeticalSorted,
			};
		case ORDER_BY_WEIGHT:
			const weightSorted =
				action.payload === "asc"
					? state.dogs.sort(
							(a, b) => a.weight.split(" - ")[0] - b.weight.split(" - ")[0]
					  )
					: state.dogs.sort(
							(a, b) => b.weight.split(" - ")[0] - a.weight.split(" - ")[0]
					  );
			return {
				...state,
				dogs: weightSorted,
			};
		case FILTER_BY_CREATED:
			const allDogs = state.allDogs;
			let filteredDogs = allDogs;
			if (action.payload === "db")
				filteredDogs = allDogs.filter(dog => typeof dog.id === "string");
			if (action.payload === "api")
				filteredDogs = allDogs.filter(dog => typeof dog.id === "number");
			return {
				...state,
				dogs: filteredDogs.length ? filteredDogs : "Not found",
			};
		case FILTER_BY_TEMPERAMENT:
			const allDogsTemps = state.allDogs;
			const filteredDogsTemps =
				action.payload === "All"
					? allDogsTemps
					: allDogsTemps.filter(dog =>
							dog.Temperaments?.map(temp => temp.name).includes(action.payload)
					  );
			return {
				...state,
				dogs: filteredDogsTemps,
			};
		default:
			return { ...state };
	}
}

export default rootReducer;
