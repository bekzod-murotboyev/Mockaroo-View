function AvFormRegister({register}) {

    function registration() {
        let name = document.getElementById('nameR')
        let email = document.getElementById('emailR')
        let pass = document.getElementById('passwordR')
        let prePass = document.getElementById('prePasswordR')
        if (name.value && email.value && pass.value && prePass.value)
            if (pass.value === prePass.value)
                register({
                    name: name.value,
                    email: email.value,
                    password: pass.value,
                })
            else
                prePass.style.borderColor = 'red'
        else {
             name.style.borderColor =name.value?'green':'red'
             email.style.borderColor =email.value?'green':'red'
             pass.style.borderColor =pass.value?'green':'red'
             prePass.style.borderColor =prePass.value?'green':'red'
        }
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