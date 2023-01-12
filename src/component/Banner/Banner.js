import './Banner.scss'
import React from 'react'
import imgBanner from '../../img/iconBanner.png'

function Banner() {
    const handleListCourses = () => {
        window.location = '/listcourses'
    }
    return (
        <div className='Banner'>
            <h1>Learn Anytime, Anywhere</h1>
            <h2>at HapoLearn   !</h2>
            <p>
                Interactive lessons, "on-the-go"
                practice, peer support.
            </p>
            <button onClick={handleListCourses} style={{ fontFamily: 'Open Sans' }} className='btn1'>
                <p>Start Learning Now!</p>
            </button>
            <div className='message'>
                <p className='name'>HapoLearn</p>
                <div className='title'>
                    <h3>
                        HapoLearn xin chào bạn.
                        Bạn có cần chúng tôi hỗ trợ gì không?
                    </h3>
                    <button>
                        <i className="fa-brands fa-facebook-messenger"></i> Đăng nhập vào Messenger
                    </button>
                    <p>Chat với HapoLearn trong Messenger</p>
                </div>
            </div>
            <img id='message_small' src='https://1810233666-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-L8qsmIDw5_reabURkaE%2F-LWFqwL20sgSvHq_ap2L%2F-LWFr8z9CQBo3OKwN7GL%2FFacebook%20Messenger.png?alt=media&token=1481a382-768f-4a57-bcfa-b4e1c2162ee3' />
        </div>
    )
}

export default Banner