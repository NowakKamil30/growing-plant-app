export interface SnackbarInfo {
    i18nKeyTitle: string;
    isShow: boolean;
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}