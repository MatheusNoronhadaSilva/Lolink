import Swal from "sweetalert2";
import { GetAllGrades } from "../../../functions/grade";
import { PostUser, GetAllUsers } from "../../../functions/user";
import type { User } from "../../../functions/user";
import type { Grade } from "../../../functions/grade";
export async function SignUpUser() {

    async function handleGetDatas() {

        Swal.fire({
            title: "Aguarde",
            text: "Carregando...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
        })

        const grades = await GetAllGrades()
        const users = await GetAllUsers()

        if (grades && users) {


            const elementaryUsers = []
            const highUsers = []

            for (const grade of grades) {

                if (grade.name.includes("fund 2")) {
                    elementaryUsers.push(grade)
                } else if (grade.name.includes("E.M")) {
                    highUsers.push(grade)
                }

            }

            console.log("Grades:", grades)
            console.log("Users:", users)

            console.log("Elementary Users:", elementaryUsers)
            console.log("High Users:", highUsers)
    
            if (!grades || !users || !elementaryUsers || !highUsers) {
    
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Ocorreu um erro ao carregar os dados."
                })
    
                return
            } else {
        
                handleSendSwals(elementaryUsers, highUsers, users)

            }

        }




    }

    handleGetDatas()

    function handleSendSwals(elementaryUsers: Grade[], highUsers: Grade[], users: User[]) {

        Swal.close()

        Swal.fire({
            icon: "info",
            title: "Cadastre-se ou logue-se",
            text: "para ter acesso ao carrinho.",
            confirmButtonText: "Cadastre-se",
            confirmButtonColor: "green",
            denyButtonText: "Logar",
            denyButtonColor: "#8D78FF",
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isDismissed) {
                Swal.close()
            } else if (result.isConfirmed) {

                const { value: name } = await Swal.fire({
                    title: "Insira seu nome",
                    input: "text",
                    preConfirm(inputValue) {
                        if (!inputValue) {
                            Swal.showValidationMessage("Por favor, insira seu nome.")
                        }
                        return inputValue
                    },
                })

                const { value: grade } = await Swal.fire({
                    input: "select",
                    title: "Selecione sua série",
                    inputOptions: {
                        FundamentalII: Object.fromEntries(
                          elementaryUsers.map((grade) => [grade.id, grade.name])
                        ),
                        EnsinoMedio: Object.fromEntries(
                          highUsers.map((grade) => [grade.id, grade.name])
                        ),
                      }
                      
                })

                const { value: password } = await Swal.fire({
                    title: "Insira sua senha",
                    input: "password",
                    inputLabel: "De 4 a 20 caracteres",
                    preConfirm(inputValue) {
                        if (!inputValue) {
                            Swal.showValidationMessage("Por favor, insira sua senha.")
                        }
                        return inputValue
                    },
                })

                Swal.fire({
                    icon: "success",
                    title: "Cadastro realizado com sucesso!",
                    text: `Agora você tem acesso ao carrinho!`,
                    confirmButtonText: "OK",
                }).then(() => {

                    try {
                        PostUser(name, password, Number(grade))
                    } catch (error) {
                        console.error("Erro ao cadastrar usuário:", error)
                        Swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Ocorreu um erro ao cadastrar o usuário.",
                        })
                    }
                })

            } else {
                const { value: password } = await Swal.fire({
                    title: "Logue-se",
                    text: "Insira sua senha",
                    input: "password",
                    preConfirm(inputValue) {
                        if (!inputValue) {
                            Swal.showValidationMessage("Por favor, insira sua senha.")
                        }
                        return inputValue
                    }
                })

                for (const user of users) {
                    if (password == user.password) {
                        Swal.fire({
                            icon: "success",
                            title: "Logado com sucesso!",
                            text: `Agora você tem acesso ao carrinho!`,
                        })
                    }
                }
            }
        })
    }
}