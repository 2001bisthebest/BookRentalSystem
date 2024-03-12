import axios from "axios";

export const listBookFromStore = async (id) => {
    await axios.get(process.env.REACT_APP_API + '/listbook/' + id)
}
export const listBook = async () => {
    await axios.get(process.env.REACT_APP_API + '/listbook')
}