import {connect} from "react-redux";
import {useState, useEffect} from "react";
import {initializerMethod, download, check, changeFields} from "../store/reducer/mock";
import {toast} from "react-toastify";
import CustomModal from "./modal/modal";

function Input({formats, types, fields, initializerMethod, response, download, check, changeFields}) {

    let [field, setField] = useState([])
    let [crtFormat, setCrtFormat] = useState(formats[0])
    let [row, setRow] = useState(100)
    let [rootElement, setRootElement] = useState('MOCK_DATA')
    let [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        initializerMethod()
        setField(prev => prev.length === 0 ? fields : prev)
    }, [])

    useEffect(() => {
       if(response) setModalOpen(true)
    }, [response])


    function changeFieldNumber(number) {
        changeFields(number)
        setField(prev => {
            let len = prev.length
            return number === -1 ? [...prev.slice(0, len - 1)] : [...prev, {
                id: len,
                name: 'custom',
                type: 'DIGIT'
            }];
        })

    }

    function changeFormat() {
        setCrtFormat(document.getElementById('format').value)
    }

    function changeRow() {
        let rows = document.getElementById('rows')
        if (rows.value <= 0) {
            rows.style.borderColor = 'red'
            rows.value = ''
            setRow(0)
        } else {
            rows.style.borderColor = 'green'
            setRow(rows.value)
        }
    }

    function changeRootElement() {
        let rootE = document.getElementById('rootE')
        rootE.style.borderColor = rootE.value ? 'green' : 'red'
        setRootElement(rootE.value)
    }

    function downloadFile() {
        if (crtFormat && row > 0 && rootElement && field.length!==0) {
            download({
                format: crtFormat,
                count: row,
                tableName: rootElement,
                fields: field,
                createTable: false
            })
        } else
            toast.warning('Please check your entered data clearly before downloading it!', {
                autoClose: 1500
            })
    }

    function checkFile() {
        if (crtFormat && row > 0 && rootElement && field.length!==0) {
            check({
                format: crtFormat,
                count: row,
                tableName: rootElement,
                fields: field,
                createTable: false
            })
        } else
            toast.warning('Please check your entered data clearly before checking it!')
    }

    function changeName(id) {
        setField(prev => {
            let result = []
            prev.forEach(item => {
                if (item.id === id)
                    result.push({
                        id,
                        name: document.getElementById('name' + id).value,
                        type: item.type
                    })
                else
                    result.push(item)
            })
            return result
        })
    }

    function changeType(id) {
        setField(prev => {
            let result = []
            prev.forEach(item => {
                if (item.id === id)
                    result.push({
                        id,
                        name: item.name,
                        type: document.getElementById('type' + id).value
                    })
                else
                    result.push(item)
            })
            return result
        })
    }

    function toggle() {
        setModalOpen(prev => !prev)
    }

    return <div className="bg-dark p-5">
        <div className="row">
            <div className="col-md-4 ">
                <table className="table table-borderless text-white ">
                    <thead className='text-center'>
                    <tr>
                        <th><h4 className='text-brand-color'>Field Name</h4></th>
                        <th><h4 className='text-brand-color'>Type</h4></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        fields.map(item =>
                            <tr key={item.id}>
                                <td>
                                    <input onChange={() => changeName(item.id)} className='form-control-lg'
                                           type="text"
                                           placeholder={"Field name"}
                                           defaultValue={item.name} id={'name' + item.id}/>
                                </td>
                                <td>
                                    <select onChange={() => changeType(item.id)} className='form-control pt-2 pb-3'
                                            name="type" id={'type' + item.id}
                                            defaultValue={item.type}>
                                        {
                                            types.map(type => <option key={'innerType' + type}
                                                                      defaultValue={type}>{type}</option>)
                                        }
                                    </select>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group-sm">
                            <label htmlFor="rows" className='text-brand-color'>#Rows</label>
                            <input id='rows' className='form-control' type='number' name='rows' placeholder={'Rows'}
                                   defaultValue={row} onChange={() => changeRow()}/>
                        </div>
                    </div>
                    {/* Rows */}
                    <div className="col-md-4">
                        <div className="input-group-sm">
                            <label htmlFor="format" className='text-brand-color'>Format</label>
                            <br/>
                            <select className='form-control' name="format" id='format' defaultValue={crtFormat}
                                    onChange={() => changeFormat()}>
                                {
                                    formats.map(item => <option key={item} value={item}>{item}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    {/* Format */}
                    <div className="col-md-4">
                        <div className="input-group-sm">
                            <label htmlFor="rootE" className='text-brand-color'>Root element</label>
                            <input id='rootE' className='form-control' type='text' name='root'
                                   placeholder={'Root element'}
                                   defaultValue={rootElement}
                                   onChange={() => changeRootElement()}/>
                        </div>
                    </div>
                    {/* Root Element */}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2">
                <div className="row">
                    <div className="col-md-8">
                        <button onClick={() => downloadFile()}
                                className="btn mx-1 px-3 py-1 text-brand-color rounded-pill  btn-outline-info border-0">⬇Download
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button onClick={() => checkFile()}
                                className="btn mx-1 px-3 py- text-brand-color rounded-pill  btn-outline-info border-0">Check
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-2 text-end">
                <button className="btn mx-2  border-0 btn-danger rounded-pill"
                        onClick={() => changeFieldNumber(-1)}>&#10006;</button>
                <button className="btn mx-2  border-0 btn-info rounded-pill"
                        onClick={() => changeFieldNumber(1)}>&#10010;</button>
            </div>
        </div>
        <CustomModal isOpen={modalOpen} toggle={toggle} data={response}/>
    </div>
}

export default connect(({mock: {formats, types, fields, response}}) => ({formats, types, fields, response}),
    {initializerMethod, download, check, changeFields})(Input)