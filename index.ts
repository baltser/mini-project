
class ResultBlock{
    private i: number = 0;
    private hashResult: string | undefined;
    private captcha: string | undefined;
    constructor(private readonly text: string, private readonly key: string) {
        this.text = text;
        this.key =  key;
    }
    private  calculateHashWithNonce(): void {
        this.captcha = this.text + this.i.toString()
    }
    private async hash(): Promise<void> {
        const data: Uint8Array =  new TextEncoder()
            .encode(this.captcha);
         this.hashResult = Array.from(new Uint8Array(
             await crypto.subtle.digest("SHA-256", data)))
                .map((b:number) => b.toString(16)
                 .padStart(2, "0"))
                .join("");
    }
    public async mine(): Promise<void> {

        while (this.hashResult?.slice(0, this.key.length) !== this.key){
            this.calculateHashWithNonce()
            await this.hash()
            this.i++ ;
        }
        console.log(this.hashResult)
    }
}
 new ResultBlock('Hallo', 'c5ca3').mine()














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