import Swal from "sweetalert2";
import type { Product } from "../../../functions/product"
import type { Admin } from "../../../functions/admin";
import { doc, getDoc } from "firebase/firestore";
import emailjs from 'emailjs-com';
import { GetAllGrades } from "../../../functions/grade";

export async function PurchaseProduct(product: Product, admins: Admin[], quantityColors: { [key: number]: { quantity: number, color: string } }) {

    const grades = await GetAllGrades()

    const elementaryUsers = []
    const highUsers = []

    for (const grade of grades) {

        if (grade.name.includes("fund 2")) {
            elementaryUsers.push(grade)
        } else if (grade.name.includes("E.M")) {
            highUsers.push(grade)
        }

    }

    const { value: grade } = await Swal.fire({
        title: "Selecione sua turma",
        input: "select",
        inputOptions: {
            FundII : Object.fromEntries(elementaryUsers.map((grade) => [grade.id, grade.name])),
            EM: Object.fromEntries(highUsers.map((grade) => [grade.id, grade.name])),
        },
        showCancelButton: true,
    });

    if (grade) {

        const { value: name } = await Swal.fire({
            title: "Qual seu nome?",
            inputLabel: "será usado para identificação",
            input: "text",
            preConfirm(inputValue) {
                if (!inputValue) {
                    Swal.showValidationMessage("Por favor, digite seu nome.");
                }
            },
        });
        if (name) {
            Swal.fire({
                title: "Obrigado pela compra!",
                html: `
                            <div class="flex flex-col items-center gap-2">
                              <p>Seu pedido será entregue por uma das adms:</p>
                              ${admins?.map(admin => `<p class="font-bold">${admin.name}</p>`).join('')}
                            </div>`,
                icon: "success",
            }).then(() => {

                const colorDetails = Object.values(quantityColors).map(({ color, quantity }) => `${color}: ${quantity}`).join(", ");
                const totalPrice = Object.values(quantityColors).reduce((total, { quantity }) => {
                    // Multiplicando a quantidade pela price do produto
                    return total + (quantity * (product?.price || 0));
                }, 0);
                console.log(grade, name, product?.name, product?.price, colorDetails);

                if (admins && product) {
                    for (const admin of admins) {
                        sendRequest(product.price, grade, name, admin.email, product.name, product.price, colorDetails, totalPrice);
                    }
                }
            });
        }
    }

    function sendRequest(productPrice: number, grade: string, userName: string, adminEmail: string, product_name: string, product_price: number, colorsDetails: string, totalPrice: number) {

        emailjs.send('service_5wbui6r', 'template_g11kmwv', {
            email: adminEmail, // ← aqui é string, não objeto
            from_name: 'Lolink',
            reply_to: 'lolinkcp@email.com',
            product_name: product_name, // substituí o `product?.name` por `product_name` que já é argumento
            units: colorsDetails,
            product_price: productPrice,
            total_price: totalPrice,
            user_name: userName,
            user_grade: grade,
        }, 'GVlbcI3_i1icJFNIk')
            .then((result) => {
                console.log('Email enviado com sucesso:', result.text);
            }, (error) => {
                console.log('Erro ao enviar:', error.text);
            });

    }
}