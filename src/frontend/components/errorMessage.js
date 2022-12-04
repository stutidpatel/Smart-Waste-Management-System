import swal from "sweetalert";

function extractErrorCode(str) {
    console.log("in extract",str);
    str = JSON.stringify(str);
    console.log(str)
    let ans="";
    let firstOccurence, secondOccurence;
    if (str.includes('Nonce too high')) {
        console.log("Nonce too high");
        ans = '\t\tNonce is too High\n Reset your acc using: \n settings-> Advanced-> Reset your account';
    }
    // console.log(str);
    else {
        const delimiter = '___'; //Replace it with the delimiter you used in the Solidity Contract.
        firstOccurence = str.indexOf(delimiter);
        if (firstOccurence === -1) {
            ans = 'An error occured:';
        }
        else {

            secondOccurence = str.indexOf(delimiter, firstOccurence + 1);
            if (secondOccurence === -1) {
                ans = 'An error occured';
            }
            else {
                ans = str.substring(firstOccurence + delimiter.length, secondOccurence);
            }
        }
    }
    swal("Oops", ans, "error");
    //Okay so far
    // return str.substring(firstOccurence + delimiter.length, secondOccurence);
}
export default extractErrorCode;