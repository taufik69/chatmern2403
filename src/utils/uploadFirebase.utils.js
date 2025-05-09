import { getDatabase, push, ref, set } from "firebase/database";
const db = getDatabase();
export const uploadFirebaseData = async (dbName = "", data = {}) => {
    try {
        const upload = await set(push(ref(db, dbName.trim())), data);
        console.log(upload);

    } catch (error) {
        throw new Error(` firebase set  method Error ${error}`)
    }
}