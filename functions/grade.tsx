import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export type Grade = {
    id: string;
    name: string;
}

export async function GetAllGrades(): Promise<Grade[]> {
    const gradeSnap = await getDocs(collection(db, "séries"))
    const grades = await Promise.all(gradeSnap.docs.map(async(gradeDoc) => {
        const gradeData = gradeDoc.data()

        return {
            id: gradeData.id,
            name: gradeData.name
        }
    }))

    return grades
}