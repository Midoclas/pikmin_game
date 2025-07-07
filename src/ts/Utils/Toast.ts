import { Alert } from 'bootstrap';
import { objectHTMLElement } from '../Default';

export default class Toast {

    toastElement = document.querySelector(objectHTMLElement.toast);
    toast: any;

    message: string;
    type: string;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;

        if (this.toastElement) {
            this.toastElement.remove();
        }
        this.createToast();

        this.toast = new Alert(objectHTMLElement.toast);
        this.show();
        this.startTimer();
    }

    createToast() {
        const errorToast = document.createElement('div');
        errorToast.id = 'error-toast';
        errorToast.className = 'alert alert-'+this.type+' alert-dismissible position-absolute bottom-0 start-50 translate-middle fade';

        const messageSpan = document.createElement('span');
        messageSpan.id = 'error-toast-message';

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');

        errorToast.appendChild(messageSpan);
        errorToast.appendChild(closeButton);
        messageSpan.appendChild(document.createTextNode(this.message));

        document.body.appendChild(errorToast);
        this.toastElement = errorToast;
    }

    show() {
        this.toastElement?.classList.add("show");
    }

    hide() {
        
    }

    startTimer() {
        setTimeout(() => {
            this.toast.close();
        }, 5000);
    }
}