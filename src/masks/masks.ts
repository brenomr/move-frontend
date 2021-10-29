export const maskCPF = (value: string) => {
    if (!value)
        return value

    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}
export const maskPhoneNumber = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
}
export const maskCNPJ = (value: string) => {
    if (!value)
        return value

    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export const maskCEP = (value: string) => {
    if (!value)
        return value

    return value
        .replace(/\D/g, '')
        .replace(/(\d{8})\d+?$/, '$1')
}