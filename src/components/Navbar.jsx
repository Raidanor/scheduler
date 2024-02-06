import { Link } from "react-router-dom"

function Navbar()
{
    return(

        <>
        <nav className="navbar navbar-expand-md navbar-light bg-light w-100">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-link active" aria-current="page"><Link to="/" id="home"><a>Home</a></Link></li>
                        <li className="nav-link"><Link to="/schedule">Schedule</Link></li>
                        <li className="nav-link"><Link to="/learner">Learner</Link></li>
						<li className="nav-link"><Link to="/planner">Planner</Link></li>
                        
                        {/* <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                    </ul>
                </div>
            </div>
        </nav>
            
        </>
    )
}

export default Navbar;