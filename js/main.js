$(document).ready(function () {
    $("#rule").hide();
    $("#prize").hide();
    $("#ponit-code").hide();
    $("#get-play").hide();
    $("#get-play-error").hide();
    $("#lottery-code").hide();
    $("#btn-rule").click(function (e) {
        e.preventDefault();
        $("#rule").show();
        $("#select__btn").hide();
    });
    $("#btn__close-rule").click(function (e) {
        e.preventDefault();
        $("#rule").hide();
        $("#select__btn").show();
    });

    $("#btn-prize").click(function (e) {
        e.preventDefault();
        $("#prize").show();
        $("#select__btn").hide();
    });
    $("#btn__close-exchange-gift").click(function (e) {
        e.preventDefault();
        $("#prize").hide();
        $("#select__btn").show();

    })
    $("#btn-point-code").click(function (e) {
        e.preventDefault();
        $("#ponit-code").show();
        $("#select__btn").hide();
    })

    $("#btn-close-ponit-code").click(function (e) {
        e.preventDefault();
        $("#ponit-code").hide();
        $("#select__btn").show();
        $("#PointCodeForm")[0].reset();
    })

    $("#btn-get-play-error").click(function (e) {
        e.preventDefault();
        $("#ponit-code").hide();
        $("#btn-get-play-error").show();
    })
    // Đổi quà
    $('#btn-exchange_gifts').on('click', function (e) {
        e.preventDefault();
    });

    //End Đổi quà

    //Mã

    // Đổi lượt
    $("#submitPointCode").on("click", function (e) {
        e.preventDefault();
        var phone = '0915559221'; // Lấy giá trị "phone" từ local storage.
        var formData = $("#PointCodeForm").serialize();
        formData += "&phone=" + phone; // Thêm giá trị "phone" vào dữ liệu biểu mẫu.
        console.log(formData);
        $.ajax({
            type: "POST",
            url: 'http://103.226.249.30:8014/api/accumulate-points',
            contentType: 'application/x-www-form-urlencoded',
            data: formData,
            success: function (response) {
                console.log(response);
                if (response.status == true) {
                    $("#ponit-code").hide();
                    $('#get-play').show();
                    $('#getNumberPlay').text(response.turn)
                    $("#PointCodeForm")[0].reset();
                } else {
                    $("#get-play-error").show();
                    $("#select__btn").hide();
                    $("#ponit-code").hide();
                    $("#PointCodeForm")[0].reset();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#closePointCode').on('click', function (e) {
        e.preventDefault();
        console.log(111);
        $("#select__btn").show();
        $("#get-play").hide();
        $("#PointCodeForm")[0].reset();
    });

    $('#closePlayError').on('click', function (e) {
        e.preventDefault();
        $("#select__btn").show();
        $("#get-play-error").hide();
        $("#PointCodeForm")[0].reset();
    });
    $('#idRetry').on('click', function (e) {
        e.preventDefault();
        $("#select__btn").hide();
        $("#get-play-error").hide();
        $("#ponit-code").show();
        $("#PointCodeForm")[0].reset();

    });


    //end đổi lượt
    //check lượt chơi
    $('#checklc').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: 'https://sancanxi.vn/api/count-turn',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                phone: '0915559221'
            },
            success: function (response) {
                if (response.status == true) {
                    window.location.href = './play.html'
                } else {
                    $("#ponit-code").show();
                    $("#select__btn").hide();
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
    //end check luot choi

    //Đếm lượt chơi
    $.ajax({
        type: "POST",
        url: 'https://sancanxi.vn/api/count-turn',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            phone: '0915559221'
        },
        success: function (response) {
            if (response.status == true) {
                $('#turn').text(response.turn)
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
    //End đếm lượt chơi

    // Mã dự thưởng
    $('#btn-show-lottery').on('click', function () {
        $('#lottery-code').show();
        $("#select__btn").hide();
    });
    $('#btn-close-show-lottery').on('click', function () {
        $('#lottery-code').hide();
        $("#select__btn").show();

    });
    //End mã dự thưởng

    //Đếm canxi
    let canxi;

    $.ajax({
        type: "POST",
        url: 'https://sancanxi.vn/api/count-canxi',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            phone: '0915559221'
        },
        success: function (response) {
            if (response.status == true) {
                $('#canxi').text(response.canxi);
                canxi = response.canxi;
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    //End đếm canxi 

    // Đổi quà check xem có đểm để đổi quà ko
    //nêu có thì sẽ chyển sang trang đổi quà
    $('#btn-exchange_gifts').on('click', function () {
        if (canxi > 0) {
            window.location.href = '../html/receive.html'

        } else {
            window.location.href = '../html/gift_exchange_failed.html'
        }
    });


});