$(document).ready(() => {
  $("#getDateBtn").on("click", function () {
    console.log(1);
    let data = {
      from: $("#fromDate").val(),
      to: $("#toDate").val(),
    };

    $.ajax({
      type: "post",
      url: "/company/getDate",
      data: data,
      success: function (response) {
        let companies = response.newCompanies;
        let array = [];
        companies.forEach((element) => {
          a = new Date(element.registerDate);
          element.registerDate = a.toLocaleDateString();
        });
        console.log(array);
        $("#example").DataTable();
        $("#example").html(" ");
        $("#example").append(`
        <thead class="bg-dark text-light">
          <tr>
            <th style="display: none">id</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> #</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> Name</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> Register Number</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> State</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> City</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> Phone Number</th>
            <th class="sorting" tabindex="0"><i class="fas fa-sort"></i> Register Date</th>
          </tr>
        </thead>
        <tbody id="tableTbody"></tbody>`);
        for (let index = 0; index < companies.length; index++) {
          $("#tableTbody").append(`
          <tr class="selected">
          <td style="display: none">${companies[index]._id}</td>
          <td>${index + 1}</td>
          <td class="text-capitalize"> <a href="/company/getOne/${
            companies[index]._id
          }">${companies[index].name}</a></td>
          <td>${companies[index].registerNumber}</td>
          <td class="text-capitalize">${companies[index].state}</td>
          <td class="text-capitalize">${companies[index].city}</td>
          <td>${companies[index].phoneNumber}</td>
          <td>${companies[index].registerDate}</td>
          </tr>
          `);
        }
        $(".pagination").css("display", "none");

        // console.log(companies);
        // $("#table").html(" ");
        // $("#table").html(`<table id="example" class="table table-striped mt-4">
        // <thead class="bg-dark text-light">
        //   <tr>
        //     <th style="display: none">id</th>
        //     <th><i class="fas fa-sort"></i> #</th>
        //     <th><i class="fas fa-sort"></i> Name</th>
        //     <th><i class="fas fa-sort"></i> Register Number</th>
        //     <th><i class="fas fa-sort"></i> State</th>
        //     <th><i class="fas fa-sort"></i> City</th>
        //     <th><i class="fas fa-sort"></i> Phone Number</th>
        //     <th><i class="fas fa-sort"></i> Register Date</th>
        //   </tr>
        // </thead>
        // <tbody id="tableTbody"></tbody>`);
        // for (let index = 0; index < companies.length; index++) {
        //   $("#tableTbody").append(`
        //   <tr class="selected">
        //   <td style="display: none">${companies[index]._id}</td>
        //   <td>${index + 1}</td>
        //   <td class="text-capitalize">${companies[index].name}</td>
        //   <td>${companies[index].registerNumber}</td>
        //   <td class="text-capitalize">${companies[index].state}</td>
        //   <td class="text-capitalize">${companies[index].city}</td>
        //   <td>${companies[index].phoneNumber}</td>
        //   <td>${companies[index].registerDate}</td>
        //   </tr>
        //   `);
        // }
      },
    });
  });
});
