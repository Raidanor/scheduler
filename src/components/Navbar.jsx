import { Link } from "react-router-dom"

function Navbar()
{
    return(

        <>
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Database Scheduler</a>

                <div className="collapse navbar-collapse">
                
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to="/">Home</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to="/Schedule">Schedule</Link></a>
                        </li>
                        
                    </ul>
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
            </nav>
        </>
    )
}

export default Navbar;