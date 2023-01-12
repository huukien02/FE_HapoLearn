import React, { useEffect } from 'react'
import './NotFound.scss'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='notFound'>
            <div class="loader"></div><br></br>
            <div className='form_notFound'>
                <h1>Oooops ...</h1>
                <h2>Please Login !!!!!!</h2>
                <p>
                    Go to the    <strong> <Link to='/' end >Homepage</Link></strong>
                </p>
            </div>
        </div>

    )
}
