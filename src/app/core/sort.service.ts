import { Injectable } from '@angular/core'

@Injectable()
export class SortService {

    public sortObjects(objects: Array<any>, asc: boolean, prop: string): any {
        const propList = prop.split(/\./)
        if (objects) {
            objects = objects.sort((a: any, b: any): number => {
                let aProp: any
                let bProp: any
                if (propList.length === 1) {
                    aProp = a[prop]
                    bProp = b[prop]
                }
                if (propList.length === 2) {
                    const prop0 = propList[0]
                    const prop1 = propList[1]
                    aProp = a[prop0][prop1]
                    bProp = b[prop0][prop1]
                }
                if (propList.length === 3) {
                    const prop0 = propList[0]
                    const prop1 = propList[1]
                    const prop2 = propList[2]

                    aProp = a[prop0][prop1][prop2]
                    bProp = b[prop0][prop1][prop2]
                }
                if (propList.length === 4) {
                    const prop0 = propList[0]
                    const prop1 = propList[1]
                    const prop2 = propList[2]
                    const prop3 = propList[3]

                    aProp = a[prop0][prop1][prop2][prop3]
                    bProp = b[prop0][prop1][prop2][prop3]
                }
                if (typeof aProp === 'string') {
                    aProp = aProp.toLowerCase()
                }
                if (typeof bProp === 'string') {
                    bProp = bProp.toLowerCase()
                }
                if (asc) {
                    if (aProp < bProp || aProp === null) { return -1 }
                    if (aProp > bProp || bProp === null) { return 1 }
                    return 0
                } else {
                    if (aProp > bProp || bProp === null) { return -1 }
                    if (aProp < bProp || aProp === null) { return 1 }
                    return 0
                }
            })
        }
        return objects
    }
}
