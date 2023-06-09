import React, {useEffect, useState} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Cookies from 'universal-cookie';
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserList from "../component/admin/UserList";
import History from "../component/History";
import Information from "../component/Information";
import PointOther from "../component/PointOther";
import Graph from "../component/owner/graph";

function MainOwner(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [name,setName] = useState({});

    useEffect(()=>{
        const login = async () =>{
            if (cookies.get('User') == undefined){
                navigate('/login');
            }else {
               await setName(cookies.get('User'));
                //window.location.reload(true);
            }
            console.log(cookies.get('User'));
        }
        login();

    },[])

    const logout = () =>{
        cookies.remove('User',{path:'/'})
        navigate('/login');
    }

    return(
        <div>
            <Navbar/>
            <div className='App container' style={{marginBottom:'20px'}}>
                <div style={{justifyContent:"flex-end",display:"flex",marginTop:'10px'}}>
                    <div className='profile-box'>
                        <p>Owner : {name.Surname} </p>
                        <button className='btn btn-secondary' onClick={logout}>Logout</button>
                    </div>
                </div>

                <div className='row border' style={{padding:"20px"}}>
                    <h1>สรุปการใช้งาน</h1>
                    <Graph/>
                </div>

                <div className='row border style={{padding:"20px"}}'>
                    <div className='col border' style={{padding:"20px"}}>
                        <h1>History</h1>
                        <History/>
                    </div>
                    <div className='col border' style={{padding:"20px"}}>
                        <h1>เวลาการทำงาน</h1>
                        <Information/>
                    </div>
                </div>

                <div className='row border' style={{padding:"20px"}}>
                    <div className='col'>
                        <h1>Point</h1>
                        <PointOther/>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default MainOwner;