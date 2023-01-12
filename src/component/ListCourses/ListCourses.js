import './ListCourses.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

function ListCourses() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

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

    const handleSearch = () => {

        let list = document.querySelectorAll('.item')


        for (let i = 0; i < list.length; i++) {
            if (list[i].childNodes[0].childNodes[1].childNodes[0].innerText.toUpperCase().includes(search.toUpperCase())) {
                list[i].style.display = 'block'
            }
            else {
                list[i].style.display = 'none'
            }
        }

    }



    return (
        <>
            {data.length >= 0 ? (
                <div>
                    <Header />
                    <div className='form_list_courses'>

                        <div className='search'>

                            <div className='filter'>
                                <i className="fa-sharp fa-solid fa-sliders"></i> Filter
                            </div>

                            <div className='input_search'>
                                <input
                                    placeholder='Enter Courses'
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>

                            <div className='btn_search'>
                                <button onClick={handleSearch}>Tìm Kiếm</button>
                            </div>

                        </div>

                        <div className='list_courses'>

                            {data ? (data.map((item, index) => {
                                return (
                                    <div key={index} className='item'>

                                        <div className='header'>
                                            <img src={item.img} />
                                            <div className='detail'>
                                                <h1>{item.name}</h1>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>

                                        <Link className='btn_more' to={`/detail/listcourses/${item._id}`}>
                                            More
                                        </Link>


                                        <br></br>
                                        <hr></hr>

                                        <div className='footer'>
                                            <div>
                                                <p>Learners</p>
                                                <p style={{ color: 'rgba(178, 210, 53, 1)' }}>16,882</p>
                                            </div>

                                            <div>
                                                <p>Learners</p>
                                                <p style={{ color: 'rgba(178, 210, 53, 1)' }}>16,882</p>
                                            </div>

                                            <div>
                                                <p>Learners</p>
                                                <p style={{ color: 'rgba(178, 210, 53, 1)' }}>16,882</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : ('')}
                        </div>

                        <div className='change_page'>
                            <button><i className="fa-solid fa-arrow-left"></i></button>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button><i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : ('')}


        </>
    )
}

export default ListCourses