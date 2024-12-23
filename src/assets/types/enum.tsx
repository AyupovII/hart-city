// export const enum StatusColor {
//     IMPLEMENTED = '#13A100',
//     NOT_IMPLEMENTED = '#283851',
//     FIXATION_HAS_EXPIRED = '#AE8925',
//     REJECTED = '#B30000',
// }

// export const enum StatusText {
//     "IMPLEMENTED" = 'Реализована',
//     "NOT_IMPLEMENTED" = 'Не реализована',
//     "FIXATION_HAS_EXPIRED" = 'Фиксация истекла',
//     "REJECTED" = 'Отказ',
// }
type StatusType = {
    color: string;
    text: string;
};
export const Status: { [key: string]: StatusType } = {
    IMPLEMENTED: { color: '#13A100', text: 'Реализована' },
    NOT_IMPLEMENTED: { color: '#283851', text: 'Не реализована' },
    FIXATION_HAS_EXPIRED: { color: '#AE8925', text: 'Фиксация истекла' },
    REJECTED: { color: '#B30000', text: 'Отказ' },
};
export const enum AuthorizationStatus {
    Auth = 'auth',
    NoAuth = 'noAuth',
    Unknown = 'unknown'
}