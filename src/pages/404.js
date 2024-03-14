import React from 'react'
import { Image } from 'react-bootstrap';
// import page from "../assets/404.jpg"
import { useNavigate } from 'react-router-dom';
import page from "../pages/bg/clarisc-404.png"
// import "../Style.css"

function Page404() {
    const navigate = useNavigate()
    function home() {
        navigate("/")
    }
    return (
        <div className='position-relative' >
            <Image src={page} className='img' style={{marginBottom:"-40px"}}/>
            <div className=' Go-child' >
            <a href="/" className='GO-CHILD-1 px-5 py-3'>GO HOME</a>
            </div>
        </div>

        // <div className='container-fluid'>
        //     <div className='row'>
        //         <div className='col-lg-12'>
        //             <img src={page} />
        //         </div>
        //     </div>
        // </div>
    )
}

export default Page404
