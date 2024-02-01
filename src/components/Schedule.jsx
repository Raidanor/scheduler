import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

//fullcalendar imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"

//components
//import Learner from './Learner';

function Schedule()
{

    return(
        <>
            Schedule Place holder text
            <FullCalendar
                plugins = { [ dayGridPlugin ]}
                initialView = "dayGridMonth"
                events =
                {[
                    { title: "event 1", date: "2024-02-02"},
                    { title: "event 1", date: "2024-02-03"},
                    { title: "event 3", date: "2024-02-04"}
                    
                ]}
                eventContent = { renderEventContent }
            />
            
        </>
    )
}

function renderEventContent(eventInfo)
{
    return(
        <>
            <b>{ eventInfo.timeText }</b>
            <i>{ eventInfo.event.title }</i>
            
        </>
    )
}


export default Schedule;