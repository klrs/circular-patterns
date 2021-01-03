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

        if(this.pointList.length === 0) {
            console.log("Initializing pointList.")
            this.add({x: 1, y: 40}, "constant")
            this.add({x: 0, y: 0}, "linear")
            //this.replace(1, 20, "linear")
        }

        console.log("Constructed pointList: ", this.pointList)
    }

    copy() {
        //creates deep copy of Data. For React
        let newList = [...this.pointList].map(e => e.copy())
        return new Data(newList)
    }

    [Symbol.iterator]() {
        return this.pointList.values()
    }

    get(x) {
        const prevPoint = this.findPrevPoint(x)
        if(prevPoint === null) return 0
        return prevPoint.value.fun(x) 
    }

    replace(i, py, type) {
        const p = {x: this.pointList[i].p.x, y: py}
        this.delete(i)
        console.log("Post-delete pointList: ", this.pointList)
        this.add(p, type)
        console.log("Post-add pointList: ", this.pointList)
    }

    delete(i) {
        //not tested
        // if(i === 0) { console.log("Cannot remove first point!"); return this.pointList; }
        // else if(i === this.pointList.length - 1) { console.log("Cannot remove last point!"); return this.pointList; }
        // else {
            console.log("Deleted point: ", this.pointList[i])
            this.pointList.splice(i, 1)
        //}
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
        this.pointList.push(new Point(p1.x, p1.y, fun))
    }

    findLimitPoints() {
        let limPoints = {left: null, right: null}

        for(let i = 0; i < this.pointList.length; i++) {
            if(this.pointList[i].p.x === 0) limPoints.left = {value: this.pointList[i], index: i}
            else if(this.pointList[i].p.x === 1) limPoints.right = {value: this.pointList[i], index: i}
        }

        return limPoints
    }

    findNextPoint(x) {
        // find next point relative to x along with the index
        // scans every point in pointList

        let nextPoint = null
        for(let i = 0; i < this.pointList.length; i++) {
            if(x < this.pointList[i].p.x && (nextPoint === null || this.pointList[i].p.x < nextPoint.value.x)) {
                nextPoint = {value: this.pointList[i], index: i}
            }
        }

        if(nextPoint === null) console.log("No next point found.")
        return nextPoint
    }

    findPrevPoint(x) {
        // find previous point relative to x along with the index
        // scans every point in pointList

        let prevPoint = null

        for(let i = 0; i < this.pointList.length; i++) {
            if(x > this.pointList[i].p.x && (prevPoint === null || this.pointList[i].p.x > prevPoint.value.x)) {
                prevPoint = {value: this.pointList[i], index: i}
            }
        }

        if(prevPoint === null) console.log("No previous point found.")
        return prevPoint
    }
}

export default Data