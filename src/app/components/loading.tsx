import LoadingIcon from "@/assets/loadingIcon.gif";
import Image from "next/image";

export default function Loading() {

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-white">
            <Image src={LoadingIcon} alt="loadingIcon"/>
        </div>
    )
}