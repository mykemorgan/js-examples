export default verifyLuhn;


function verifyLuhn(number) {
    if (isNaN(number)) { return false; }

    return true;
}
