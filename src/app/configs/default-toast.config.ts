import { ToastOptions } from "@ngneat/hot-toast";

export const defaultToastConfig: ToastOptions<any> = {
    duration: 4000,
    position: 'bottom-center',
    style: {
        backgroundColor: 'var(--toast-bkg)',
        color: 'var(--toast-txt)',
        borderRadius: '30px',
        border: '1.5px solid var(--toast-error)',
        fontWeight: '400',
        padding: '3px 10px'
    }
}