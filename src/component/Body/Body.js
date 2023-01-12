import './Body.scss'
import React from 'react'
import img1 from '../../img/js.png'
import imgLaptop from '../../img/laptop.png'

function Body() {

    const handleListCourses = () => {
        window.location = '/listcourses'
    }
    return (
        <div>
            <div className='listCourses'>
                <div className='js'>
                    <div className='logo'>
                        <img src={img1} />
                    </div>
                    <div className='title'>
                        <h1>HTML/CSS/js Tutorial</h1>
                        <p>
                            I knew hardly anything about HTML, JS, and CSS before entering New Media. I had coded quite a bit, but never touched anything in regards to web development.
                        </p>
                        <button onClick={handleListCourses}>Take This Course</button>
                    </div>
                </div>

                <div className='js'>
                    <div className='logo'>
                        <img src={img1} />
                    </div>
                    <div className='title'>
                        <h1>HTML/CSS/js Tutorial</h1>
                        <p>
                            I knew hardly anything about HTML, JS, and CSS before entering New Media. I had coded quite a bit, but never touched anything in regards to web development.
                        </p>
                        <button onClick={handleListCourses}>Take This Course</button>
                    </div>
                </div>
                <div className='js'>
                    <div className='logo'>
                        <img src={img1} />
                    </div>
                    <div className='title'>
                        <h1>HTML/CSS/js Tutorial</h1>
                        <p>
                            I knew hardly anything about HTML, JS, and CSS before entering New Media. I had coded quite a bit, but never touched anything in regards to web development.
                        </p>
                        <button onClick={handleListCourses}>Take This Course</button>
                    </div>
                </div>
            </div>

            <h3 className='otherCourses'>
                Other courses
            </h3>

            <div className='listOther'>

                <div className='css'>

                    <div className='logo'>
                        <h1>CSS</h1>
                    </div>

                    <div className='title'>
                        <h1>CSS Tutorial</h1>
                        <p>
                            I knew hardly anything about HTML, JS, and CSS before entering New Media. I had coded quite a bit, but never touched anything in regards to web development.
                        </p>
                        <button onClick={handleListCourses}>Take This Course</button>
                    </div>

                </div>

                <div className='css'>
                    <div className='logo'>
                        <h1>CSS</h1>
                    </div>
                    <div className='title'>
                        <h1>CSS Tutorial</h1>
                        <p>
                            I knew hardly anything about HTML, JS, and CSS before entering New Media. I had coded quite a bit, but never touched anything in regards to web development.
                        </p>
                        <button onClick={handleListCourses}>Take This Course</button>
                    </div>
                </div>
                <div className='css'>
                    <div className='logo'>
                        <h1>CSS</h1>
                    </div>
                    <div className='title'>
                        <h1>CSS Tutorial</h1>
                        <p>
                            I knew hardly anything about HTML, JS, and CSS before entering New Media. I had coded quite a bit, but never touched anything in regards to web development.
                        </p>
                        <button onClick={handleListCourses}>Take This Course</button>
                    </div>
                </div>
            </div>


            <h3 className='viewCourses'>
                <span>
                    View Our Courses <i className="fa-solid fa-arrow-right"></i>
                </span>

            </h3>

            <div className='question'>
                <h1>Why HapoLearn?</h1>
                <ul>
                    <li>
                        <span>
                            <i className="fa-solid fa-circle-check"></i> Interactive lessons, "on-the-go" practice, peer support.
                        </span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-circle-check"></i> Interactive lessons, "on-the-go" practice, peer support.
                        </span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-circle-check"></i> Interactive lessons, "on-the-go" practice, peer support.
                        </span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-circle-check"></i> Interactive lessons, "on-the-go" practice, peer support.
                        </span>
                    </li>
                    <li>
                        <span>
                            <i className="fa-solid fa-circle-check"></i> Interactive lessons, "on-the-go" practice, peer support.
                        </span>
                    </li>
                </ul>

                <img src={imgLaptop} />

            </div>


            <div className='feedBack'>
                <h1 className='title'>Feedback</h1>
                <p>
                    What other students turned professionals have to say about us after learning with us and reaching their goals
                </p>

                <div className='listBox'>
                    <div className='box'>
                        <div className='message'>
                            <span></span>
                            <small>
                                A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan
                            </small>
                        </div>

                        <div>
                            <div className='author'>
                                <img src='https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-business-man-icon-png-image_924785.jpg' />
                                <p className='name'>Hoang Anh Nguyen</p>
                                <p className='language'>PHP</p>
                                <p className='star'>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='message'>
                            <span></span>
                            <small>
                                A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan
                            </small>
                        </div>

                        <div>
                            <div className='author'>
                                <img src='https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-business-man-icon-png-image_924785.jpg' />
                                <p className='name'>Hoang Anh Nguyen</p>
                                <p className='language'>PHP</p>
                                <p className='star'>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>




            </div>

            <div className='startLearn'>
                <h1 className='title'>
                    Become a member of our
                    growing community!
                </h1>
                <button onClick={handleListCourses}>
                    Start Learning Now!
                </button>
            </div>

            <div className='statistic'>
                <h1>Statistic</h1>
                <ul>
                    <li>
                        <p>Courses</p>
                        <p style={{ color: 'rgba(178, 210, 53, 1)' }}>2,234</p>
                    </li>
                    <li>
                        <p>Courses</p>
                        <p style={{ color: 'rgba(178, 210, 53, 1)' }}>2,234</p>
                    </li>
                    <li>
                        <p>Courses</p>
                        <p style={{ color: 'rgba(178, 210, 53, 1)' }}>2,234</p>
                    </li>
                </ul>

            </div>

        </div>
    )
}

export default Body