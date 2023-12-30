import { ToastOptions } from "@ngneat/hot-toast";

const defaultToastConfig: ToastOptions<any> = {
    duration: 4000,
    position: 'bottom-center',
    style: {
        backgroundColor: 'var(--toast-bkg)',
        color: 'var(--toast-txt)',
        borderRadius: '30px',
        fontWeight: '400',
        padding: '3px 10px'
    }
}

export const defaultErrorToastConfig: ToastOptions<any> = {
    ...defaultToastConfig,
    style: {
        ...defaultToastConfig.style,
        border: '1.5px solid var(--toast-error)',
    }
}

export const defaultSuccessToastConfig: ToastOptions<any> = {
    ...defaultToastConfig,
    style: {
        ...defaultToastConfig.style,
        border: '1.5px solid var(--toast-success)',
    }
}