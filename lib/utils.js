let utils = {
    isString: x => typeof x === 'string',
    addHttp: url => cleanUpSpace(addHttpUrl(url)),
    isObject: obj => (isObj(obj)),
    isArr: arr => (isArrNotEmpty(arr)),
    hasOwn: (obj, key) => Object.prototype.hasOwnProperty.call(obj, key),
    rangeSpeed: time => rangeSpeed(time)
}

const cleanUpSpace = url => url.replace(/ /g, '')
const checkHttpOrHttps = url => /^(http|https):/i.test(url)
const addHttpUrl = url => checkHttpOrHttps(url) ? url : 'http://' + url

const isObj = obj => typeof obj === 'object' && isObjectNotEmpty(obj)

const isObjectNotEmpty = obj => Object.keys(obj).length
const isArrNotEmpty = arr => arr.length

const rangeSpeed = (time) => {
    switch (true) {
        case time < 100 :
            return 100
        case  time > 101 && time < 200 :
            return 200
        case  time > 201 && time < 300 :
            return 300
        case  time > 301 && time < 400 :
            return 400
        case  time > 401 && time < 500 :
            return 500
        case  time > 501 && time < 600 :
            return 600
        case  time > 601 && time < 700 :
            return 700
        case  time > 701 && time < 800 :
            return 800
        case  time > 801 && time < 900 :
            return 900
        case  time > 901 && time < 1000 :
            return 1000
        case  time > 1001 && time < 1200 :
            return 1200
        case  time > 1201 && time < 1400 :
            return 1400
        case  time > 1401 && time < 1600 :
            return 1600
        default:
            return 2000
    }
}

module.exports = utils