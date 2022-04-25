import {configureStore} from "@reduxjs/toolkit";
import api from "./middleware/api";
import user from "./reducer/user";
import mock from "./reducer/mock";

export default configureStore({
    reducer:{user,mock},
    middleware:[api]
})