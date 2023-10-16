import nodemailer from 'nodemailer';


type options = {
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string
}

const mailTranporter  = nodemailer.createTransport({
    pool: true,
    service: "Yandex",
    auth: {
        user: process.env.MAIL, 
        pass: process.env.MAIL_PASSWORD
    }
})
export const mailer = async (options : options) : Promise<void> =>{
    try{
        let res = await mailTranporter.sendMail(options);
        if (res.response.slice(0, 3) !== '250') {
        throw new Error(res.response)
    }
    }
    catch(e){
        console.log(`Error with sending mail.\n Response ${e}`)
    }
    
}

