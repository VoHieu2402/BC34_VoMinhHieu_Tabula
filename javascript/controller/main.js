var newData = new Data();

function getEle(id) {
    return document.getElementById(id);
}

// get data
function fetchData() {
    // pending and show loading
    // getEle("loading").style.display = "block";

    newData
        .getUsers()
        // Thành công thì then, trả về data
        .then(function(result) {
            // hide loading
            renderHTML(result.data);
            // getEle("loading").style.display = "none";
        })
        // Request thất bại thì catch error
        .catch(function(error) {
            // hide loading
            console.log(error);
            // getEle("loading").style.display = "none";
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