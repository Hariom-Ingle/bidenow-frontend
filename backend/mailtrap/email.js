import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplete.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";


/********************* USER VERIFICATION EMAIL ********************    */
export const sendverificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({

            from: sender,
            to: recipient,
            subject: "verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email send Successfully", response);
        return response;
    } catch (error) {
        console.log("Email send Failed", error);
        throw new Error(`Error sending email: ${error}`);
    }
}


/********************* USER Welcome EMAIL ********************    */

export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "d6f3831d-f9ab-4842-a40e-96859e24b336",
            template_variables: {
                "company_info_name": "BidNow",
                "name": username
            }
        });
        console.log("Email send Successfully", response);
        return response;
    } catch (error) {
        console.log("Email send Failed", error);
        throw new Error(`Error sending email: ${error}`);
    }
}

/********************* SEND RESET PASSWORD EMAIL ********************    */

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
        console.log("Email send Successfully", response);
        return response;
    } catch (error) {
        console.log("Email send Failed", error);
        throw new Error(`Error sending email: ${error}`);
    }
}

/********************* SEND RESET PASSWORD SUCCESS EMAIL ********************    */

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Email send Successfully", response);
        return response;
    } catch (error) {
        console.log("Email send Failed", error);
        throw new Error(`Error sending email: ${error}`);
    }
}       