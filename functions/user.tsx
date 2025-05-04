import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";


export type User = {
    id: number,
    name: string,
    password: string,
    grade_id: string
}

export async function GetAllUsers() {
    const usersSnap = await getDocs(collection(db, "usuarios"))
    const users = await Promise.all(usersSnap.docs.map(async (userDoc) => {
        const userData = userDoc.exists() ? userDoc.data() : null

        const gradeRef = doc(db, "séries", String(userData?.grade_id))
        const gradeDoc = await getDoc(gradeRef);
        const gradeData = gradeDoc.exists() ? gradeDoc.data() : null

        return {
            id: userData?.id,
            name: userData?.name,
            password: userData?.password,
            grade_id: gradeData?.name
        }
    }))

    return users
}

export async function GetUserById(id: number): Promise<User | null> {
    const userSnap = await getDocs(collection(db, "usuarios"))
    for (const userDoc of userSnap.docs) {
        const userData = userDoc.exists() ? userDoc.data() : null

        if (userData?.id === id) {
            const gradeRef = doc(db, "séries", String(userData?.grade_id))
            const gradeDoc = await getDoc(gradeRef)
            const gradeData = gradeDoc.exists() ? gradeDoc.data() : null

            return {
                id: userData?.id,
                name: userData?.name,
                password: userData?.password,
                grade_id: gradeData?.name
            }
        }
    }
    return null
}

export async function GetUserByPassword(password: string): Promise<User | null> {
    const userSnap = await getDocs(collection(db, "usuarios"))
    for (const userDoc of userSnap.docs) {
        const userData = userDoc.exists() ? userDoc.data() : null

        if (userData?.password === password) {
            const gradeRef = doc(db, "séries", String(userData?.grade_id))
            const gradeDoc = await getDoc(gradeRef)
            const gradeData = gradeDoc.exists() ? gradeDoc.data() : null

            return {
                id: userData?.id,
                name: userData?.name,
                password: userData?.password,
                grade_id: gradeData?.name
            }
        }
    }

    return null
}

export async function PostUser(name: string, password: string, grade_id: number) {
    const userRef = doc(collection(db, "usuarios"))
    await setDoc(userRef, {
        name: name,
        password: password,
        grade_id: grade_id
    })
}