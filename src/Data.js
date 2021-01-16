class Point {
    constructor(px, py, fun) {
        this.p = {x: px, y: py}
        this.fun = fun
    }

    copy() {
        //deep copy
        return new Point(this.p.x, this.p.y, this.fun.bind({}))
    }
}

class Data {

    constructor(prevPointList, initialize) {
        this.pointList = prevPointList  //not actually a list but an object

        if(initialize) {
            console.log("Initializing pointList.")
            this.add({x: 1, y: 10}, "constant")
            this.add({x: 0, y: 10}, "linear")
            //this.replace(0, 20, "linear")
        }

        console.log("Constructed pointList: ", this.pointList)
    }

    copy() {
        //creates deep copy of Data. For React <3
        let newList = {}
        for (const [i, v] of Object.entries(this.pointList)) {
            newList[i] = v.copy()
        }
        return new Data(newList, false)
    }

    reverse() {
        //returns new Data object with points reversed
        let newData = new Data({}, false)
        for(const [i, v] of Object.entries(this.pointList)) {
            if(i === 0) newData.add({x: 1 - v.p.x, y: v.p.y}, "constant")
            else newData.add({x: 1 - v.p.x, y: v.p.y}, "linear")
        }

        return newData
    }

    snap() {
        const snapValue = this.pointList[1].p.y - this.pointList[0].p.y
        let newData = new Data({}, false)

        for(const [i, v] of Object.entries(this.pointList)) {
            if(i === 1) newData.add({x: v.p.x, y: v.p.y + snapValue}, "constant")
            newData.add({x: v.p.x, y: v.p.y + snapValue}, "linear")
        }
        console.log(newData)
        return newData
    }

    toList() {
        let list = []
        for (const [i, v] of Object.entries(this.pointList)) list.push({value: v, index: i})
        return list
    }

    toSortedList() {
        let list = this.toList()
        let sList = list.sort((p1, p2) => {
            if(p1.index < p2.index) return -1
            else if(p1.index > p2.index) return 1
            else return 0
        })
        console.log("sortedList:", sList)
        return sList
    }

    [Symbol.iterator]() {
        return this.pointList.values()
    }

    get(x) {
        const prevPoint = this.findPrevPoint(x)
        if(prevPoint === null) return this.pointList[0].fun(x)  //first point
        return prevPoint.value.fun(x) 
    }

    replace(i, py, type) {
        const p = {x: this.pointList[i].p.x, y: py}
        //this.delete(i)
        this.add(p, type)
        console.log("Post-replace pointList: ", this.pointList)
    }

    add(p1, type) {
        let fun
        if(this.findNextPoint(p1.x) === null) type = "constant"
        switch(type) {
            case "linear":
                const p2 = this.findNextPoint(p1.x).value.p
                fun = x => (x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y
                break;
            case "constant":
                fun = x => p1.y
                break;
            case "none":
                fun = x => 0
                break;
            case "sine":
            default:
                console.log("Function type not supported. Using default function.")
                fun = x => 10
        }
        this.pointList[p1.x] = (new Point(p1.x, p1.y, fun))
        let prevPoint = this.findPrevPoint(p1.x)
        if(prevPoint !== null) this.replace(prevPoint.index, prevPoint.value.p.y, "linear") //type is a guess
    }

    getScale() {
        const mean = Object.values(this.pointList).reduce((a, b) => {return new Point(0, a.p.y + b.p.y, () => 0)}).p.y / Object.keys(this.pointList).length

        return {
            min: mean - 50,
            max: mean + 50
        }
    }

    findNextPoint(x) {
        // find next point relative to x along with the index
        // scans every point in pointList

        let nextPoint = null

        for (const [i, v] of Object.entries(this.pointList)) {
            if(x < v.p.x && (nextPoint === null || v.p.x < nextPoint.value.p.x)) {
                nextPoint = {value: v, index: i}
            }
        }

        return nextPoint
    }

    findPrevPoint(x, canBeX) {
        // find previous point relative to x along with the index
        // scans every point in pointList

        let prevPoint = null

        for (const [i, v] of Object.entries(this.pointList)) {
            if(x > v.p.x && (prevPoint === null || v.p.x > prevPoint.value.p.x)) {
                prevPoint = {value: v, index: i}
            }
        }

        return prevPoint
    }
}

export default Data