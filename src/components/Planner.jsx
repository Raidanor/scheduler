import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Select from 'react-select';
import { list } from "../adminList"
import NoPermission from './NoPermission';


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

    function getUserId()
    {
        // geting the id of the signed in user
        const { user } = session

        const adminList =   
        [
            "dc1a0207-c86f-43da-bee9-019c27352b0a",
            "255710a3-c965-437a-bc6b-03bbbd2b47df",
            "af37dc6f-0dfd-4f03-9b9f-ab4d05aec493",
            "ef1ebf8d-f25b-4030-8e81-d3e574f5128b"
        ]
        const valid = adminList.includes(user.id)

        return valid
    }

	return( getUserId() ? (
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
        :
        ( <NoPermission /> )
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
