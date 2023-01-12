import './DetailCourses.scss'
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Animation from '../Animation/Animation'
import imgBanner from '../../img/bannerdetail.png'
import NotFound from '../NotFound/NotFound';

function DetailCourses() {

    const [check, setCheck] = useState(true)
    const [checkJoin, setCheckJoin] = useState('')
    const [userNameCurrent, setUserNameCurrent] = useState('')
    const [cmtEdit, setCmtEdit] = useState('')

    let { id } = useParams()

    const arrStar = [1, 2, 3, 4, 5]
    let token = localStorage.getItem("token");


    const [data, setData] = useState([])
    const [dataCmt, setDataCmt] = useState([])

    const [lessons, setLessons] = useState(true)
    const [teacher, setTeacher] = useState(false)
    const [review, setReview] = useState(false)
    const [search, setSearch] = useState('')

    const [cmt, setCmt] = useState('')
    const [star, setStar] = useState(5)
    const [starEdit, setStarEdit] = useState(5)
    const [idEdit, setIdEdit] = useState('')
    const [idDelete, setIdDelete] = useState('')

    const [allCmt, setAllCmt] = useState([])
    const [pageCmt, setPageCmt] = useState(1)

    useEffect(() => {
        let token = localStorage.getItem("token");
        async function getData() {
            const res = await axios.get(`http://localhost:4000/cmt/courses/${id}/${pageCmt}`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setDataCmt(res.data)).catch(err => {
            console.log(err);
        })
    }, [pageCmt, check])

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token != null) {
            let decoded = jwt_decode(token);
            const user = decoded.username
            setUserNameCurrent(user)
        }

    }, [])

    useEffect(() => {
        let token = localStorage.getItem("token");
        async function getData() {
            const res = await axios.get(`http://localhost:4000/cmt/courses/${id}`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setAllCmt(res.data)).catch(err => {
            console.log(err);
        })

    }, [check])

    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`http://localhost:4000/api/listcourses`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setData(res.data)).catch(err => {
            console.log(err);
        })
    }, [])


    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`http://localhost:4000/joincourses/check/courses/${id}`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setCheckJoin(res.data)).catch(err => {
            console.log(err);
        })
    }, [])

    let find = data.find((item) => {
        /* Trả về data đầu tiên tìm thấy */
        return item._id == id;
    })

    const handleLessons = () => {
        setLessons(true)
        setTeacher(false)
        setReview(false)
    }

    const handleTeacher = () => {
        setLessons(false)
        setTeacher(true)
        setReview(false)
    }

    const handleReview = () => {
        setLessons(false)
        setTeacher(false)
        setReview(true)
    }

    const handleSearch = () => {
        let list = document.querySelectorAll('.item_lesson')

        for (let i = 0; i < list.length; i++) {
            if (list[i].childNodes[0].innerText.toUpperCase().includes(search.toUpperCase())) {
                list[i].style.display = 'block'
            }
            else {
                list[i].style.display = 'none'
            }
        }

    }

    const handleCMT = () => {

        const name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        let day = d.getDay()
        let year = d.getFullYear()
        let month = name[d.getMonth()]
        let hour = d.getHours();
        let minutes = d.getMinutes();

        if (hour <= 12) {
            let today = month + ' ' + day + '' + ', ' + year + ' at ' + hour + ':' + minutes + ' am'
            let token = localStorage.getItem("token");

            if (checkJoin.length > 0) {

                axios.post('http://localhost:4000/cmt/courses', {
                    token, cmt, id, today, star
                }, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                    .then(function (response) {
                        if (response.data == 'Chỉ review 1 lần') {
                            document.querySelector('.notification_cmt').style.display = 'block';


                            let body = document.querySelector('body');
                            body.onclick = () => {
                                document.querySelector('.notification_cmt').style.display = 'none';
                            };

                            setCmt('')
                        }
                        else {
                            // alert(response.data)
                            setCheck(prev => !prev)
                            setCmt('')

                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        document.querySelector('.notification_cmt').style.display = 'block';
                        document.querySelector('.notification_cmt p').innerHTML = error.response.data
                    });
                setCheck(prev => !prev)
            }
            else {
                document.querySelector('.notification_cmt p').innerHTML = 'Please join courses !!'
                document.querySelector('.notification_cmt').style.display = 'block'
            }
        }
        else if (hour > 12) {
            hour = hour - 12;
            let today = month + ' ' + day + '' + ', ' + year + ' at ' + hour + ':' + minutes + ' pm'
            let token = localStorage.getItem("token");

            if (checkJoin.length > 0) {

                axios.post('http://localhost:4000/cmt/courses', {
                    token, cmt, id, today, star
                }, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                    .then(function (response) {
                        if (response.data == 'Chỉ review 1 lần') {
                            document.querySelector('.notification_cmt').style.display = 'block';

                            let body = document.querySelector('body');
                            body.onclick = () => {
                                document.querySelector('.notification_cmt').style.display = 'none';
                            };

                            setCmt('')

                        }
                        else {
                            // alert(response.data)
                            setCheck(prev => !prev)
                            setCmt('')

                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        document.querySelector('.notification_cmt').style.display = 'block';
                        document.querySelector('.notification_cmt p').innerHTML = 'Please Login !!'
                    });
                setCheck(prev => !prev)
            }
            else {
                document.querySelector('.notification_cmt p').innerHTML = 'Please join courses !!'
                document.querySelector('.notification_cmt').style.display = 'block'
            }
        }




    }

    const handleJoin = () => {
        const token = localStorage.getItem("token");

        axios.post('http://localhost:4000/joincourses', {
            idCourses: id
        }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(function (res) {

                console.log('check', res)

                if (res.status == 202) {
                    document.querySelector('.notification_joinCourses p').innerHTML = res.data
                    document.querySelector('.notification_joinCourses button').style.backgroundColor = 'red'
                    document.querySelector('.notification_joinCourses').style.display = 'block';

                    // setTimeout(() => {
                    //     document.querySelector('.notification_joinCourses').style.display = 'none';
                    // }, 5000);
                }
                else if (res.status == 200) {
                    document.querySelector('.Animation').style.display = 'block';
                    document.querySelector('.notification_joinCourses p').innerHTML = res.data
                    document.querySelector('.notification_joinCourses button').style.backgroundColor = 'green'
                    document.querySelector('.notification_joinCourses').style.display = 'block';
                }


            })
            .catch(function (err) {
                // console.log(err);
                document.querySelector('.notification_joinCourses').style.display = 'block'
                document.querySelector('.notification_joinCourses p ').innerHTML = 'Please Login !!'

            });
    }

    const handleStar_1 = () => {
        const listStar = document.querySelectorAll('.vote i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'gray'
        listStar[2].style.color = 'gray'
        listStar[3].style.color = 'gray'
        listStar[4].style.color = 'gray'

        setStar(1)


    }

    const handleStar_2 = () => {
        const listStar = document.querySelectorAll('.vote i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'gray'
        listStar[3].style.color = 'gray'
        listStar[4].style.color = 'gray'

        setStar(2)

    }

    const handleStar_3 = () => {
        const listStar = document.querySelectorAll('.vote i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'orange'
        listStar[3].style.color = 'gray'
        listStar[4].style.color = 'gray'

        setStar(3)
    }

    const handleStar_4 = () => {
        const listStar = document.querySelectorAll('.vote i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'orange'
        listStar[3].style.color = 'orange'
        listStar[4].style.color = 'gray'

        setStar(4)
    }

    const handleStar_5 = () => {
        const listStar = document.querySelectorAll('.vote i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'orange'
        listStar[3].style.color = 'orange'
        listStar[4].style.color = 'orange'

        setStar(5)
    }

    const showModalDelete = (id) => {
        setIdDelete(id)
        document.querySelector('.deleteReview').style.display = 'block'

    }

    const closeModalDelete = () => {
        document.querySelector('.deleteReview').style.display = 'none'

    }
    const deleteCmt = () => {
        let token = localStorage.getItem("token");
        axios.delete(`http://localhost:4000/cmt/courses/delete/${idDelete}`, { headers: { Authorization: token } })
            .then(res =>
                setCheck(prev => !prev)
            )
            .catch(err => {
                console.log(err)
            });

        document.querySelector('.deleteReview').style.display = 'none'
        setPageCmt(1)
    }

    const editCmt = (id, cmt) => {
        setCmtEdit(cmt)
        setIdEdit(id)
        document.querySelector('.voteUpdate').style.display = 'block'
    }

    const handleStarEdit_1 = () => {
        const listStar = document.querySelectorAll('.voteUpdate i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'gray'
        listStar[2].style.color = 'gray'
        listStar[3].style.color = 'gray'
        listStar[4].style.color = 'gray'
        setStarEdit(1)

    }
    const handleStarEdit_2 = () => {
        const listStar = document.querySelectorAll('.voteUpdate i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'gray'
        listStar[3].style.color = 'gray'
        listStar[4].style.color = 'gray'
        setStarEdit(2)

    }
    const handleStarEdit_3 = () => {
        const listStar = document.querySelectorAll('.voteUpdate i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'orange'
        listStar[3].style.color = 'gray'
        listStar[4].style.color = 'gray'
        setStarEdit(3)

    }
    const handleStarEdit_4 = () => {
        const listStar = document.querySelectorAll('.voteUpdate i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'orange'
        listStar[3].style.color = 'orange'
        listStar[4].style.color = 'gray'
        setStarEdit(4)
    }
    const handleStarEdit_5 = () => {
        const listStar = document.querySelectorAll('.voteUpdate i')
        listStar[0].style.color = 'orange'
        listStar[1].style.color = 'orange'
        listStar[2].style.color = 'orange'
        listStar[3].style.color = 'orange'
        listStar[4].style.color = 'orange'
        setStarEdit(5)

    }

    const updateCmt = () => {
        let token = localStorage.getItem("token");

        const name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const d = new Date();
        let day = d.getDay()
        let year = d.getFullYear()
        let month = name[d.getMonth()]
        let hour = d.getHours();
        let minutes = d.getMinutes();

        if (hour <= 12) {
            let today = month + ' ' + day + '' + ', ' + year + ' at ' + hour + ':' + minutes + ' am'

            const obj = {
                idEdit, cmtEdit, starEdit, today
            }

            axios.put('http://localhost:4000/cmt/courses/update', obj, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(res => setCheck(prev => !prev))
                .catch(error => {
                    console.log('There was an error!', error);
                });
            document.querySelector('.voteUpdate').style.display = 'none'
            setCheck(prev => !prev)
        }
        else if (hour > 12) {
            hour = hour - 12;
            let today = month + ' ' + day + '' + ', ' + year + ' at ' + hour + ':' + minutes + ' pm'
            const obj = {
                idEdit, cmtEdit, starEdit, today
            }

            axios.put('http://localhost:4000/cmt/courses/update', obj, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(res => setCheck(prev => !prev))
                .catch(error => {
                    console.log('There was an error!', error);
                });
            document.querySelector('.voteUpdate').style.display = 'none'
            setCheck(prev => !prev)
        }







    }
    const handleCloseEdit = () => {
        document.querySelector('.voteUpdate').style.display = 'none'
    }
    const handleCloseNotification_Cmt = () => {
        document.querySelector('.notification_cmt').style.display = 'none'
        setCmt('')
    }
    const handleCloseNotification_joinCourses = () => {
        document.querySelector('.notification_joinCourses').style.display = 'none'
        document.querySelector('.Animation').style.display = 'none';

    }

    const changePage = (page) => {

        setPageCmt(page)

        let token = localStorage.getItem("token");
        async function getData() {
            const res = await axios.get(`http://localhost:4000/cmt/courses/${id}/${page}`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setDataCmt(res.data)).catch(err => {
            console.log(err);
        })
    }


    let total = 0;
    for (let i = 0; i < allCmt.length; i++) {
        total += allCmt[i].star
    }
    let rate = total / allCmt.length
    let test = Math.round(rate)

    console.log(total)





    const oneStar = allCmt.filter((item) => {
        return item.star == 1
    })

    const twoStar = allCmt.filter((item) => {
        return item.star == 2
    })

    const threeStar = allCmt.filter((item) => {
        return item.star == 3
    })

    const fourStar = allCmt.filter((item) => {
        return item.star == 4
    })

    const fiveStar = allCmt.filter((item) => {
        return item.star == 5
    })

    let renderOneStar = oneStar.length / allCmt.length * 335

    let renderTwoStar = twoStar.length / allCmt.length * 335

    let renderThreeStar = threeStar.length / allCmt.length * 335

    let renderFourStar = fourStar.length / allCmt.length * 335

    let renderFiveStar = fiveStar.length / allCmt.length * 335








    return (


        <>
            {data.length > 0 ? (<div>
                <Header />
                <div className='form_detail'>

                    <div className='left'>
                        <div className='banner'>
                            <img src={imgBanner} />
                        </div>


                        <div style={{ fontFamily: "Open Sans" }} className='body'>

                            <div className='btn'>
                                <button className={lessons ? ('change_btn') : ('')} onClick={handleLessons}>Lessons</button>
                                <button className={teacher ? ('change_btn') : ('')} onClick={handleTeacher}>Tearcher</button>
                                <button className={review ? ('change_btn') : ('')} onClick={handleReview}>Reviews</button>
                            </div>
                            <hr></hr>



                            {lessons ? (
                                <>
                                    <div style={{ fontFamily: "Open Sans" }} className='lessons'>
                                        <div className='search'>
                                            <input
                                                placeholder='Enter lesson'
                                                onChange={e => setSearch(e.target.value)}
                                                value={search}
                                            />
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                            <button onClick={handleSearch} className='btn_search'>tìm kiếm</button>
                                            <button style={{ cursor: 'pointer' }} onClick={handleJoin} className='btn_join'>Tham gia khóa học</button>
                                        </div>

                                        <ul>
                                            {find ? ((find.lessons.map((item, index) => {
                                                return (
                                                    <li className='item_lesson' key={index}>
                                                        <span>{item.name}</span>
                                                        {token == null || checkJoin.length == 0 ? (
                                                            <Link style={{ backgroundColor: 'gray' }}>
                                                                Learn
                                                            </Link>
                                                        ) : (
                                                            <Link to={`/detail/listcourses/lessons/${id}/${index}`}>
                                                                Learn
                                                            </Link>
                                                        )}

                                                    </li>
                                                )
                                            }))) : ('')}

                                        </ul>

                                        <div className='notification_joinCourses' >
                                            <div className='notification_joinCourses_child' >
                                                <p>Bạn đã tham gia khóa học này</p> <br></br>
                                                <button onClick={handleCloseNotification_joinCourses}>Close</button>
                                            </div>
                                        </div>

                                        <div style={{ display: 'none' }} className='Animation'>
                                            <Animation />
                                        </div>



                                    </div>
                                </>
                            ) : ('')}

                            {teacher ? (
                                <div className='teacher'>
                                    <h1>Main Teachers</h1>

                                    {find ? ((find.teacher.map((item, index) => {
                                        return (
                                            <div key={index} className='item'>

                                                <div className='header'>
                                                    <img src={item.img} />
                                                    <div className='info'>
                                                        <h3>{item.name}</h3>
                                                        <p>Second Year Teacher</p>
                                                        <i className="fa-brands fa-google"></i>
                                                        <i className="fa-brands fa-instagram"></i>
                                                        <i className="fa-brands fa-youtube"></i>
                                                    </div>
                                                </div>

                                                <div className='title'>
                                                    <p>
                                                        Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique
                                                    </p>
                                                </div>

                                            </div>
                                        )
                                    }))) : ('')}

                                </div>
                            ) : ('')}


                            {review ? (
                                <div style={{ fontFamily: "Open Sans" }} className='review'>
                                    <h1>
                                        {allCmt.length} REVIEW
                                    </h1>

                                    <div className='banner_review'>

                                        <div className='left'>
                                            <p className='quality'>{test} / 5</p>
                                            {arrStar.map((items, index) => {
                                                return (
                                                    <span style={{ color: 'orange' }}>

                                                        {index + 1 <= test ? (
                                                            <i className="fa-solid fa-star"></i>
                                                        ) : (
                                                            <i style={{ color: 'white' }} className="fa-solid fa-star"></i>
                                                        )}

                                                    </span>
                                                )
                                            })}
                                            <p>{allCmt.length} Ratings</p>
                                        </div>

                                        <div className='right'>
                                            <p>
                                                5 stars
                                                <span className='line'></span>
                                                <span style={{ backgroundColor: '#b2d235', width: renderFiveStar }} className='line'></span>
                                            </p>
                                            <p>
                                                4 stars
                                                <span className='line'></span>
                                                <span style={{ backgroundColor: '#b2d235', width: renderFourStar }} className='line'></span>
                                            </p>
                                            <p>
                                                3 stars
                                                <span className='line'></span>
                                                <span style={{ backgroundColor: '#b2d235', width: renderThreeStar }} className='line'></span>
                                            </p>
                                            <p>
                                                2 stars
                                                <span className='line'></span>
                                                <span style={{ backgroundColor: '#b2d235', width: renderTwoStar }} className='line'></span>
                                            </p>
                                            <p>
                                                1 stars
                                                <span className='line'></span>
                                                <span style={{ backgroundColor: '#b2d235', width: renderOneStar }} className='line'></span>
                                            </p>
                                        </div>

                                    </div>

                                    <div className='cmt'>
                                        <h5>
                                            Show all reviews <i className="fa-solid fa-caret-down"></i>
                                        </h5>

                                        {dataCmt.length > 0 ? ((dataCmt.map((item, index) => {
                                            return (
                                                <div className='item'>
                                                    <div className='header'>
                                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png' />
                                                        <span className='name'>{item.user}</span>
                                                        {arrStar.map((items, index) => {
                                                            return (
                                                                <span>
                                                                    {index + 1 <= item.star ? (
                                                                        <i className="fa-solid fa-star"></i>
                                                                    ) : (
                                                                        <i style={{ color: 'gray' }} className="fa-solid fa-star"></i>
                                                                    )}

                                                                </span>
                                                            )
                                                        })}
                                                        <span className='date'>{item.today}</span>
                                                    </div>
                                                    <div className='title'>
                                                        <p>
                                                            {item.cmt}
                                                            {item.user == userNameCurrent ? (
                                                                <>
                                                                    <i onClick={() => showModalDelete(item._id)} className="fa-solid fa-trash-can"></i>
                                                                    <i onClick={() => editCmt(item._id, item.cmt)} className="fa-solid fa-pen-to-square"></i>
                                                                </>
                                                            ) : ('')}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }))) : ('')}
                                    </div> <br></br>
                                    <div className='change_page'>


                                        {arrStar.map((item, index) => {

                                            return (
                                                index < allCmt.length / 2 ? (
                                                    index + 1 == pageCmt ? (
                                                        (<button style={{ backgroundColor: "red" }} onClick={() => { changePage(index + 1) }}>{index + 1}</button>)
                                                    ) : (
                                                        (<button onClick={() => { changePage(index + 1) }}>{index + 1}</button>)
                                                    )
                                                ) : ('')
                                            )

                                        })}




                                    </div>


                                    <div className='vote'>
                                        <h1>Leave a Review</h1>
                                        <p>Message</p>
                                        <textarea

                                            placeholder='Enter comment'
                                            onChange={e => setCmt(e.target.value)}
                                            value={cmt}
                                        />
                                        <h3>
                                            Vote:
                                            <i onClick={handleStar_1} className="fa-solid fa-star"></i>
                                            <i onClick={handleStar_2} className="fa-solid fa-star"></i>
                                            <i onClick={handleStar_3} className="fa-solid fa-star"></i>
                                            <i onClick={handleStar_4} className="fa-solid fa-star"></i>
                                            <i onClick={handleStar_5} className="fa-solid fa-star"></i>
                                        </h3>
                                        {cmt == '' ? (<button style={{ backgroundColor: 'gray' }}>
                                            <span>Comment </span>
                                        </button>
                                        ) : (<button onClick={handleCMT}>
                                            <span>Comment </span>
                                        </button>
                                        )}
                                    </div>

                                    <div className='voteUpdate'>
                                        <div className='voteUpdateChild'>
                                            <div className='voteUpdateChild_header'>
                                                <p>UPDATE REVIEW</p>
                                                <button onClick={handleCloseEdit}>X</button>
                                            </div>
                                            <input
                                                placeholder='Enter review'
                                                value={cmtEdit}
                                                onChange={e => setCmtEdit(e.target.value)}
                                            />
                                            <h3 >
                                                Vote : <i onClick={handleStarEdit_1} className="fa-solid fa-star"></i>
                                                <i onClick={handleStarEdit_2} className="fa-solid fa-star"></i>
                                                <i onClick={handleStarEdit_3} className="fa-solid fa-star"></i>
                                                <i onClick={handleStarEdit_4} className="fa-solid fa-star"></i>
                                                <i onClick={handleStarEdit_5} className="fa-solid fa-star"></i>
                                            </h3>
                                            {cmtEdit == '' ? (
                                                <button style={{ backgroundColor: 'gray' }} >Update</button>
                                            ) : (
                                                <button onClick={updateCmt}>Update</button>
                                            )}

                                        </div>
                                    </div>

                                    <div className='deleteReview'>
                                        <div className='deleteReview_Child'>
                                            <p>Bạn muốn xóa Review này không ?</p><br></br>
                                            <button className='yes_delete' onClick={deleteCmt}>Yes</button>
                                            <button className='no_delete' onClick={closeModalDelete}>No</button>

                                        </div>
                                    </div>

                                    <div className='notification_cmt'>
                                        <button className='notification_cmt_icon' >X</button>
                                        <div className='notification_cmt_child'>
                                            <p>Chỉ được review 1 lần !!</p> <br></br>
                                            <button onClick={handleCloseNotification_Cmt}>Close</button>
                                        </div>
                                    </div>



                                </div>
                            ) : ('')}




                        </div>
                    </div>

                    <div style={{ fontFamily: "Open Sans" }} className='right'>

                        <div className='top'>
                            <h1>Descriptions course</h1>
                            <p className='line'></p>
                            <p>Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim. Sed quis rutrum tellus, sit amet viverra felis. Cras sagittis sem sit amet urna feugiat rutrum. Nam nulla ipsum, venenatis malesuada felis quis, ultricies convallis neque. Pellentesque tristique fringilla tempus. Vivamus bibendum nibh in dolor pharetra, a euismod nulla dignissim. Aenean viverra tincidunt nibh, in imperdiet nunc. Suspendisse eu ante pretium, consectetur leo at, congue quam. Nullam hendrerit porta ante vitae tristique.</p>
                        </div>

                        <div className='mid'>
                            <p>
                                <i className="fa-solid fa-user-group fa-2x"></i>
                                <p className='title'>Learners:</p>
                                <p className='footer'> 500</p>

                            </p>
                            <hr></hr>
                            <p>
                                <i className="fa-solid fa-chess-board fa-2x"></i>
                                <p className='title'> Lessons:</p>
                                <p className='footer'> 100 lessons</p>
                            </p>
                            <hr></hr>
                            <p>
                                <i className="fa-solid fa-clock fa-2x"></i>
                                <p className='title'>  Times:</p>
                                <p className='footer'> 80 hours</p>
                            </p>
                            <hr></hr>
                            <p>
                                <i className="fa-solid fa-key fa-2x"></i>
                                <p className='title'>  Tags:</p>
                                <p className='footer'> #learn #code</p>
                            </p>
                            <hr></hr>
                            <p>
                                <i className="fa-regular fa-money-bill-1 fa-2x"></i>
                                <p className='title'>Price:</p>
                                <p className='footer'> Free</p>
                            </p>
                        </div>

                        <div className='bot'>
                            <div className='title'>
                                <h1>Other Courses</h1>
                            </div>
                            <ul>
                                <li>1 Lorem ipsum dolor sit amet, consectetur the adipiscing elit.</li>
                                <li>2 Lorem ipsum dolor sit amet, consectetur the adipiscing elit.</li>
                                <li>3 Lorem ipsum dolor sit amet, consectetur the adipiscing elit.</li>
                                <li>4 Lorem ipsum dolor sit amet, consectetur the adipiscing elit.</li>
                                <li>5 Lorem ipsum dolor sit amet, consectetur the adipiscing elit.</li>
                            </ul>
                            <button>View all ours courses</button>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>) : (<NotFound />)}
        </>
    )
}

export default DetailCourses