

function AvFormLogin({login}) {

    function doLogin() {
        login({
            email: document.getElementById('emailL').value,
            password: document.getElementById('passwordL').value,
        })
    }

    return <div>
        <div className='row'>
            <div className="col-md-12">
                <input className='form-control m-2' type="email" id='emailL' placeholder='Email' required/>
                <input className='form-control m-2' type="password" id='passwordL' placeholder='PASSWORD' required/>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 m-2 mb-0">
                <button onClick={() => doLogin()} className="btn btn-outline-info border-0 rounded-pill text-brand-color">Login
                </button>
            </div>
        </div>
    </div>
}

export default AvFormLogin