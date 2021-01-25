import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    search(objects: Array<any>, searchTerm: string): Array<any> {
        const filteredObjects: Array<any> = []
        if (objects && searchTerm) {
            searchTerm = searchTerm.toLowerCase()
            for (let i = 0; i < objects.length; i++) {
                let objProp: any = ''

                Object.getOwnPropertyNames(objects[i]).some(function (val: any, idx: any, array: any): boolean {
                    let tempObject: any
                    tempObject = objects[i]
                    objProp = tempObject[val]
                    if (objProp) {
                        if (typeof objProp === 'string') {
                            objProp = objProp.toLowerCase()
                        } else if (typeof objProp === 'object') {
                            const newObject: any = objProp
                            if (newObject.name) {
                                objProp = objProp + newObject.name
                            }
                            if (newObject.contractNumber) {
                                objProp = objProp + newObject.contractNumber
                            }
                            if (newObject.crmOrganization && newObject.crmOrganization.name) {
                                objProp = objProp + newObject.crmOrganization.name
                            }
                            objProp = objProp.toString().toLowerCase()
                        } else {
                            objProp = objProp.toString().toLowerCase()
                        }
                        if (objProp.indexOf(searchTerm) >= 0) {
                            filteredObjects.push(tempObject)
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }

                })

            }
        }
        return filteredObjects
    }

    searchBy(objects: Array<any>, searchTerm: string, val: string): Array<any> {
        console.log(val)
        const filteredObjects: Array<any> = []
        if (objects && searchTerm) {
            searchTerm = searchTerm.toLowerCase()
            for (let i = 0; i < objects.length; i++) {
                let objProp: any = ''
                let tempObject: any
                tempObject = objects[i]
                const valList = val.split('.')
                objProp = tempObject
                valList.forEach(v => {
                    if (objProp[v]) {
                        objProp = objProp[v]
                    } else {
                        objProp = ''
                    }
                })
                if (objProp) {
                    if (typeof objProp === 'string') {
                        objProp = objProp.toLowerCase()
                    } else if (objProp instanceof Array) {
                        let searchList = ''
                        objProp.forEach(element => {
                            const newObject: any = element
                            if (newObject.name) {
                                searchList = searchList + newObject.name.toString().toLowerCase()
                            }
                        })
                        objProp = searchList
                    } else {
                        objProp = objProp.toString().toLowerCase()
                    }
                    if (objProp.indexOf(searchTerm) >= 0) {
                        filteredObjects.push(tempObject)
                    }
                }
            }

        }
        return filteredObjects
    }

}

