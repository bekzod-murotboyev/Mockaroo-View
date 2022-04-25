import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../api";
import {toast} from "react-toastify";
import fileDownload from "js-file-download";


const slice = createSlice({
    name: 'data',
    initialState: {
        formats: ['SQL', 'CSV', 'JSON'],
        types: ['DIGIT', 'FIRSTNAME', 'LASTNAME', 'USERNAME', 'FULLNAME', 'GENDER'],
        fields: [
            {
                id: 0,
                name: 'id',
                type: 'DIGIT'
            },
            {
                id: 1,
                name: 'firstname',
                type: 'FIRSTNAME'
            },
            {
                id: 2,
                name: 'lastname',
                type: 'LASTNAME'
            },
            {
                id: 3,
                name: 'fullName',
                type: 'FULLNAME'
            },
            {
                id: 4,
                name: 'age',
                type: 'DIGIT'
            }
        ],
        response: '',
        errors: []
    },
    reducers: {
        initialize: (state, {payload}) => {
            if (payload.success) {
                state.formats = payload.data.formats
                state.types = payload.data.types
            }
        },
        changeFields: (state, {payload}) => {
            payload === -1 ? state.fields.pop() : state.fields.push({
                id: state.fields.length,
                name: 'custom',
                type: 'DIGIT'
            })
        },

        success: (state, {payload}) => {
            if (payload.success) {
                toast.success('Generating successfully completed!', {
                    autoClose: 1500
                })
                state.response = payload.data
            } else
                toast.warning('At first you need to SIGN IN!', {
                    autoClose: 1500
                })

        },

        successDownload: (state, {payload}) => {
            toast.success('Download successfully completed!', {
                autoClose: 1500
            })
            fileDownload(payload.data,'file.txt')
        },
        fail: (state, action) => {
            toast.warning('At first you need to SIGN IN!', {
                autoClose: 1500
            })
            clear()
        },

        onFail: (state, {payload}) => {
            state.errors.push(payload)
            clear()
        },
    }
})

function clear() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('name')
}

export const {changeFields} = slice.actions

export const initializerMethod = () => apiCall({
    url: 'home/init',
    method: 'GET',
    onSuccess: slice.actions.initialize.type,
    onFail: slice.actions.onFail.type,
})

export const download = (data) => apiCall({
    url: 'mock/download',
    method: 'POST',
    onSuccess: slice.actions.successDownload.type,
    onFail: slice.actions.fail.type,
    data
})
export const check = (data) => apiCall({
    url: 'mock/check',
    method: 'POST',
    onSuccess: slice.actions.success.type,
    onFail: slice.actions.fail.type,
    data
})


export default slice.reducer