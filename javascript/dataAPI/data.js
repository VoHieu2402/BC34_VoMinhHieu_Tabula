function Data() {
    this.getUsers = function() {
        return axios({
            url: "https://6306121bdde73c0f84522e51.mockapi.io/tabula_api/UserTabula",
            method: "GET",
        })
    };
}