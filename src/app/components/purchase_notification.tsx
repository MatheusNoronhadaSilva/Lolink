import Swal from "sweetalert2";
import { GetAllAdmins } from "../../../functions/admin"
export default function PurchaseNotification() {

    const adminsName = ["admin", "admin2", "admin3"];

    return (
        Swal.fire({
            title: "Compra realizada com sucesso!",
            text: "Obrigado por comprar conosco.",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          })
    );
}