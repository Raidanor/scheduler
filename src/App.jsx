import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'

//react ronuting
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
            <Routes>
                <Route exact path="/" element={<LoginBar session={ session }/>}/>
                {/* <Route exact path="/" element={<Account key={ session.user.id } session={ session} />}/> */}
                
                


            </Routes>
            
        </BrowserRouter>
        
    )
}

function LoginBar( props )
{
    return(
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!props.session ? <Auth /> : <Account key={ props.session.user.id } session={ props.session} />}
        </div>
    )

}

export default App;