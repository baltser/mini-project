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
