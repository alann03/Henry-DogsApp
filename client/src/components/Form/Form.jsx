import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postDog, getTemperaments, getDogs } from "../../actions";
import validate from "./validations";
import NavBar from "../NavBar/NavBar";
import s from "./Form.module.css";

export default function Form() {
	const dispatch = useDispatch();
	const history = useHistory();
	const temps = useSelector(state => state.temperaments);
	const dogs = useSelector(state => state.allDogs);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: "",
		min_height: "",
		max_height: "",
		min_weight: "",
		max_weight: "",
		min_life_span: "",
		max_life_span: "",
		image: "",
		temperaments: [],
	});

	useEffect(() => {
		// lo puedo sacar
		dispatch(getTemperaments());
		dispatch(getDogs());
		setErrors(
			validate(
				{
					...input,
				},
				dogs,
			),
		);
	}, [dispatch]);

	const handleChange = e => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate(
				{
					...input,
					[e.target.name]: e.target.value,
				},
				dogs,
			),
		);
	};

	const handleSelect = e => {
		if (!input.temperaments.includes(e.target.value)) {
			setInput({
				...input,
				temperaments: [...input.temperaments, e.target.value],
			});
			setErrors(
				validate(
					{
						...input,
						temperaments: [...input.temperaments, e.target.value],
					},
					dogs,
				),
			);
		}
	};

	const handleDelete = e => {
		setInput({
			...input,
			temperaments: input.temperaments.filter(t => t !== e),
		});
		setErrors(
			validate(
				{
					...input,
					temperaments: input.temperaments.filter(t => t !== e),
				},
				dogs,
			),
		);
	};

	const handleSubmit = e => {
		e.preventDefault(e);
		if (
			input.name === "" &&
			input.min_weight === "" &&
			input.max_weight === "" &&
			input.min_height === "" &&
			input.max_height === "" &&
			!input.temperaments.length
		) {
			alert("Complete required fields");
		} else if (Object.keys(errors).length) {
			alert("Complete required fields or check for errors and try again");
		} else {
			dispatch(postDog(input));
			alert("Dog created");
			setInput({
				name: "",
				min_height: "",
				max_height: "",
				min_weight: "",
				max_weight: "",
				min_life_span: "",
				max_life_span: "",
				image: "",
				temperaments: [],
			});
			history.push("/home");
		}
	};

	return (
		<div className={s.container}>
			<NavBar />
			<form className={s.form} onSubmit={e => handleSubmit(e)}>
				<span className={s.title}>Create your dog!</span>
				<div className={s.inputs}>
					<div className={s.inputContainer}>
						<label className={s.label}>Name:</label>
						<input
							className={s.input}
							type="text"
							value={input.name}
							name="name"
							onChange={e => handleChange(e)}
							placeholder="Required"
						/>
						{errors.name && <div className={s.error}>{errors.name}</div>}
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Min Weight:</label>
						<input
							className={s.input}
							type="number"
							value={input.min_weight}
							name="min_weight"
							onChange={e => handleChange(e)}
							placeholder="Required"
						/>
						{errors.weight && <div className={s.error2}>{errors.weight}</div>}
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Max Weight:</label>
						<input
							className={s.input}
							type="number"
							value={input.max_weight}
							name="max_weight"
							onChange={e => handleChange(e)}
							placeholder="Required"
						/>
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Min Height:</label>
						<input
							className={s.input}
							type="number"
							value={input.min_height}
							name="min_height"
							onChange={e => handleChange(e)}
							placeholder="Required"
						/>
						{errors.height && <div className={s.error2}>{errors.height}</div>}
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Max Height:</label>
						<input
							className={s.input}
							type="number"
							value={input.max_height}
							name="max_height"
							onChange={e => handleChange(e)}
							placeholder="Required"
						/>
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Min Life Span:</label>
						<input
							className={s.input}
							type="number"
							value={input.min_life_span}
							name="min_life_span"
							onChange={e => handleChange(e)}
						/>
						{errors.life_span && (
							<div className={s.error2}>{errors.life_span}</div>
						)}
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Max Life Span:</label>
						<input
							className={s.input}
							type="number"
							value={input.max_life_span}
							name="max_life_span"
							onChange={e => handleChange(e)}
						/>
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Image:</label>
						<input
							className={s.input}
							type="text"
							value={input.image}
							name="image"
							onChange={e => handleChange(e)}
						/>
						{errors.image && <div className={s.error}>{errors.image}</div>}
					</div>
					<div className={s.inputContainer}>
						<label className={s.label}>Temperaments:</label>
						<select className={s.select} onChange={e => handleSelect(e)}>
							<option value="" hidden>
								Required
							</option>
							{temps.map(temp => {
								return (
									<option key={temp.id} value={temp.id}>
										{temp.name}
									</option>
								);
							})}
						</select>
						{errors.temperaments && (
							<div className={s.error}>{errors.temperaments}</div>
						)}
					</div>
				</div>
				<div className={s.tempList}>
					{input.temperaments.map(inputTemp => {
						const assignedTemp = temps.find(t => t.id === Number(inputTemp));
						return (
							<span className={s.temp} key={inputTemp}>
								{`${assignedTemp.name} `}
								<button
									className={s.btnTemp}
									type="button"
									onClick={() => handleDelete(inputTemp)}
								>
									x
								</button>
							</span>
						);
					})}
				</div>
				<button className={s.btn} type="submit">
					Create
				</button>
			</form>
		</div>
	);
}
