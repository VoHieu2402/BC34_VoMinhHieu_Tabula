var newData = new Data();

function getEle(id) {
    return document.getElementById(id);
}

// get data
function fetchData() {
    newData
        .getUsers()
        .then(function(result) {
            renderHTML(result.data);
        })
        .catch(function(error) {
            console.log(error);
        })
}


// render data
function renderHTML(dataAPI) {
    var content = "";

    dataAPI.forEach(function(user) {
        if(user.loaiND == "GV") {
            content += `
            <div class="ex-item col-12 col-md-6 col-lg-3">
                <div class="card cardExperts">
                <div class="image-card">
                    <img
                    src="http://tabula.bold-themes.com/wavy/wp-content/uploads/sites/3/2019/04/${user.hinhAnh}"
                    class="card-img-top"
                    alt="."
                    />
                </div>
                <div class="card-body">
                    <div class="card-text text-center">
                    <h3 class="nationality">${user.ngonNgu}</h3>
                    <h2 class="nameExpert">${user.hoTen}</h2>
                    <p class="description">
                        ${user.moTa}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            `;
        }
    })

    document.querySelector("body > section.lst-experts > div > div").innerHTML = content;
}

// call the function fetchData
fetchData();