import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = (props) => {

    const { user } = props

    const [info, setInfo] = useState('');
    
    useEffect(() => {
        axios.get(user.url)
            .then((response) => {
                setInfo(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [user.login]);

    const formattedDate = new Date(info.updated_at).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Santiago',
            hour: 'numeric',
            minute: 'numeric'
        }
    )

    return (
        <div className='user-card'>
            <div className='user-card-header'>
                <img src={user.avatar_url} alt={user.name}/>
                <a href={user.html_url}>{user.login}</a>
                <span>{info.name}</span>
            </div>
            <div className='user-card-body'>
                <p className='bio'>{info.bio}</p>
                <div className="info">
                    <p><i className="far fa-user"></i>{info.followers} followers</p>
                    <p><i className="far fa-arrow-alt-circle-right"></i>{info.following} following</p>
                    <p><i className="far fa-bookmark"></i>{info.public_repos} public repos</p>
                </div>
                <p className='date'>Updated at {formattedDate}</p>
            </div>
        </div>
    );
}

export default UserCard;
