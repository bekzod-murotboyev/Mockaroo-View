
function AvFormRegister({register}) {

    function registration() {
        let pass = document.getElementById('passwordR')
        let prePass = document.getElementById('prePasswordR')
        if (pass.value === prePass.value)
            register({
                name: document.getElementById('nameR').value,
                email: document.getElementById('emailR').value,
                password: pass.value,
            })
        else
            prePass.style.borderColor = 'red'
    }

    return <div>
        <div className='row'>
            <div className="col-md-12">
                <input className='form-control m-2' type="text" id='nameR' placeholder='FULL NAME' required/>
                <input className='form-control m-2' type="email" id='emailR' placeholder='Email' required/>
                <input className='form-control m-2' type="password" id='passwordR' placeholder='PASSWORD' required/>
                <input className='form-control m-2' type="password" id='prePasswordR' placeholder='VERIFY PASSWORD'
                       required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 m-2 mb-0">
                <button onClick={() => registration()} className="btn btn-outline-info border-0 rounded-pill">Send
                </button>
            </div>
        </div>
    </div>
}

export default AvFormRegister