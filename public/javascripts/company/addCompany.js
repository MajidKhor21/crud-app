$(document).ready(() => {
  $("#addCompany").on("click", function () {
    $("#myModalCreate").modal("show");
    $("#addNewCompany").click(function () {
      if (!$("#addName").val()) {
        $("#addName").css("border", "2px solid red");
      } else if ($("#addName").val()) {
        $("#addName").css("border", "1px solid #ced4da");
      }
      if (!$("#addRegisterNumber").val()) {
        $("#addRegisterNumber").css("border", "2px solid red");
      } else if ($("#addRegisterNumber").val()) {
        $("#addRegisterNumber").css("border", "1px solid #ced4da");
      }
      if (!$("#addState").val()) {
        $("#addState").css("border", "2px solid red");
      } else if ($("#addState").val()) {
        $("#addState").css("border", "1px solid #ced4da");
      }
      if (!$("#addCity").val()) {
        $("#addCity").css("border", "2px solid red");
      } else if ($("#addCity").val()) {
        $("#addCity").css("border", "1px solid #ced4da");
      }
      if (!$("#addPhoneNumber").val()) {
        $("#addPhoneNumber").css("border", "2px solid red");
      } else if ($("#addPhoneNumber").val()) {
        $("#addPhoneNumber").css("border", "1px solid #ced4da");
      }
      if (!$("#addRegisterDate").val()) {
        $("#addRegisterDate").css("border", "2px solid red");
      } else if ($("#addRegisterDate").val()) {
        $("#addRegisterDate").css("border", "1px solid #ced4da");
      }
      let data = {
        name: $("#addName").val(),
        registerNumber: $("#addRegisterNumber").val(),
        state: $("#addState").val(),
        city: $("#addCity").val(),
        phoneNumber: $("#addPhoneNumber").val(),
        registerDate: $("#addRegisterDate").val(),
      };
      $.ajax({
        type: "post",
        url: "/company/",
        data: data,
        success: function (response) {
          $("#addCompanyError").css("display", "none");
          $("#addRegisterNumber").css("border", "1px solid #ced4da");
          $("#addRegisterNumber").css("border", "1px solid #ced4da");
          $("#addCompanyAlert").removeClass("d-none");
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        error: function (err) {
          $("#addCompanyError").removeClass("d-none");
          let error = JSON.parse(err.responseText);
          if (error.errMsg == "Company exist") {
            $("#addName").css("border", "2px solid red");
            $("#addRegisterNumber").css("border", "2px solid red");
          }
        },
      });
    });
  });
});
