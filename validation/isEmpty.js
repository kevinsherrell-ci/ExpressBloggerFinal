const isEmpty = (data) => {
    return (

        data === null ||
        data === "undefined" ||
        typeof data === "string" && data.trim() === "" ||
        Array.isArray(data) && data.length === 0 ||
        typeof data === "object" && Object.keys(data).length === 0

    )
};

module.exports = isEmpty;