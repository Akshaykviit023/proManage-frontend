export function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);

    const day = date.getDate();
    const suffix = (day) => {
        if (day > 3 && day < 21) return 'th'; 
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${formattedDate}${suffix(day)}`;
}