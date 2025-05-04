"use client";

import Container from "@/app/components/container";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Caneta from "@/assets/caneta.png";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import PurchaseNotification from "@/app/components/purchase_notification";
import { GetProductsInfoById } from "../../../../functions/product";
import type { Product } from "../../../../functions/product";
import type { Admin } from "../../../../functions/admin";
import { handleClientScriptLoad } from "next/script";
import Swal from "sweetalert2";
import logo from "@/assets/logo.png";
import { GetAllAdmins } from "../../../../functions/admin";
import Loading from "@/app/components/loading";
import emailjs from 'emailjs-com';
import { SignUpUser } from "@/app/components/signUp_user";
import { PurchaseProduct } from "@/app/components/purchase_product";


export default function ProductDetail() {

    const [purchase, setPurchase] = useState(false);
    const [product, setProduct] = useState<Product | null>(null)
    const [admins, setAdmins] = useState<Admin[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantityColors, setQuantityColors] = useState<{[key: number]: { quantity: number, color: string}}>({});
    const params = useParams();
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    function handleAddQuantityColor(colorId: number, colorName: string) {
        setQuantityColors((prevState) => {
            return {
                ...prevState,
                [colorId]: {
                    quantity: prevState[colorId]?.quantity + 1 || 1,
                    color: colorName

                }
            }
        })
    }

    function handleRemoveQuantityColor(colorId: number) {
        setQuantityColors((prevState) => {
            return {
                ...prevState,
                [colorId]: {
                    ...prevState[colorId],
                    quantity: Math.max(prevState[colorId]?.quantity - 1, 0)
                }
            }
        })
    }

    useEffect(() => {

        console.log(params);
        if (!params?.slug) return;

        const slug = Array.isArray(params.slug) ? params.slug.join("-") : params.slug;
        const [id, ...nomeArray] = slug.split("-");
        console.log(id, nomeArray);

        async function handleGetDatas(id: number) {
            console.log("pegando dados do produto", id);

            const adminsData = await GetAllAdmins()
            const product = await GetProductsInfoById(id)

            setProduct(product)
            setAdmins(adminsData)
            setLoading(false)

            const initialQuantity: { [key: number]: { quantity: number; color: string } } = {};
            if (product?.color) {
                product.color.forEach((color) => {
                    initialQuantity[color.id] = { quantity: 0, color: color.name || "" };
                });
            }
            setQuantityColors(initialQuantity);

        }

        handleGetDatas(Number(id))
    }, [params?.slug])

    useEffect(() => {
        if (!purchase) return;

        if (Object.values(quantityColors).every(({ quantity }) => quantity === 0)) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Selecione ao menos uma cor para adicionar ao carrinho.",
            });
            return;
        }
        
        if (product && admins) {
            PurchaseProduct(product, admins, quantityColors).then(() => {
                setPurchase(false);
            });
        }

    }, [purchase]);

    function handleAddToCart() {

        if (Object.values(quantityColors).every(({ quantity }) => quantity === 0)) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Selecione ao menos uma cor para adicionar ao carrinho.",
            });
            return;
        } else {
            SignUpUser()
        }


    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <Image className="w-full h-2/5" src={Caneta} alt="Caneta" />
                    <div className="flex-1 absolute w-full bottom-0 h-4/6 rounded-t-[50px] bg-white flex flex-col items-center py-10 px-10 overflow-y-auto">
                        <hgroup className="flex flex-col items-center gap-2">
                            <h1 className="text-4xl">{product?.name}</h1>
                            <p className="text-xl text-center">{product?.description}</p>
                        </hgroup>
                        <div className="w-full mt-16">
                            <h1 className="text-4xl w-full text-center">Cores disponíveis</h1>
                            <p className="pl-3 pt-3">Quantidade a comprar</p>
                            <div className="flex flex-col w-full gap-5 h-[360px] overflow-hidden overflow-y-scroll pb-6">
                                {product?.color.map((color) => (
                                    <div key={color?.id} className="flex w-full min-h-16 justify-between px-6">
                                        <div className="flex w-1/4 h-full gap-5 items-center ">
                                            <FaMinus size={20} color="#000" onClick={ () => handleRemoveQuantityColor(color.id)} />
                                            <div className="flex-2 flex items-center justify-center border-2 h-full rounded-2xl border-gray-400">
                                                <h1 className="text-2xl">{quantityColors[color.id].quantity}</h1>
                                            </div>
                                            <FaPlus size={20} color="#000" onClick={ () => handleAddQuantityColor(color.id, color.name)} />
                                        </div>
                                        <div className="h-full w-1/4 justify-between flex items-center">
                                            <p className="text-lg">{color?.quantity} disp.</p>
                                            <div className="h-12 w-12 border-2 border-black" style={{ backgroundColor: color.hex_color}} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full mt-auto pt-10 flex flex-col gap-6">
                            <button onClick={() => setPurchase(true)} className="w-full h-24 bg-[var(--tertiary)] rounded-2xl text-white font-bold text-3xl">Comprar</button>
                            <button onClick={() => handleAddToCart()} className="w-full h-24 border-2 border-[var(--tertiary)] rounded-2xl font-bold text-[var(--tertiary)] text-3xl">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}
