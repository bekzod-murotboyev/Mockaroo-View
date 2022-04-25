import Home from "./page/home";
import {Route, Routes} from "react-router";


function App() {

    return (
        <div>
            <div className="bg-light">
                <div className="row">
                    <div className="col-md-12">
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;