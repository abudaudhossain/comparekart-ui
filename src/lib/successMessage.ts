import { toast } from "react-toastify";

const successMessage = (message: string) => {
    //console.log("mesage")
    const errorMessages = message.split(",");
    errorMessages.forEach((message, index) => {
        setTimeout(() => {
            toast.success(message[0].toUpperCase() + message.slice(1));
        }, 300 * index);
    });
};

export default successMessage;
