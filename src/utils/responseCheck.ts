const responseCheck = (response: any) => {
    if (response && response.status && response.status.toString()[0] === '2')
        return true;
    else
        return false;
}
export default responseCheck;