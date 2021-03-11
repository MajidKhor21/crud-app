$(document).ready(function () {
  $("#example").DataTable();
  $("#example_info").css("display", "none");
  $("#example_filter").append(
    "<button class='btn btn-success' id='addCompany' style='margin-left: 400px !important'>Add</button>"
  );
  $(".datepicker").datepicker();
});
