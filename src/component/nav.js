import logo from "../img/logo192.png"
import ModalForm from "./modal/modalForm";
import {useState} from "react";
import {connect} from "react-redux";
import {logout} from "../store/reducer/user";


function Navbar({name,logout}) {
    let [modalOpen, setModalOpen] = useState(false)
    let [isLogin, setIsLogin] = useState(false)

    function toggleWithChanging(changeIsLogin) {
        setIsLogin(changeIsLogin)
        setModalOpen(p => !p)
    }

    function toggle() {
        setModalOpen(p => !p)
    }

    return <div className="bg-black">
        <div className="row ">
            <div className="col-md-12">
                <div className="row p-4">
                    <div className="col-md-8 d-flex align-items-center">
                        <div className='brand-weight'>
                            <img className='brand-img-size' src={logo} alt=""/>
                        </div>
                        <h1 className="text-white m-0">
                            <p className='text-brand-color mt-2 mx-2'>Reactive Mockaroo</p>
                        </h1>
                    </div>
                    <div className="col-md-2 offset-2">
                        <div className="position-static">
                            {
                                name ? <div className='row'>
                                    <div className="col-md-7 text-info">
                                        <h4>{name}</h4>
                                    </div>
                                    <div className="col-md-5">
                                        <button onClick={()=>logout()}
                                            className="btn btn-outline-danger mx-1 border-0 rounded-pill text-brand-color">
                                            <h6>Logout</h6></button>
                                    </div>
                                </div> : <div>
                                    <button onClick={()=>toggleWithChanging(true)}
                                        className="btn btn-outline-info rounded-pill mx-1 border-0 text-brand-color">
                                        <h5>Sign In</h5></button>
                                    <button onClick={()=>toggleWithChanging(false)}
                                        className="btn btn-outline-info rounded-pill mx-1 border-0 text-brand-color">
                                        <h5>Sign Up</h5></button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalForm isOpen={modalOpen} toggle={toggle} isLogin={isLogin}/>
    </div>
}

export default connect(({user:{name}})=>({name}),{logout})(Navbar)