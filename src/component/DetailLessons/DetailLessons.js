import './DetailLesson.scss'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function DetailLessons() {

    const [des, setDes] = useState(true)
    const [doc, setDoc] = useState(false)
    const [program, setProgram] = useState(false)

    let { id } = useParams()
    let { index } = useParams()

    const [data, setData] = useState([])

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

    const find = data.find((item) => {
        return item._id == id;
    })

    const handleDescriptions = () => {
        setDes(true)
        setDoc(false)
        setProgram(false)
    }

    const handleDocuments = () => {
        setDes(false)
        setDoc(true)
        setProgram(false)
    }


    const handleProgram = () => {
        setDes(false)
        setDoc(false)
        setProgram(true)
    }

    return (

        <div className='DetailLesson'>

            <Header />
            <div className='body'>
                <div className='left'>
                    <div className='banner'>
                        <img src='https://scontent.xx.fbcdn.net/v/t1.15752-9/305007902_632090735253550_8052442853680707690_n.png?stp=dst-png_s370x247&_nc_cat=101&ccb=1-7&_nc_sid=aee45a&_nc_ohc=TMniuXQL3RAAX924Sy2&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR_yiivuBSpXhe0Sxh0WHOrrJ3_BDH9t_IXtKbu4OoscQ&oe=6370F37A' />
                    </div>

                    <ul>
                        <li className={des ? ('change_btn') : ('')} onClick={handleDescriptions}>Descriptions</li>
                        <li className={doc ? ('change_btn') : ('')} onClick={handleDocuments}>Documents</li>
                        <li className={program ? ('change_btn') : ('')} onClick={handleProgram}>Program</li>
                    </ul>

                    {find ? (
                        <div>
                            <div style={{ paddingLeft: 70 }} className={!des ? ('hidden') : ('')}>
                                <h3>Descriptions</h3>
                                <p>{find.lessons[index].Descriptions}</p>
                            </div>

                            <div style={{ paddingLeft: 70 }} className={!doc ? ('hidden') : ('')}>
                                <h3>Documents</h3>
                                <p>{find.lessons[index].Documents}</p>
                            </div>

                            <div style={{ paddingLeft: 70 }} className={!program ? ('hidden') : ('')}>
                                <h3>Program</h3>
                                <p>{find.lessons[index].Program}</p>
                            </div>
                        </div>
                    ) : ('')}

                </div>

                <div className='right'>

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

        </div>
    )
}

export default DetailLessons