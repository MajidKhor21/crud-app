$(document).ready(() => {
  $("#example").on("click", "tbody tr td.tdModal", function () {
    $("#modalUpdate").modal("show");
    let id = $(this).closest("tr").children()[0].textContent;
    $("#nameOfCompany").val(
      $(this).closest("tr").children()[2].textContent.trim()
    );
    $("#registerNumber").val($(this).closest("tr").children()[3].textContent);
    $("#state").val($(this).closest("tr").children()[4].textContent.trim());
    $("#city").val($(this).closest("tr").children()[5].textContent.trim());
    $("#phoneNumber").val($(this).closest("tr").children()[6].textContent);
    let date = $(this).closest("tr").children()[7].textContent;
    $("#registerDate").val(date.trim());

    $("#submitChanges").click(function () {
      if (!$("#nameOfCompany").val()) {
        $("#nameOfCompany").css("border", "2px solid red");
      } else if ($("#nameOfCompany").val()) {
        $("#nameOfCompany").css("border", "1px solid #ced4da");
      }
      if (!$("#registerNumber").val()) {
        $("#registerNumber").css("border", "2px solid red");
      } else if ($("#registerNumber").val()) {
        $("#registerNumber").css("border", "1px solid #ced4da");
      }
      if (!$("#state").val()) {
        $("#state").css("border", "2px solid red");
      } else if ($("#state").val()) {
        $("#state").css("border", "1px solid #ced4da");
      }
      if (!$("#city").val()) {
        $("#city").css("border", "2px solid red");
      } else if ($("#city").val()) {
        $("#city").css("border", "1px solid #ced4da");
      }
      if (!$("#phoneNumber").val()) {
        $("#phoneNumber").css("border", "2px solid red");
      } else if ($("#phoneNumber").val()) {
        $("#phoneNumber").css("border", "1px solid #ced4da");
      }
      if (!$("#registerDate").val()) {
        $("#registerDate").css("border", "2px solid red");
      } else if ($("#registerDate").val()) {
        $("#registerDate").css("border", "1px solid #ced4da");
      }
      let data = {
        name: $("#nameOfCompany").val(),
        registerNumber: $("#registerNumber").val(),
        state: $("#state").val(),
        city: $("#city").val(),
        phoneNumber: $("#phoneNumber").val(),
        registerDate: $("#registerDate").val(),
      };
      $.ajax({
        type: "put",
        url: `/company/${id}`,
        data: data,
        success: function (response) {
          $("#nameOfCompany").css("border", "1px solid #ced4da");
          $("#registerNumber").css("border", "1px solid #ced4da");
          $("#editCompanyAlert").removeClass("d-none");
          $("#editCompanyError").css("display", "none");
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        error: function (err) {
          $("#editCompanyError").removeClass("d-none");
          let error = JSON.parse(err.responseText);
          if (error.errMsg == "Company exist") {
            $("#nameOfCompany").css("border", "2px solid red");
            $("#registerNumber").css("border", "2px solid red");
          }
        },
      });
    });

    $("#deleteButton").click(function () {
      $.ajax({
        type: "delete",
        url: `/company/${id}`,
        success: function (response) {
          $("#editCompanyAlert").removeClass("d-none");
          $("#editCompanyAlert").removeClass("alert-success");
          $("#editCompanyAlert").addClass("alert-warning");
          document.getElementById("editCompanyAlert").innerText =
            "Done ... Your Company has been Deleted !";
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        error: function (err) {
          window.location.href = "/company/all";
        },
      });
    });
  });
});
