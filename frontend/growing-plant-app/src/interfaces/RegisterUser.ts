export interface RegisterUser {
    usernameRegister: string;
    emailRegister: string;
    firstNameRegister: string;
    lastNameRegister: string;
    passwordRegister: string;
    confirmPasswordRegister?: string;
    isAcceptedDocumentRegister?: boolean;
}