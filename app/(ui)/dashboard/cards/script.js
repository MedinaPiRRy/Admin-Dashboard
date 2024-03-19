export default function getData() {

    let totalUsers = Math.floor(Math.random() * (15000 - 2000 + 1)) + 2000;
    let totalSales = Math.floor(Math.random() * (15000 - totalUsers + 1)) + totalUsers;
    let totalVisits = Math.floor(Math.random() * (15000 - totalSales + 1)) + totalSales;

    if (totalVisits > totalUsers) {
        [totalVisits, totalUsers] = [totalUsers, totalVisits];
    }

    return { totalUsers, totalSales, totalVisits };
}