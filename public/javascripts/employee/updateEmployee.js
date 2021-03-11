$(document).ready(() => {
  $("#example").on("click", "tbody tr td", function () {
    $("#updateEmployeeModal").modal("show");
    let id = $(this).closest("tr").children()[0].textContent.trim();
    $("#editFirstName").val(
      $(this).closest("tr").children()[2].textContent.trim()
    );
    $("#editLastName").val($(this).closest("tr").children()[3].textContent);
    $("#editNationalCode").val(
      $(this).closest("tr").children()[4].textContent.trim()
    );
    let gender = $(this).closest("tr").children()[5].textContent.trim();
    $("#editGenderDom").html(" ");
    if (gender === "Male") {
      $("#editGenderDom").append(`
        <select
        class="form-select"
        aria-label="Default select example"
        id="editGenderDom"
      >
        <option value="1">Male</option>
        <option value="2">Female</option>
      </select>
      <label for="editGenderDom">Gender</label>
      `);
    } else if (gender === "Female") {
      $("#editGenderDom").append(`
          <select
          class="form-select"
          aria-label="Default select example"
          id="editGenderDom"
        >
          <option value="1">Female</option>
          <option value="2">Male</option>
        </select>
        <label for="editGenderDom">Gender</label>
        `);
    }
    let manager = $(this).closest("tr").children()[6].textContent.trim();
    $("#editManagerDom").html(" ");
    if (manager === "YES") {
      $("#editManagerDom").append(`
      <select
      class="form-select"
      aria-label="Default select example"
      id="editManager"
    >
      <option value="1">Yes</option>
      <option value="2">No</option>
    </select>
    <label for="editManager">Manager?</label>
      `);
    } else if (manager === "NO") {
      $("#editManagerDom").append(`
      <select
      class="form-select"
      aria-label="Default select example"
      id="editManager"
    >
      <option value="1">No</option>
      <option value="2">Yes</option>
    </select>
    <label for="editManager">Manager?</label>
      `);
    }
    let date = $(this).closest("tr").children()[7].textContent;
    $("#editBirthdayDate").val(date.trim());

    $("#submitEmployee").click(function () {
      if (!$("#editFirstName").val()) {
        $("#editFirstName").css("border", "2px solid red");
      } else if ($("#editFirstName").val()) {
        $("#editFirstName").css("border", "1px solid #ced4da");
      }
      if (!$("#editLastName").val()) {
        $("#editLastName").css("border", "2px solid red");
      } else if ($("#editLastName").val()) {
        $("#editLastName").css("border", "1px solid #ced4da");
      }
      if (!$("#editNationalCode").val()) {
        $("#editNationalCode").css("border", "2px solid red");
      } else if ($("#editNationalCode").val()) {
        $("#editNationalCode").css("border", "1px solid #ced4da");
      }
      let newGender = $("#editGenderDom").find(":selected").text().trim();
      let newManager;
      let birthdayDate;
      if ($("#editManagerDom").find(":selected").text().trim() === "Yes") {
        newManager = true;
      } else if (
        $("#editManagerDom").find(":selected").text().trim() === "No"
      ) {
        newManager = false;
      }
      if ($("#birthdayDate").val() === "") {
        birthdayDate = $("#editBirthdayDate").val();
      } else {
        birthdayDate = $("#birthdayDate").val();
      }
      let data = {
        id: id,
        firstName: $("#editFirstName").val(),
        lastName: $("#editLastName").val(),
        nationalCode: $("#editNationalCode").val(),
        gender: newGender,
        isManager: newManager,
        birthDate: birthdayDate,
      };
      $.ajax({
        type: "put",
        url: `/employee/${id}`,
        data: data,
        success: function (response) {
          $("#editNationalCode").css("border", "1px solid #ced4da");
          $("#editManager").css("border", "1px solid #ced4da");
          $("#editEmployeeAlert").removeClass("d-none");
          $("#editEmployeeError").css("display", "none");
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        error: function (err) {
          $("#editNationalCode").css("border", "1px solid #ced4da");
          $("#editManager").css("border", "1px solid #ced4da");
          $("#editEmployeeError").removeClass("d-none");
          let error = JSON.parse(err.responseText);
          if (error.errMsg == "one manager") {
            $("#editManager").css("border", "2px solid red");
            document.getElementById("editEmployeeError").innerText =
              "Each Company Has Only One Manager";
          }
          if (error.errMsg == "National code") {
            $("#editNationalCode").css("border", "2px solid red");
            document.getElementById("editEmployeeError").innerText =
              "National Code Error";
          }
        },
      });
    });

    $("#deleteEmployee").click(function () {
      $.ajax({
        type: "delete",
        url: `/employee/${id}`,
        success: function (response) {
          $("#editEmployeeAlert").removeClass("d-none");
          $("#editEmployeeAlert").removeClass("alert-success");
          $("#editEmployeeAlert").addClass("alert-warning");
          document.getElementById("editEmployeeAlert").innerText =
            "Done ... Your Employee has been Deleted !";
          setTimeout(function () {
            location.reload();
          }, 2000);
        },
        error: function (err) {
          location.reload();
        },
      });
    });
  });
});
