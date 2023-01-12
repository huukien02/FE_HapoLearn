import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

import axios from 'axios'

function Signup() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const handleSignup = () => {
        if (userName == '' || email == '' || password == '' || confirm == '') {
            alert('Không để trống')
        }
        else {
            if (confirm != password) {
                alert('Xác nhận lại mật khẩu')
            }
            else {
                if (userName.length <= 5 || email.length <= 5) {
                    alert('Lớn hơn 5 kí tự')
                }
                else {
                    axios.post('http://localhost:4000/signup', {
                        email: email,
                        password: password,
                        username: userName
                    })
                        .then(function (response) {
                            console.log(response);
                            alert(response.data)
                            window.location = '/'

                        })
                        .catch(function (error) {
                            console.log(error);
                            alert(error.response.data)
                        });
                }
            }
        }
    }


    return (

        <div>
            <Header />
            <div className='form'>

                <div className='Form_Login'>
                    <h1>Sign up to HapoLearn</h1>
                    <p>Username</p>
                    <input
                        placeholder='Enter username'
                        value={userName}
                        onChange={e => { setUserName(e.target.value) }}
                    />
                    <p>Email</p>
                    <input
                        placeholder='Enter email'
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <p>Password</p>
                    <input
                        type={'password'}
                        placeholder='Enter password'
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <p>Confirm Password</p>
                    <input
                        type={'password'}
                        placeholder='Confirm password'
                        value={confirm}
                        onChange={e => { setConfirm(e.target.value) }}
                    />
                    <br></br>
                    <br></br>
                    <br></br>

                    {userName == '' || email == '' || password == '' || confirm == '' ? (
                        <button style={{ backgroundColor: 'gray' }} className='create'>
                            <span>Sign up</span>
                        </button>
                    ) : (
                        <button onClick={handleSignup} className='create'>
                            <span>Sign up</span>
                        </button>
                    )}

                </div>

            </div>
            <Footer />

        </div >
    )
}

export default Signup