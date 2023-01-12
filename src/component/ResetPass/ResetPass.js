import './ResetPass.scss';
import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import axios from 'axios';

function ResetPass() {
    const [email, setEmail] = useState('')
    const [newPass, setNewPass] = useState('')


    const resetPass = () => {

        const token = localStorage.getItem("token");

        axios.post('http://localhost:4000/resetpass', {
            email: email
        }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(function (res) {

                if (res.data == 'Email error') {
                    document.querySelector('.notification').style.display = 'block'
                    document.querySelector('.notification_child').style.border = '4px solid red'
                    document.querySelector('.notification p').innerHTML = res.data + ' !! ';

                    let body = document.querySelector('body');
                    body.onclick = () => {
                        document.querySelector('.notification').style.display = 'none';
                    };

                }
                else {
                    document.querySelector('.copy_pass').style.display = 'block'
                    document.querySelector('.copy_pass_child').style.border = '4px solid green'
                    document.querySelector('.copy_pass p').innerHTML = 'Password : ' + res.data;
                    document.querySelector('.copy_pass button').style.backgroundColor = 'green'
                    setNewPass(res.data)
                }


            })
            .catch(function (err) {
                console.log(err);

            });
    }

    const handleCloseNotification = () => {
        document.querySelector('.notification').style.display = 'none'
    }

    const handleCopyPass = () => {
        document.querySelector('.copy_pass').style.display = 'none'

        navigator.clipboard.writeText(newPass).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <div>
            <Header />
            <div className='form_reset'>

                <div className='form'>
                    <h1>Reset Password</h1>
                    <p>
                        Enter email to reset your password
                    </p>
                    <span>Email:</span> <br></br>
                    <input
                        onChange={e => { setEmail(e.target.value) }}
                        value={email}
                        placeholder='Enter email'
                    />
                    <br></br>

                    {email == '' ? (
                        <button style={{ backgroundColor: 'gray' }}>RESET PASSWORD</button>
                    ) : (
                        <button onClick={resetPass}>RESET PASSWORD</button>
                    )}


                </div>

                <div className='notification'>
                    <div className='notification_child'>
                        <p></p> <br></br>
                        <button onClick={handleCloseNotification}>Close</button>
                    </div>
                </div>

                <div className='copy_pass'>
                    <div className='copy_pass_child'>
                        <p></p> <br></br>
                        <button onClick={handleCopyPass}>Copy</button>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default ResetPass