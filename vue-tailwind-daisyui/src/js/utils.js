
export function getNextValue(obj, currentKey) {
    const values = Object.values(obj);
    console.log(values);
    const index = values.indexOf(currentKey);

    if (index === -1) {
        return null; // currentKey not found
    }

    const nextIndex = (index + 1) % values.length;
    return values[nextIndex];
}