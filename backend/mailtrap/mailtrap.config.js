import {MailtrapClient} from "mailtrap";
import dotenv from "dotenv";
dotenv.config("../.env");
 
 

export const mailtrapClient = new MailtrapClient({
  token:  "7fd9c4d3bc31adfcb04de8f3646008cd",
  endpoint: "https://api.mailtrap.io",
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
 