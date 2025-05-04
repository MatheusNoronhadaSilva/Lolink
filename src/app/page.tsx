import Image from "next/image";
import { IoSearch } from "react-icons/io5"; // Exemplo de ícone de busca
import { IoInformationCircle } from "react-icons/io5";
import Nuvem from "../assets/nuvem.png"
import Caneta from "../assets/caneta.png"
import CardsProduto from "./components/cards_produto";
import Container from "./components/container";
export default function Home() {

  return (
    <Container>
      <form className="w-full min-h-32 gap-5 flex items-center justify-center bg-[var(--primary)]">
        <input className="border-4 h-1/2 w-96 border-black rounded-2xl text-black px-4" type="search" id="search" name="query" placeholder="Digite sua pesquisa" autoComplete="on" />
        <IoSearch size={50} color="black" type="submit" />
      </form>
      <header className="bg-[var(--secondary)] min-h-[700px] w-full flex flex-col items-center pt-20">
        <h1 className="text-8xl !text-[var(--tertiary)]">Lolink</h1>
        <p className="text-4xl w-2/3 text-center">Canetas, lápis, canetinhas e marca texto</p>
        <Image className="h-[350px] mt-auto" src={Nuvem} alt="Nuvem" />
      </header>
      <main className="flex-1 bg-white pb-32">
        <div className="flex flex-col gap-12">
          <hgroup className=" w-full flex flex-col items-center">
            <h1 className="text-5xl">Categorias</h1>
            <p className="text-2xl">Escolha entre os diferentes tipos de produtos</p>
          </hgroup>
          <div className=" flex justify-between px-8">
            <figure className=" relative cursor-pointer overflow-hidden h-44 w-52 rounded-2xl">
              <div className=" absolute z-10 h-full w-full bg-[var(--opacity)] flex flex-col items-center justify-center gap-4">
                <h1 className="!text-white text-4xl">Canetas</h1>
                <p className="!text-white font-extralight underline">Ver mais</p>
              </div>
              <Image className="h-full w-full -z-10" src={Caneta} alt="Caneta" />
            </figure>
            <figure className=" relative cursor-pointer overflow-hidden h-44 w-52 rounded-2xl">
              <div className=" absolute z-10 h-full w-full bg-[var(--opacity)] flex flex-col items-center justify-center gap-4">
                <h1 className="!text-white text-4xl">Canetas</h1>
                <p className="!text-white font-extralight underline">Ver mais</p>
              </div>
              <Image className="h-full w-full -z-10" src={Caneta} alt="Caneta" />
            </figure>
            <figure className=" relative cursor-pointer overflow-hidden h-44 w-52 rounded-2xl">
              <div className=" absolute z-10 h-full w-full bg-[var(--opacity)] flex flex-col items-center justify-center gap-4">
                <h1 className="!text-white text-4xl">Canetas</h1>
                <p className="!text-white font-extralight underline">Ver mais</p>
              </div>
              <Image className="h-full w-full -z-10" src={Caneta} alt="Caneta" />
            </figure>
          </div>
          <hgroup className=" w-full flex flex-col items-center">
            <h1 className="text-5xl">Produtos</h1>
            <p className="text-2xl">Veja nossos produtos</p>
          </hgroup>
            <CardsProduto/>
        </div>
      </main>
    </Container>
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2 tracking-[-.01em]">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
    //           src/app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li className="tracking-[-.01em]">
    //         Save and see your changes instantly.
    //       </li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
