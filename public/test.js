

function flattenArray(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
        
            // If element is an array,
            //  recursively flatten it
            result = result
                .concat(flattenArray(arr[i]));
        } else {
        
            // Otherwise add the element 
            // to the flattened array
            result
                .push(arr[i]);
        }
        console.log(result.pop());
    }

    return result;
}

const arr=[1, 2, 3, 4, [5, 6, 7]];
const flattenedArray = flattenArray(arr);
