function Validation() {
    // null check
    this.isNull = function(value,errorId,mess) {
        if(value==="") {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        } else {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
    };

    // length check
    this.lengthCheck = function(value,errorId,mess,max,min) {
        if(value.length<min || value.length>max) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        } else {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
    };

    
    // email check
    this.mailCheck = function (value, errorId, mess) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if (value.match(letter)) {
          //true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
    
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };

    // password check
    this.passCheck = function (value, errorId, mess) {
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    
        if (value.match(letter)) {
          //true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
    
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    };
    
    
    // selection check
    this.selectionCheck = function(selectId,errorId,mess) {
        if(getEle(selectId).selectedIndex!==0) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        } else {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
    }

    // string check
    this.stringCheck = function (value, errorId, mess) {
        var letter =
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    
        if (value.match(letter)) {
          //true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
    
        //false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };

    // check the availability of data
    this.isAvailable = function(value,errorId,mess,lstUser) {
        // Solution #2
        var result = lstUser.some(function(element){
            return value == element.taiKhoan;
        });
        if(result==false) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
        } else {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
        }
        return result;
    };
}