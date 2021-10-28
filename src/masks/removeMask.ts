export const removeMask = (value: string) => {
    if (!value)
        return value
        
    return value
        .replace(/\D/g, '')
}