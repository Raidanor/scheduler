import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

//fullcalendar imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

//components
import Learner from './Learner';

function Schedule()
{

    return(
        <>
            Schedule Place holder text
            <Learner />

            <FullCalendar
                plugins = { [ dayGridPlugin ]}
                initialView = "dayGridMonth"
                events =
                {[
                    { title: "event 1", date: "2024-02-02"},
                    { title: "event 2", date: "2024-02-03"}
                    
                ]}
            />
            
        </>
    )
}

export default Schedule;