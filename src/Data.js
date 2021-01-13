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

    constructor(prevPointList) {
        this.pointList = prevPointList

        if(Object.keys(this.pointList).length === 0) {
            console.log("Initializing pointList.")
            this.add({x: 0, y: 10}, "linear")
            this.add({x: 1, y: 10}, "constant")
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
        return new Data(newList)
    }

    toList() {
        let list = []
        for (const [i, v] of Object.entries(this.pointList)) list.push({value: v, index: i})
        return list
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