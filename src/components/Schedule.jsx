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

function Schedule()
{
    handleDateClick = (arg) =>
    { // bind with an arrow function
        alert(arg.dateStr)
    }

    return(
        <>
            Schedule Place holder text
            <FullCalendar
                plugins = { [ dayGridPlugin, interactionPlugin]}
                initialView = "dayGridMonth"
                events =
                {[
                    { title: "event 1", date: "2024-02-02"},
                    { title: "event 2", date: "2024-02-03"},
                    { title: "event 3", date: "2024-02-04"}
                    
                ]}
                dateClick={handleDateClick}
            />
            
        </>
    )
}




export default Schedule;