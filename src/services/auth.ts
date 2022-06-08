import {v4 as uuid} from 'uuid'

type SigInRequestData = {
    email: string;
    password: string;
}

const delay = (amount = 750) => new Promise (resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SigInRequestData) {
    await delay()

    return {
        token: uuid(),
        user: {
            name: "Joaozin",
            email: "joaozin@email.com",
            avatar_url: 'https://github.com/JoaoVitorLima242.png'
        }
    }
}

export async function recoverUserInformation() {
    await delay()
    return {
        user: {
            name: "Joaozin",
            email: "joaozin@email.com",
            avatar_url: 'https://github.com/JoaoVitorLima242.png'
        }
    }
}