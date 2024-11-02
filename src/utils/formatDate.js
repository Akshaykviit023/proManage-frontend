export function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    // Options for formatting
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);

    // Get the day to determine the suffix (st, nd, rd, th)
    const day = date.getDate();
    const suffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // Catch 11th-13th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${formattedDate}${suffix(day)}`;
}