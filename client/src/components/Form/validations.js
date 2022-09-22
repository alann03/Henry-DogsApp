// -----------------Validations---------------------
const validate = (input, allDogs) => {
	const errors = {};

	// ---name---
	if (input.name) {
		if (!/^[a-zA-ZñÑ ]+$/.test(input.name))
			errors.name = "Name cannot contain numbers or special characters.";
		else if (!/^[\s\S]{2,20}$/.test(input.name))
			errors.name = "The name must contain between 2 and 20 characters.";
		else if (
			allDogs.find(
				dog =>
					dog.name === input.name[0].toUpperCase() + input.name.substring(1),
			)
		)
			errors.name = "There is already a dog with that name.";
	} else errors.name = "Name is required.";

	// --weigth--
	if (input.min_weight && input.max_weight) {
		if (isNaN(input.min_weight) || isNaN(input.max_weight))
			errors.weight = "Values must be numbers.";
		else if (
			Number(input.min_weight) < 1 ||
			Number(input.min_weight) > 100 ||
			Number(input.max_weight) < 1 ||
			Number(input.max_weight) > 100
		)
			errors.weight = "Insert values between 1 and 100.";
		else if (input.max_weight === input.min_weight)
			errors.weight = "Values cannot be equal.";
		else if (Number(input.max_weight) < Number(input.min_weight))
			errors.weight = "Min value cannot be greater than the max.";
	} else {
		if (!input.min_weight && !input.max_weight)
			errors.weight = "Weight values are required.";
		if (input.min_weight && !input.max_weight)
			errors.weight = "Max weight is required.";
		if (!input.min_weight && input.max_weight)
			errors.weight = "Min weight is required.";
	}

	// --heigth--
	if (input.min_height && input.max_height) {
		if (isNaN(input.min_height) || isNaN(input.max_height))
			errors.height = "Values must be numbers.";
		else if (
			Number(input.min_height) < 1 ||
			Number(input.min_height) > 100 ||
			Number(input.max_height) < 1 ||
			Number(input.max_height) > 100
		)
			errors.height = "Insert values between 1 and 100.";
		else if (input.max_height === input.min_height)
			errors.height = "Values cannot be equal.";
		else if (Number(input.max_height) < Number(input.min_height))
			errors.height = "Min value cannot be greater than the max.";
	} else {
		if (!input.min_height && !input.max_height)
			errors.height = "Height values are required.";
		if (input.min_height && !input.max_height)
			errors.height = "Max height is required.";
		if (!input.min_height && input.max_height)
			errors.height = "Min height is required.";
	}

	// -lifespan-
	if (input.min_life_span && input.max_life_span) {
		if (isNaN(input.min_life_span) || isNaN(input.max_life_span))
			errors.life_span = "Values must be numbers.";
		else if (
			Number(input.min_life_span) < 1 ||
			Number(input.min_life_span) > 20 ||
			Number(input.max_life_span) < 1 ||
			Number(input.max_life_span) > 20
		)
			errors.life_span = "Insert values between 1 and 20.";
		else if (input.min_life_span === input.max_life_span)
			errors.life_span = "Values cannot be equal.";
		else if (Number(input.max_life_span) < Number(input.min_life_span))
			errors.life_span = "Min value cannot be greater than the max.";
	} else if (input.min_life_span) {
		if (Number(input.min_life_span) < 1 || Number(input.min_life_span) > 20)
			errors.life_span = "Insert values between 1 and 20.";
	} else if (input.max_life_span) {
		if (Number(input.max_life_span) < 1 || Number(input.max_life_span) > 20)
			errors.life_span = "Insert values between 1 and 20.";
	}

	// --image--
	if (input.image) {
		if (
			!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(
				input.image,
			)
		)
			errors.image = "Enter a valid image URL. 'example: http://example.com'";
	}

	// --temps--
	if (!input.temperaments.length)
		errors.temperaments = "At least one temperament is required.";
	else if (input.temperaments.length > 6)
		errors.temperaments = `The dog cannot have more than 6 temperaments. Please remove ${
			input.temperaments.length - 6
		} temperaments.`;

	return errors;
};

export default validate;
