const sendCategory = () => {
    let categories = [];
    for(let i=1;i<=71;i++) {
        let value = 1950 + i;
        categories.push({
            key: i,
            value: JSON.stringify(value),
            text: JSON.stringify(value)
        })
    }

    return categories;
}

module.exports = { sendCategory };