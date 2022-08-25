function Data() {
    this.getUsers = function() {
        return axios({
            url: "https://6306121bdde73c0f84522e51.mockapi.io/tabula_api/UserTabula",
            method: "GET",
        });
    };

    this.deleteUserAPI = function(id) {
        return axios({
            url: "https://6306121bdde73c0f84522e51.mockapi.io/tabula_api/UserTabula/" + id,
            method: "DELETE",
        });
    };

    this.addUserAPI = function(user_data) {
        return axios({
            url: "https://6306121bdde73c0f84522e51.mockapi.io/tabula_api/UserTabula",
            method: "POST",
            data: user_data,
        });
    };

    this.getUserAPIById = function(id) {
        return axios({
            url: "https://6306121bdde73c0f84522e51.mockapi.io/tabula_api/UserTabula/" + id,
            method: "GET",
        });
    };

    this.saveUserApi = function(user_data) {
        return axios({
            url: "https://6306121bdde73c0f84522e51.mockapi.io/tabula_api/UserTabula/" + user_data.id,
            method: "PUT",
            data: user_data,
        });
    };
}