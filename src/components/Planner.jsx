import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'

function Planner(){
	const [usernameList, setUsernameList] = useState([]);
	const [detail, setDetail] = useState('');
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [selectedEmployee, setSelectedEmployee] = useState('');

	useEffect(() => {
		async function getUsernames(){
			const { data, error } = await supabase
			.from('profiles')
			.select('id, username')

			if (error) {
				console.error('Error fetching usernames', error);
				return [];
			}
            else
            {
                setUsernameList(data);
            }
		}

		getUsernames();
	}, [])

	async function handleSubmit(e) {
		e.preventDefault();
	
		const { data, error } = await supabase
			.from('task')
			.insert([
				{
					title: title,
					detail: detail,
					date: date,
					start_time: startTime,
					end_time: endTime,
					username: selectedEmployee
				},
			]);
	
		if (error) {
		  	console.log('Error:', error.message);
		} else {
		  	console.log('Data inserted');
			alert("Added!");
			setTitle('');
			setDetail('');
			setStartTime('');
			setEndTime('');
			setDate('');
		}
	};
	

	return (
		<div className="container mt-5 col-6">
			<h2 className="mb-4">Add Shift</h2>
			<form onSubmit={ handleSubmit }>
				<div className="form-group">
					<label>Title:</label>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Detail:</label>
					<textarea
					className="form-control"
					value={detail}
					onChange={(e) => setDetail( e.target.value )}
					></textarea>
				</div>
				<div className="form-group">
					<label>Date:</label>
					<input
						type="date"
						className="form-control"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Start Time:</label>
					<input
						type="time"
						className="form-control"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>End Time:</label>
					<input
						type="time"
						className="form-control"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Employee:</label>
					<select
						className="form-control"
						value={ selectedEmployee }
						onChange={(e) => setSelectedEmployee(e.target.value)}
					>
					<option value="">Choose the employee</option>
					{usernameList.map((employee) => (
						<option key={employee.id} value={employee.username}>
							{employee.username}
						</option>
					))}
					</select>
				</div>
				<button type="submit" className="btn btn-primary mt-5">Assign</button>
			</form>
		</div>
	);
};

export default Planner;
