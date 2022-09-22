const axios = require("axios");
const { API_KEY } = process.env;

const apiCall = async () => {
	try {
		const dataAPI = (
			await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
		).data;
		return dataAPI;
	} catch (error) {
		console.log("ERROR in apiCall", error);
	}
};

module.exports = apiCall;
