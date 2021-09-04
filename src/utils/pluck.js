
export const pluck = (arrayOfObjects, key) => {
    return arrayOfObjects.map(object => {
        return object[key];
    })
}
