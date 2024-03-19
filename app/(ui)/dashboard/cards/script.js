function getData() {

    let totalUsers = Math.floor(Math.random() * (15000 - 2000 + 1)) + 2000;
    let totalSales = Math.floor(Math.random() * (15000 - totalUsers + 1)) + totalUsers;
    let totalVisits = Math.floor(Math.random() * (15000 - totalSales + 1)) + totalSales;

    if (totalVisits < totalUsers) {
        [totalUsers, totalVisits] = [totalVisits, totalUsers];
    }

    console.log(totalUsers, totalSales, totalVisits);

    return { totalUsers, totalSales, totalVisits };
}

    const returnedData = getData();

    console.log({returnedData});

export { returnedData };