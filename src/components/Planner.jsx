import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Select from 'react-select';

function Planner( { session } )
{
	const [usernameList, setUsernameList] = useState([]);
	const [detail, setDetail] = useState('');
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [selectedEmployees, setSelectedEmployees] = useState([]);

	useEffect(() => {
		async function getUsernames()
        {
			const { data, error } = await supabase
			.from('profiles')
			.select('id, username')

			if (error) 
            {
				console.error('Error fetching usernames', error);
				// return [];
			}
            else
            {
				const formattedData = data.map(user => ({
                    value: user.username,
                    label: user.username
                }));
                setUsernameList(formattedData);
            }
		}

		getUsernames();
	}, [])

	async function handleSubmit(e)
    {
		e.preventDefault();
	
		const usernames = selectedEmployees.map(employee => employee.value);
		console.log("usernames: ", usernames);
		const { data, error } = await supabase
			.from('events')
			.insert([
				{
					title: title,
					detail: detail,
					date: date,
					start_time: startTime,
					end_time: endTime,
					usernames: usernames
				},
			]);
	
		if (error){
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

	const customStyles = {
		option: (provided) => ({
		  ...provided,
		  color: 'black',
		}),
	};
	
    // geting the id of the signed in user
    const { user } = session

    //currently the user id is hardcoded
    // i should change this as this is very bad security
    // add to the env file and reead from there
    // could add tthem in array format as well and have multiple users have admin/upper level priviledges

	return(
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
					<Select
						isMulti
						name="employees"
						options={usernameList}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={(selectedOptions) => setSelectedEmployees(selectedOptions)}
						value={selectedEmployees}
						styles={customStyles}
					/>
				</div>
				<button type="submit" className="btn btn-primary mt-5">Assign</button>
			</form>
		</div>
	)

	/*
	return (user.id === "af37dc6f-0dfd-4f03-9b9f-ab4d05aec493") ? (     // this is just a very long ternary operator. I may factorise this later to make it more readable
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

                        // to enable selection of multiple options
                        // multiple = "multiple"
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
	)
    :
    (
        <div>
            You do not have permission to access this page
        </div>
    )*/
};

export default Planner;
