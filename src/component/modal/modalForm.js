import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import AvFormLogin from "../form/avFormLogin";
import AvFormRegister from "../form/avFormRegister";
import {loginToBack,register} from "../../store/reducer/user";

function ModalForm({isOpen, toggle, isLogin,loginToBack,register}) {


    function sendRequest(data){
        toggle()
        isLogin?loginToBack(data):register(data)
    }

    return <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className='text-brand-color bg-dark'>
            <h4 className='m-0'>{isLogin?'Sign In':'Sign Up'}</h4>
        </ModalHeader>
        <ModalBody className='bg-dark text-center px-5'>
            {
                isLogin ? <AvFormLogin login={sendRequest}/> : <AvFormRegister register={sendRequest}/>
            }
        </ModalBody>
        <ModalFooter className='float-end p-1 bg-dark'>
            <button onClick={toggle} className="btn btn-outline-danger p-1 px-2 border-0 rounded-pill">&#10006;</button>
        </ModalFooter>
    </Modal>
}

export default connect(({user:{user}})=>({user}),{loginToBack,register})(ModalForm)