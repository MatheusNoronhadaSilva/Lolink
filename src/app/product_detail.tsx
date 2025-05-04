import Container from "./components/container";
import Caneta from "../assets/caneta.png"
import Image from "next/image";
export default function ProductDetail(){

    return(
        <Container>
            <Image className="h-1/3 w-full" src={Caneta} alt="Caneta"/>
        </Container>
    )
}