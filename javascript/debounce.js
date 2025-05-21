export function debounce(func, delay = 0) {
    let timeout= null;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}
