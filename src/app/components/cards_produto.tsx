"use client";

import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importando useRouter
import { IoInformationCircle } from "react-icons/io5";
import Image from "next/image";
import Caneta from "../../assets/caneta.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import {GetProductsInfo} from "../../../functions/product";

type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category_id: number;
    category: string;
  };

export default function CardsProduto() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const router = useRouter(); // Inicializando o roteador
    const [products, setProducts] = useState<Product[]>([]); // Corrigido o nome da variável de estado

    const productsi = [
        {
            id: 1,
            name: "Caneta colorida",
            slug: "caneta-colorida",
            image: Caneta,
            description: "Canetas bic de múltiplas cores...",
            price: 1.99,
            colors: [
                { id: 1, name: "Preto", hex_color: "#000", quantity: 20 },
                { id: 2, name: "Azul", hex_color: "#2d92e3", quantity: 45 },
            ],
        },
        {
            id: 2,
            name: "Caneta azul",
            slug: "caneta-azul",
            image: Caneta,
            description: "Caneta azul, azul caneta...",
            price: 1.99,
            colors: [
                { id: 1, name: "Preto", hex_color: "#000", quantity: 15 },
                { id: 2, name: "Azul", hex_color: "#2d92e3", quantity: 35 },
            ],
        },
    ];

    useEffect(() => {
        teste();
    }, []);
    

    async function teste() {
        const products = await GetProductsInfo()
        
        console.log(products);

        setProducts(products)
        
    }

    // async function testeFirebase() {
    //     const produtoRef = doc(db, "produtos", "produtoTeste");
    //     await setDoc(produtoRef, {
    //         name: "Produto Teste",
    //         description: "Descrição aqui",
    //         categoria: "categoria123",
    //         image: "url-imagem",
    //         price: 99.99
    //     });
    
    //     console.log("Produto teste criado/atualizado com sucesso.");
    // }

    return (
        <div className="flex flex-wrap gap-10 px-20">
            {productsi.map((product, index) => (
                <section key={index} className="w-64 flex flex-col py-4 items-center h-[450px] bg-white shadow-[0_10px_13px_rgba(0,0,0,0.25)] rounded-2xl">
                    <div className="flex-1 flex flex-col px-5">
                        <Image className="w-52 h-44" src={product.image} alt="Caneta" />
                        <hgroup className="flex flex-col gap-1">
                            <h2 className="text-[20px]">{product.name}</h2>
                            <div className="flex flex-row w-32 h-9 rounded-2xl justify-evenly px-2 items-center border-gray-400 border-2 bg-white">
                                <div className="h-6 w-6 grid grid-cols-3 gap-[1.7px]">
                                    {product.colors.map((color, idx) => (
                                        <div key={idx} className="w-full h-full" style={{ backgroundColor: color.hex_color }} />
                                    ))}
                                </div>
                                <p className="!text-gray-500 text-[10px]">{product.colors.length} cores disp.</p>
                            </div>
                            <p className="text-[10px]">{product.description}</p>
                        </hgroup>
                        <div className="flex mt-auto items-center gap-5">
                            <h1>R$ {product.price}</h1>
                            <a href={`/product/${product.id}-${product.name}`} className={`flex-1 flex items-center rounded-lg px-2 border-2 cursor-pointer transition-colors duration-300 ${activeIndex === index ? "bg-[var(--tertiary)] border-white text-white" : "border-[var(--tertiary)] text-[var(--tertiary)]"
                                }`}>Saiba mais</a>
                            {/* <a
                                href={`/product/${product.id}-${product.slug}`}
                                className={`flex-1 flex items-center rounded-lg px-2 border-2 cursor-pointer transition-colors duration-300 ${activeIndex === index ? "bg-[var(--tertiary)] border-white text-white" : "border-[var(--tertiary)] text-[var(--tertiary)]"
                                    }`}
                                onMouseDown={() => setActiveIndex(index)}
                                onMouseUp={() => setTimeout(() => setActiveIndex(null), 500)}
                            >
                                <IoInformationCircle
                                    size={50}
                                    className="transition-colors duration-300"
                                    color={activeIndex === index ? "white" : "var(--tertiary)"}
                                />
                                <p className="w-full">Saiba mais</p>
                            </a> */}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
