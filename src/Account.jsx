import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './Avatar'

export default function Account({ session })
{
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [full_name, setFullname] = useState(null)
    const [website, setWebsite] = useState(null)
    const [mobile_number, setMobile_number] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        let ignore = false
        async function getProfile() {
        setLoading(true)
        const { user } = session

        const { data, error } = await supabase
            .from('profiles')
            .select(`username, website, full_name, avatar_url, mobile_number`)
            .eq('id', user.id)
            .single()

        if (!ignore) {
            if (error)
                console.warn(error)
            else if (data)
            {
                setUsername(data.username)
                setFullname(data.full_name)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
                setMobile_number(data.mobile_number)
            }
        }

        setLoading(false)
        }

        getProfile()

        return () => 
        {
            ignore = true
        }
    }, [session])

    async function updateProfile(event, avatarUrl)
    {
        event.preventDefault()

        setLoading(true)
        const { user } = session

        const updates = 
        {
            id: user.id,
            username,
            website,
            full_name,
            avatar_url,
            mobile_number,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) 
            alert(error.message)
        else
            setAvatarUrl(avatarUrl)
        
        setLoading(false)
    }

    return (
        <form onSubmit={updateProfile} className="form-widget">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                    updateProfile(event, url)
                }}
            />
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={session.user.email} disabled />
            </div>

            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username || ''}
                    placeholder='Must be unique'
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="full_name">Name</label>
                <input
                    id="full_name"
                    type="text"
                    required
                    value={full_name || ''}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="text"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                    id="mobile_number"
                    type="int"
                    value={mobile_number || ''}
                    required
                    placeholder = '11122223333(No dashes)'
                    onChange={(e) => setMobile_number(e.target.value)}
                />
            </div>

            <div>
                <button className="button block primary" type="submit" disabled={loading}>
                {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
                Sign Out
                </button>
            </div>
        </form>
    )
}