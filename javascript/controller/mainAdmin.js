var newData = new Data();

// create a validation object
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
};

// get input data
function getUserInfo(isAdd) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    // check validation
    var isValid = true;

    // check TaiKhoan
    if(isAdd==true) {
        isValid &= validation.isNull(taiKhoan,"taiKhoanError","(*) Vui lòng nhập tên tài khoản") &&
            checkAvailability(taiKhoan,"taiKhoanError","(*) Tài khoản này hiện đã tồn tại");
    }

    // check HoTen
    isValid &= validation.isNull(hoTen,"hoTenError","(*) Vui lòng nhập họ tên") &&
        validation.stringCheck(hoTen,"hoTenError","(*) Vui lòng nhập họ tên không chứa ký tự số và ký tự đặc biệt");

    // check MatKhau
    isValid &= validation.isNull(matKhau,"matKhauError","(*) Vui lòng nhập mật khẩu") &&
        validation.passCheck(matKhau,"matKhauError","(*) Vui lòng nhập mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số") && 
        validation.lengthCheck(matKhau,"matKhauError","(*) Vui lòng nhập mật khẩu có độ dài từ 6 đến 8 ký tự",8,6);

    // Check Email
    isValid &= validation.isNull(email,"emailError","(*) Vui lòng nhập email") &&
        validation.mailCheck(email,"emailError","(*) Vui lòng nhập email");

    // Check HinhAnh
    isValid &= validation.isNull(hinhAnh,"hinhAnhError","(*) Vui lòng nhập hình ảnh");

    // Check loaiND
    isValid &= validation.selectionCheck("loaiNguoiDung","loaiNDError","(*) Vui lòng chọn loại người dùng");

    // Check ngonNgu
    isValid &= validation.selectionCheck("loaiNgonNgu","loaiNNError","(*) Vui lòng chọn ngôn ngữ");

    // check moTa
    isValid &= validation.isNull(moTa,"moTaError","(*) Vui lòng nhập mô tả") &&
        validation.lengthCheck(moTa,"moTaError","(*) Vui lòng nhập mô tả không quá 60 ký tự",60,1);

    // create an user
    if(isValid) {
        var user = new User("",taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh)
        return user;
    } else {
        return null;
    }
};

// get data from API
function fetchData() {
    newData
        .getUsers()
        .then(function(result) {
            renderHTML(result.data);
        })
        .catch(function(error) {
            console.log(error);
        })
};

// render table
function renderHTML(dataAPI) {
    var content = "";
    dataAPI.forEach(function(user,index){
        content += `
            <tr>
                <td>${index+1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `
    })
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}

fetchData();

// Delete User
function deleteUser(id) {
    newData
        .deleteUserAPI(id)
        .then(function(result){
            fetchData();
        })
        .catch(function(error){
            console.log(error);
        })
};

// Add User
getEle("btnThemNguoiDung").addEventListener("click",function(){
    // Sửa Title
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";

    // Tạo nút "Add"
    var btnAdd = `<button class="btn btn-success" onclick="addUser()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;

    // Reset value
    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("HinhAnh").value = "";
    getEle("loaiNguoiDung").selectedIndex=0;
    getEle("loaiNgonNgu").selectedIndex=0;
    getEle("MoTa").value = "";

    getEle("taiKhoanError").innerHTML = "";
    getEle("hoTenError").innerHTML = "";
    getEle("matKhauError").innerHTML = "";
    getEle("emailError").innerHTML = "";
    getEle("hinhAnhError").innerHTML = "";
    getEle("loaiNDError").innerHTML = "";
    getEle("loaiNNError").innerHTML = "";
    getEle("moTaError").innerHTML = "";
});

function addUser() {
    var user = getUserInfo();
    console.log(user);
    if(user) {
        newData
            .addUserAPI(user)
            .then(function(result){
                fetchData();
                // tắt form popup
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function(error){
                console.log(error);
            });
    };
};

// check the availability of taiKhoan
function checkAvailability(value,errorId,mess) {
    newData
        .getUsers()
        .then(function(result){
            validation.isAvailable(value,errorId,mess,result.data);
        })
        .catch(function(error){
            console.log(error);
        })
};

// Edit User
function editUser(id) {
    // Sửa Title
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Thông Tin";

    // Tạo nút "Add"
    var btnSave = `<button class="btn btn-success" onclick="saveEdit(${id})">Save</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnSave;

    newData.getUserAPIById(id)
        .then(function(result){
            // show thông tin ra các thẻ input
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("HinhAnh").value = result.data.hinhAnh;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;
        })
        .catch(function(error){
            console.log(error);
        });
};

// Save edits
function saveEdit(id) {
    var userEdit = getUserInfo(false);
    if(userEdit) {
        userEdit.id = id;

        newData.saveUserApi(userEdit)
            .then(function(result){
                fetchData();
                // tắt form popup
                document.getElementsByClassName("close")[0].click();
            })
            .catch(function(error){
                console.log(error);
            });
    }
}