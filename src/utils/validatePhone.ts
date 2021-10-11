/**
 * 
 * @param phone 
 * @returns true if phone is valid, false if it's not
 */
export const unformmatPhone = (phone: string) => {
    const phoneUnformatted = phone.replace(/ /g, '').replace('(', '').replace(')', '').replace('-', '').replace(/ /g, '');
    return phoneUnformatted;
}
const isValidPhone = (phone: string) => {
    const phoneUnformatted = unformmatPhone(phone);
    if (phone !== null || phone !== undefined) {
        if (phoneUnformatted.length >= 10)
            return true;
        else if (phoneUnformatted.length > 0)
            return false;
        else
            return true;
    }
    else
        return false;

}

export default isValidPhone