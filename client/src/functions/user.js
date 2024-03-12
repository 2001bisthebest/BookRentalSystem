import axios from "axios"

export const openStore = async (id, authtoken) => {
    await axios.put(process.env.REACT_APP_API + '/openstore/' + id, {}, {
        headers: {
            authtoken
        }
    })
}