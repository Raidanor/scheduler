import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function Avatar( { url, size, onUpload })
{
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    

    //check to see if user is already logged in
    //const user = supabase.auth.user()

    useEffect( () => 
    {
        if (url)
        {
            downloadImage(url)
        }
    }, [url])

    async function downloadImage(path)
    {
        try
        {
            //for some reason this function does not work
            //avatar image cannot be displayed thus
            const { data, error } = await supabase.from('avatars').download(path)

            if (error)
            {
                throw(error)
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)

        }
        catch(error)
        {
            console.log('Error downloading image: ', error.message)
        }
    }
    async function uploadAvatar(event)
    {
        try
        {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0 )
            {
                throw new Error("You mustt select an image to upload")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError)
                throw uploadError

            onUpload(event, filePath)
        }
        catch(error)
        {
            alert(error.message)
        }
        finally
        {
            setUploading(false)
        }
    }

    return(
        <div>
            { avatarUrl ? (
                <img 
                    src = { avatarUrl }
                    alt = "Avatar"
                    className='avatar image'
                    style = {{height: size, width: size}}
                />
                )
                :
                (
                    <div className='avatar no-image' style = {{height: size, width: size}} />
                )
            }

            <div style={{ width: size}} >
                <label className='button primary block' htmlFor='single'>
                    { uploading ? "Uploading ... " : "Upload"}
                </label>
                <input 
                    style = 
                    {{
                        visibility: "hidden",
                        position: "absolute"
                    }}
                    type='file'
                    id='single'
                    accept='image/'
                    onChange={ uploadAvatar }
                    disabled={ uploading }
                />
            </div>

        </div>
    )
}