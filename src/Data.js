class Data {

    constructor() {
        this.functionList = [{
            xMin: 0,
            fun: x => 100*Math.pow(x, 2)
        }]
    }

    [Symbol.iterator]() {
        return this.functionList.values()
    }

    get(x) {
        const prevFun = this.findPrevFun(x)
        return prevFun(x)
    }

    add(x, fun) {
        this.functionList.push({xMin: x, fun: fun})
        this.functionList.sort((a, b) => {
            if(a.xMin < b.xMin) return -1
            else if(a.xMin > b.xMin) return 1
            else console.log("TWO FUNCTIONS AT SAME XMIN POSITION!"); return 0
        })
    }

    findPrevFun(x) {
        //working on the assumption functionList is sorted!!
        let lastFun = this.functionList[0].fun

        for(let i = 1; i < this.functionList.length; i++) {
            if(x >= this.functionList[i].xMin) lastFun = this.functionList[i].fun
            else break
        }

        return lastFun
    }
}


// let test = new Data()
// test.add(0.5, x => 2*x)
// test.add(0.1, x => Math.sin(x))
// console.log(test.get(0.1))
// console.log(test.get(0.6))
// console.log(test.get(0.0))
// console.log(test.get(0.09))

export default Data