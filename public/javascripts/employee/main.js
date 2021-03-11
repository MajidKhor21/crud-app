$(document).ready(() => {
  $("#example").DataTable();
  $("#example_info").css("display", "none");
  $("#addCompany").css("display", "none");
  $("#example_filter").append(
    "<button class='btn btn-success' id='addEmployee' style='margin-left: 400px !important'>Add</button>"
  );
});
