import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import Modal from 'react-modal';

//fullcalendar imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"

//components
//import Learner from './Learner';

//packages
import * as bootstrap from "bootstrap"

Modal.setAppElement('#root');

function Schedule( { session } )
{
    // handleDateClick = (arg) =>
    // { // bind with an arrow function
    //     alert(arg.dateStr)
    // }
	const [events, setEvents] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

	const adminList = [
	  "dc1a0207-c86f-43da-bee9-019c27352b0a",
	  "255710a3-c965-437a-bc6b-03bbbd2b47df",
	  "af37dc6f-0dfd-4f03-9b9f-ab4d05aec493",
	  "ef1ebf8d-f25b-4030-8e81-d3e574f5128b"
	];
	//console.log("session: ", session);



	useEffect(() => {
		async function getTask(){
			const { data, error } = await supabase
			.from('events')
			.select('id, title, detail, date, start_time, end_time, usernames')

			if (error) {
				console.error('Error fetching data', error);
				return [];
			}

			const formattedEvents = data.map(events => ({
				id: events.id,
				title: events.title,
				start: events.date + 'T' + events.start_time,
				end: events.date + 'T' + events.end_time,
				extendedProps: {
					detail: events.detail,
					usernames: events.usernames
				}
			}));
			//console.log(data);
	
			setEvents(formattedEvents);
			console.log("events: ", formattedEvents);

		}

		getTask();
	}, [])
/*
    const events = 
    [{
        title: "event custom",
        start: "2024-02-15T17:00:00",
        end: "2024-02-15T22:00:00",
    }]
*/
    function handleClickOnEvent( arg )
    {
        //alert("This event has been clicked")
        console.log("title is: " + arg.event.title)
    }

	
	const handleDeleteEvent = async () => {
		/*
		if (!adminList.includes(session.user.id)) {
			alert("Sorry, You don't have the permission");
			return;
		}*/
		console.log("check: ", eventToDelete);
		
		const { data, error } = await supabase
			.from("events")
			// .delete()
            .select()
			.eq('id', eventToDelete)

        console.log(data)
        console.log("event DELETED!");
        setEventToDelete(null);
		
		if (error) {
		  	alert("Error");
		} else {
			setEvents(events.filter(event => event.id !== eventToDelete));
			console.log("new events:", events);
			alert("Deleted!");
		}
		setModalIsOpen(false);
	};

	const openModalToDeleteEvent = (eventId) => {
		setEventToDelete(eventId);
		setModalIsOpen(true);
	};

    return(
        <>
            <div className="m-2 pt-4">
                <FullCalendar
                    plugins = { [ dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView = "dayGridMonth"
                    // events =
                    // {[
                    //     { title: "event 1", date: "2024-02-02"},
                    //     { title: "event 2", date: "2024-02-03"},
                    //     { title: "event 3", date: "2024-02-04"}
                        
                    // ]}
                    events = { events }
                    eventDidMount = 
                    {
                        (info) => 
                        {
							const { detail, usernames } = info.event.extendedProps;
							const content = `
								<p><strong>Detail:</strong> ${detail}</p>
								<p><strong>Assigned to:</strong> ${usernames}</p>
							`;
                            new bootstrap.Popover(info.el, 
                                {
                                    title: info.event.title,
                                    placement:"auto",
                                    trigger: "hover",
                                    customClass: "popoverStyle",
                                    content: content,
                                    html: true,
                                })
							if (adminList.includes(session.user.id)) {
								let deleteButton = document.createElement('button');
								deleteButton.innerText = 'Delete';
								deleteButton.style.marginLeft = '5px';
								deleteButton.onclick = () => openModalToDeleteEvent(info.event.id);
								info.el.append(deleteButton);
							}
                        }
                    }
                    headerToolbar = 
                    {{
                        start: "title",
                        center: "today prev,next",
                        end: "dayGridMonth, timeGridWeek timeGridDay"
                    }}

                    eventClick= { handleClickOnEvent }

                    height = {"90vh"}
                    // dateClick={handleDateClick}
                />
            </div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				contentLabel="confirm delete"
				style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						backgroundColor: '#FFF',
						color: '#000',
						padding: '20px',
						border: '1px solid #CCC',
						borderRadius: '4px',
						zIndex: 1000
					},
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.75)',
						zIndex: 999
					},
				}}
				>
				<h2>Delete</h2>
				<p>Are you sure you want to delete this event?</p>
				<button onClick={handleDeleteEvent}>Yes</button>
				<button onClick={() => setModalIsOpen(false)}>Cancel</button>
			</Modal>
        </>
    )
}




export default Schedule;