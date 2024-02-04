import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

//importing components
import Auth from './Auth'
import Account from './Account'
import Navbar from './components/Navbar'
import Schedule from './components/Schedule'
import Learner from './components/Learner'
import Planner from './components/Planner'



//react routing
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App()
{
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) =>
        {
            setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) =>
        {
            setSession(session)
        })
    }, [])

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Login session={ session }/>}/>
                <Route exact path="/schedule" element={<Schedule />}/>
                <Route exact path="/learner" element={<Learner />} />
				<Route exact path="/planner" element={<Planner />} />
                
                
                {/* <Route exact path="/" element={<Account key={ session.user.id } session={ session} />}/> */}
                
                

            </Routes>
        </BrowserRouter>
        
    )
}

function Login( props )
{
    return(
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!props.session ? <Auth /> : <Account key={ props.session.user.id } session={ props.session} />}
        </div>
    )

}

export default App;