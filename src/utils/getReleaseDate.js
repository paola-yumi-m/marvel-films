const getReleaseDate = (data, id) => {
    return data[id]['release_date'].slice(0, 4);
}

module.exports = { getReleaseDate }