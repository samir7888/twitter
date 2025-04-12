export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    const createdDate = new Date(dateString).toLocaleDateString(
        "en-US",
        options
    );
    const currentDate = new Date().toLocaleDateString("en-US", options);
    const diff =
        new Date(currentDate).getTime() - new Date(createdDate).getTime();
    const diffInHour = Math.floor(diff / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    return diffInHour < 1
        ? `${diffInMinutes} min`
        : `${diffInHour} h`;
}