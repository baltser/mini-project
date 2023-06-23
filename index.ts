import * as crypto from "crypto";
class ResultBlock{
    private i: number = 0;
    private hashResult: string = this.hash;
    constructor(private readonly text: string, private readonly key: string) {
        this.text = text;
        this.key =  key;
    }
    private get hash() {
        const data:string = this.text + this.i;
        console.log(data)
       return  this.hashResult = crypto
            .createHash('sha256')
            .update(data)
            .digest('hex')
    }
    public mine(): { index: number, hashResult: string } {

        while (!this.hashResult.startsWith(this.key)){
            this.i++ ;
            this.hash;
        }
        return {
            hashResult : this.hashResult,
           index: this.i
        }
    }
}
const block = new ResultBlock('Hello World', '000')
const { index, hashResult } = block.mine()
console.log(index, hashResult)














const text = 'halo'
const hash = async (input: string): Promise<string> => {
    const encoder  = new TextEncoder();
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    // console.log(hashHex)
    return hashHex;
}
const calculateHashWithNonce = async (nonce: number): Promise<string>  => {
        return nonce.toString() + text
}


async function mine() {
    let i = 0;
    while (i < 1000000) {
        console.log(await calculateHashWithNonce(i))
        if ([await hash(await calculateHashWithNonce(i))][0].slice(0, 2) == '00'){

            i = 1000000
        }
        i++
    }

}
// mine()