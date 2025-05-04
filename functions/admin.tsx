import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export type Admin = {
    id: number
    name: string,
    email: string
}

export async function GetAllAdmins(): Promise<Admin[]> {
    const adminsSnap = await getDocs(collection(db, "admins"))
    const admins = await Promise.all(adminsSnap.docs.map(async (adminDoc) => {
        const adminData = adminDoc.data()

        return {
            id: adminData.id,
            name: adminData.name,
            email: adminData.email
        }
    }))

    return admins
}