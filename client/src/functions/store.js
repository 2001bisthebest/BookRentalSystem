import axios from "axios"

export const addStore = async (id, authtoken) => {
    await axios.post(process.env.REACT_APP_API + '/addstore/' + id, {}, {
        headers: {
            authtoken
        }
    })
}