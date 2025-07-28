export function filterDataByRange(area: { date: string, price: number }[], range: string = "1Y") {
    const currentDate = new Date();
    //console.log("data: ", area)
    //console.log("range: ", range)
    // Helper function to convert date string to Date object
    const parseDate = (dateStr: string) => new Date(dateStr);

    // Helper function to calculate the date for a specific range (3M, 6M, 1Y)
    const getDateRange = (range: string): Date => {
        const date = new Date();
        switch (range) {
            case "3M":
                date.setMonth(date.getMonth() - 3);
                break;
            case "6M":
                date.setMonth(date.getMonth() - 6);
                break;
            case "1Y":
                date.setFullYear(date.getFullYear() - 1);
                break;
            default:
                throw new Error("Invalid range");
        }
        return date;
    };

    // Get the date cutoff based on the range
    const dateCutoff = getDateRange(range);

    // Filter the area data based on the date range
    return area.filter(item => parseDate(item.date) >= dateCutoff);
}

