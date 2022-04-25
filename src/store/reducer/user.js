import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from 'react-toastify';

const slice = createSlice({
    name: 'user',
    initialState: {user: null, name: localStorage.getItem('name'), errors: ''},
    reducers: {
        login: (state, {payload}) => {
            if (payload.success) {
                toast.success('SUCCESS', {autoClose: 1000})
                state.user = payload.data
                state.name = payload.data.name
                localStorage.setItem('accessToken', payload.data.accessToken)
                localStorage.setItem('refreshToken', payload.data.refreshToken)
                localStorage.setItem('name', payload.data.name)
            } else
                toast.error('Email or password is wrong', {autoClose: 500})
        },

        logout: (state, action) => {
            state.user = null
            state.name = null
            clear()
        },
        success: (state, {payload}) => {
            payload.success ?
                toast.success(payload.message, {autoClose: 1000})
                :
                toast.error(payload.message, {autoClose: 1000})
        },
        onFail: (state, {payload}) => {
            state.errors = payload
            toast.error(payload.message, {autoClose: 1000})
            clear()
        }
    }
})

function clear() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('name')
}

export const {logout} = slice.actions

export const loginToBack = (data) => apiCall({
    url: 'user/login',
    method: 'POST',
    onSuccess: slice.actions.login.type,
    onFail: slice.actions.onFail.type,
    data
})
export const register = (data) => apiCall({
    url: 'user/register',
    method: 'POST',
    onSuccess: slice.actions.success.type,
    onFail: slice.actions.onFail.type,
    data
})


export default slice.reducer