
const text = 'hallo'
const hash = async (input: string): Promise<string> => {
    const encoder  = new TextEncoder();
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    console.log(hashHex)
    return hashHex;
}
const calculateHashWithNonce = async (nonce: number): Promise<string>  => {
        return nonce.toString() + text
}
async function mine() {
    let i = 0;
    while (i < 10000) {

        if ([await hash(await calculateHashWithNonce(i))][0].slice(0, 2) == '00'){
            console.log(i)
            i = 10000
        }


        i++
    }

}
mine()