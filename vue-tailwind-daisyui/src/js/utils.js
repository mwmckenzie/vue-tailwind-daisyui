
/**
 * Retrieves the next value in an object's values array, cycling back to the beginning if at the end.
 *
 * @param {Object} obj - The object whose values will be iterated.
 * @param {*} currentKey - The current key whose next value is to be retrieved.
 * @return {*} The next value in the object, or null if the currentKey is not found.
 */
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


/**
 * An object or map containing variable aliases.
 * It typically associates alternative names or keys to specific values or properties,
 * allowing for more flexible referencing or shorthand notation within a given context.
 *
 * @type {Object.<string, string>}
 */
import { aliases } from "@/js/constants.js"; // Assuming ES module usage

/**
 * Formats a given string by converting it to lowercase and removing all spaces.
 *
 * @param {string} name - The string to be formatted.
 * @return {string} The formatted string with all characters in lowercase and spaces removed.
 */
function format(name) {
    return name.toLowerCase().replace(/\s+/g, ""); // Case and whitespace insensitive
}

/**
 * Checks if the given `tag` matches the `filter` after formatting the filter
 * and the tag, including alias checks if applicable.
 *
 * @param {string} tag - The tag to be checked against the filter.
 * @param {string} filter - The filter string used to check the tag.
 * @return {boolean} Returns true if the tag matches the filter or its alias matches the filter, otherwise false.
 */
export function isMatch(tag, filter) {
    filter = format(filter);

    const targets = [tag];

    if (tag in aliases) {
        targets.push(...aliases[tag]);
    }

    for (let target of targets) {
        target = format(target);

        if (target.startsWith(filter)) {
            return true;
        }
    }

    return false;
}
