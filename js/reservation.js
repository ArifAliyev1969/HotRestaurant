$(".submit").on("click", function(event) {
    event.preventDefault();

    var newReservation = {
      customerName: $("#reserve-name").val().trim(),
      phoneNumber: $("#reserve-phone").val().trim(),
      customerEmail: $("#reserve-email").val().trim(),
      customerID: $("#reserve-unique-id").val().trim()
    };

    $.post("/api/tables", newReservation,
      function(data) {

        if (data) {
          alert("Reservation Accepted!");
        }
        else {
          alert("Reservations are Full. You are on standby");
        }

        $("#reserve-name").val("");
        $("#reserve-phone").val("");
        $("#reserve-email").val("");
        $("#reserve-unique-id").val("");
      });
  });