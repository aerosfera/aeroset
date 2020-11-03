export interface SnackbarEvent {
    message: string,
    alertType : "error" | "warning" | "info" | "success"
    callback? : Function
}