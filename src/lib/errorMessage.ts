import { toast } from "react-toastify";

const errorMessage = (message: string) => {
    //console.log("message................error", message);
    const errorMessages = message.split(",");
    errorMessages.forEach((message, index) => {
        setTimeout(() => {
            toast.error(message[0].toUpperCase() + message.slice(1));
        }, 300 * index);
    });
};

export default errorMessage;
