import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

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

function Schedule()
{
    // handleDateClick = (arg) =>
    // { // bind with an arrow function
    //     alert(arg.dateStr)
    // }
	const [events, setEvents] = useState([]);

	useEffect(() => {
		async function getTask(){
			const { data, error } = await supabase
			.from('events')
			.select('id, title, detail, date, start_time, end_time, username')

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
					username: events.username
				}
			}));
			console.log(data);
	
			setEvents(formattedEvents);

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
    function handleClickOnEvent()
    {
        alert("This event has been clicked")
    }
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
							const { detail, username } = info.event.extendedProps;
							const content = `
								<p><strong>Detail:</strong> ${detail}</p>
								<p><strong>Assigned to:</strong> ${username}</p>
							`;
                            return new bootstrap.Popover(info.el, 
                                {
                                    title: info.event.title,
                                    placement:"auto",
                                    trigger: "hover",
                                    customClass: "popoverStyle",
                                    content: content,
                                    html: true,
                                })
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
            
        </>
    )
}




export default Schedule;