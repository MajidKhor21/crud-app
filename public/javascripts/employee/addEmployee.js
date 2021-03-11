$(document).ready(() => {
  $("#addEmployee").on("click", function () {
    $("#addEmployeeModal").modal("show");
    $("#addNewEmployee").click(function () {
      let data = [];
      if (!$("#addEmployeeFirstName").val()) {
        $("#addEmployeeFirstName").css("border", "2px solid red");
      } else if ($("#addEmployeeFirstName").val()) {
        $("#addEmployeeFirstName").css("border", "1px solid #ced4da");
      }
      if (!$("#addEmployeeLastName").val()) {
        $("#addEmployeeLastName").css("border", "2px solid red");
      } else if ($("#addEmployeeLastName").val()) {
        $("#addEmployeeLastName").css("border", "1px solid #ced4da");
      }
      if (!$("#addEmployeeNationalCode").val()) {
        $("#addEmployeeNationalCode").css("border", "2px solid red");
      } else if ($("#addEmployeeNationalCode").val()) {
        $("#addEmployeeNationalCode").css("border", "1px solid #ced4da");
      }
      if (!$("#addBirthdayDate").val()) {
        $("#addBirthdayDate").css("border", "2px solid red");
      } else if ($("#addBirthdayDate").val()) {
        $("#addBirthdayDate").css("border", "1px solid #ced4da");
      }
      let gender;
      if ($("#addEmployeeGender option:selected").index() === 0) {
        gender = "Male";
      } else if ($("#addEmployeeGender option:selected").index() === 1) {
        gender = "Female";
      }
      let isManager;
      if ($("#addIsManager option:selected").index() === 0) {
        isManager = false;
      } else if ($("#addIsManager option:selected").index() === 1) {
        isManager = true;
      }
      data = {
        firstName: $("#addEmployeeFirstName").val(),
        lastName: $("#addEmployeeLastName").val(),
        nationalCode: $("#addEmployeeNationalCode").val(),
        gender: gender,
        isManager: isManager,
        birthDate: $("#addBirthdayDate").val(),
        company: $("#addEmployeeCompany").text(),
      };
      $.ajax({
        type: "post",
        url: "/employee/",
        data: data,
        success: function (response) {
          console.log(response);
          $("#addEmployeeError").css("display", "none");
          $("#addEmployeeNationalCode").css("border", "1px solid #ced4da");
          $("#addIsManager").css("border", "1px solid #ced4da");
          $("#addEmployeeAlert").removeClass("d-none");
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        error: function (err) {
          console.log(err);
          $("#addEmployeeError").removeClass("d-none");
          $("#addEmployeeNationalCode").css("border", "1px solid #ced4da");
          $("#addIsManager").css("border", "1px solid #ced4da");
          let error = JSON.parse(err.responseText);
          if (error.errMsg == "One Manager") {
            $("#addIsManager").css("border", "2px solid red");
            $("#addEmployeeError").text("Each Company Has Only One Manager");
          }
          if (error.errMsg == "National code") {
            $("#addEmployeeNationalCode").css("border", "2px solid red");
            $("#addEmployeeError").text("National Code Error");
          }
        },
      });
    });
  });
});
