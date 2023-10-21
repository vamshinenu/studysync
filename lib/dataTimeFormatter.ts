export function formatDate(timestamp: string | number | Date) {
    const dateObj = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // @ts-ignore
    return dateObj.toLocaleDateString("en-US", options);
}
export function formatTime(timestamp: string | number | Date) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    // @ts-ignore
    hours = (hours < 10) ? "0" + hours : hours;
    // @ts-ignore
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
}