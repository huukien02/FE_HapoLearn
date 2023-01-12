import './Profile.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'
import { useHistory } from "react-router-dom";

function Profile() {
    const [data, setData] = useState([])


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [about, setAbout] = useState('')

    const [listCourses, setListCourses] = useState('')

    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`http://localhost:4000/joincourses/detail/join`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setListCourses(res.data)).catch(err => {
            console.log(err);
        })
    }, [])



    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`http://localhost:4000/api/listusers`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setData(res.data)).catch(err => {
            console.log(err);
        })
    }, [])

    const handleEdit = () => {
        let token = localStorage.getItem("token");

        if (name == '' || email == '' || date == '' || phone == '' || address == '' || about == '') {
            alert('Không được bỏ trống')
        }
        else {
            axios.put('http://localhost:4000/edit/profile', {
                // id: id,
                name: name,
                email: email,
                date: date,
                phone: phone,
                address: address,
                about: about
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(function (response) {
                    console.log(response);
                    alert(response.data)
                    window.location.reload();


                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }

    const handleLogout = () => {
        if (window.confirm("Bạn muốn đăng xuất")) {
            localStorage.removeItem("token");
            window.location.reload(false);
        }
    }


    if (data.message) {
        let body = document.querySelector('body');
        body.onclick = () => {
            window.location = '/';
        };
    }





    return (
        <>
            {data.length > 0 ? (
                <div>
                    <Header />
                    <div style={{ fontFamily: "Open Sans" }} className='form_profile'>

                        <div className='left'>
                            <img onClick={handleLogout} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png' />
                            <h1 className='name'>{data[0].name != '' ? (data[0].name) : ('')}</h1>
                            <p className='email'>{data[0].email != '' ? (data[0].email) : ('')}</p>

                            <p className='date'>
                                <i className="fa-solid fa-cake-candles"></i> {data[0].date != '' ? (data[0].date) : ('')}
                            </p>
                            <p className='phone'>
                                <i className="fa-solid fa-phone"></i> {data[0].phone != '' ? (data[0].phone) : ('')}
                            </p>
                            <p className='home'>
                                <i className="fa-solid fa-house"></i>{data[0].address != '' ? (data[0].address) : ('')}
                            </p>
                            <p>
                                {data[0].about != '' ? (data[0].about) : ('')}
                            </p>

                        </div>

                        <div className='right'>

                            <div className='My_courses'>
                                <h1>My courses</h1>
                                <p className='line'></p>
                                <div className='list_courses'>
                                    {listCourses ? (
                                        listCourses.map((item, idex) => {
                                            return (
                                                <div className='item'>
                                                    <img src={item.imgCourses} />
                                                    <p>{item.nameCourses}</p>
                                                </div>
                                            )
                                        })
                                    ) : ('')}

                                </div>
                            </div>

                            <div className='edit_profile'>
                                <h1>Edit Profile</h1>
                                <p className='line'></p>
                                <div className='list_input'>
                                    <div>
                                        <p>Name:</p>
                                        <input
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Email:</p>
                                        <input
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Date of birthday:</p>
                                        <input type={'date'}
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <input
                                            placeholder='Enter phone'
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <input
                                            placeholder='Enter Address'
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>About me:</p>
                                        <textarea
                                            placeholder='Enter about'
                                            value={about}
                                            onChange={e => setAbout(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button onClick={handleEdit}>
                                    Update
                                </button>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </div>
            ) : (
                <div>
                    <NotFound />
                </div>
            )}

        </>
    )
}

export default Profile