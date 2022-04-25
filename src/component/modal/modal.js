import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import fileDownload from "js-file-download";

function CustomModal({isOpen, toggle, data}) {

    function downloadData() {
        fileDownload(data,'file.txt')
    }

    return <Modal size='lg' style={{maxWidth: '1000px', width: '100%'}} isOpen={isOpen} toggle={toggle}
                  className='w-100'>
        <ModalHeader className='text-success'>
            <h4>Data Successfully Generated</h4>
        </ModalHeader>
        <ModalBody className='text-center bg-dark'>
            <textarea name="" id="" cols="80" rows="20" className='border-5 rounded-3'>
                {data}
            </textarea>
        </ModalBody>
        <ModalFooter className='float-end p-1'>
            <button onClick={()=>downloadData()} className="btn btn-success p-1 px-2 rounded-pill border-0">⬇Download</button>
            <button onClick={toggle} className="btn btn-danger p-1 px-2 rounded-pill border-0">Close</button>
        </ModalFooter>
    </Modal>
}

export default CustomModal