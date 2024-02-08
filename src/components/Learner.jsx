import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Learner()
{
    const [year, setYear] = useState([]);
    const [school, setSchool] = useState([]);
    
    const [fetchError, setFetchError] = useState(null);

    const [found, setFound] = useState(false)

    //fires getYear2020 when component is loaded
    useEffect( () => { getYear2020() }, [])

    async function getYear2020()
    {
        const { data, error } = await supabase
            .from('test')
            .select('firstname, lastname, school')
            .eq('yearofbirth', 2020)

        if (error)
        {
            setYear(null)
            setFetchError("Could not fetch data")

            console.log(error)
        }
        if (data)
        {
            setYear(data)
            setFetchError(null)

            console.log("data set!! year")
        }
    }

    //fires getSchoolAcademy when component is loaded
    useEffect( () => { getSchoolAcademy() }, [])

    async function getSchoolAcademy()
    {
        var temp = 'crime university'
        const { data, error } = await supabase
            .from('test')
            .select('firstname, yearofbirth')
            .eq('school', temp)
            

        if (error)
        {
            setSchool(null)
            setFetchError("Could not fetch data")

            console.log(error)
        }
        if (data)
        {
            setSchool(data)
            setFetchError(null)

            console.log("data set crime!!")
        }
    }

// --------------------------------------------------------------------------------------------------------------------------------------------------------

    return(
        <>
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="border m-2 col-6">
                        <div>
                            This list contains the firstname, lastname and school of everyone who was born in the year 2020
                        </div>

                        {/* outputs the list of year */}
                        {fetchError && (<p>{fetchError}</p>)}
                        {year &&
                            <>
                                <div className="container-fluid">
                                    <ul>
                                        {/* javascript .map function */}
                                        {year.map(record => 
                                            <li>
                                                {record.firstname} &nbsp;
                                                {record.lastname} &nbsp;
                                                {record.school}
                                                
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        }
                    </div>

                    <div className="col-6 border m-2">
                        <div>
                            This list contains the firstname and yearofbirth of everyone goes to crime university
                        </div>

                        {/* outputs the list of school */}
                        {fetchError && (<p>{fetchError}</p>)}
                        {school &&
                            <>
                                <div className="container-fluid">
                                    <ul>
                                        {school.map(record => 
                                            <li>
                                                {record.firstname} &nbsp;
                                                {record.yearofbirth}
                                                
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Learner