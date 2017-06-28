
$( document ).ready(function() {
    
	/*
	 *Define Customers Datatable
	 *
	 */
    $('#customers_DataTable').DataTable({
        "aaData": null,
        "dom": "Blfrtip",
        "buttons": [

            {
                extend: 'copy',
                text: 'copy',
                className: 'exportButton'
            },
            {
                extend: 'excel',
                text: 'excel',
                className: 'exportButton'
            }
        ],
        "aoColumns": [
            {
                "mData": "Address",
                "title": "Address",
                "bSortable": true
            },
            {
                "mData": "Name",
                "title": "Name",
                "bSortable": true
            },
            {
                "mData": "Phone",
                "title": "Phone",
                "bSortable": true
            }
        ]
    });

    $('#drivers_DataTable').DataTable({
        "aaData": null,
        "dom": "Blfrtip",
        "buttons": [

            {
                extend: 'copy',
                text: 'copy',
                className: 'exportButton'
            },
            {
                extend: 'excel',
                text: 'excel',
                className: 'exportButton'
            }
        ],
        "aoColumns": [
            {
                "mData": "Name",
                "title": "Name",
                "bSortable": true
            },
            {
                "mData": "Phone",
                "title": "Phone",
                "bSortable": true
            },
            {
                "mData": "Deliver",
                "title": "Deliver",
                "bSortable": true
            },
            {
                "mData": "Repair",
                "title": "Repair",
                "bSortable": true
            },
            {
                "mData": "Gas Price Small",
                "title": "Gas Price Small",
                "bSortable": true
            },
            {
                "mData": "Gas Price Big",
                "title": "Gas Price Big",
                "bSortable": true
            },
            {
                "mData": "Working Area",
                "title": "Working Area",
                "bSortable": true
            },
            {
                "mData": "Working Hours From",
                "title": "Working Hours From",
                "bSortable": true
            },
            {
                "mData": "Working Hours Till",
                "title": "Working Hours Till",
                "bSortable": true
            },
        ]
    });

   
    var feedback_table = $('#feedback_DataTable').DataTable({


        "aaData": null,
        "dom": "Blfrtip",
        "buttons": [

            {
                extend: 'copy',
                text: 'copy',
                className: 'exportButton'
            },
            {
                extend: 'excel',
                text: 'excel',
                className: 'exportButton'
            }
        ],

        "aoColumns": [

            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },
            {
                "mData": "DRIVERNAME",
                "title": "Name",
                "bSortable": true,
            },
            {
                "mData": "AREA",
                "title": "Area",
                "bSortable": true
            },
            {
                "mData": "DELIVER",
                "title": "Deliver",
                "bSortable": true
            },
            {
                "mData": "REPAIR",
                "title": "Repair",
                "bSortable": true
            },
            {
                "mData": "STARS",
                "title": "Rate",
                "bSortable": true
            }
        ]
    });

    // Firebase variable that listens on database events
    var starCountRef = firebase.database().ref('Client/');
    starCountRef.on('value', function(snapshot) {
        ////console.log("Database Variable", snapshot.val());
        data_client = snapshot.val();
		console.log("-----------------", snapshot.val());
        // Parse firebase snapshot
        var json_array_client = [];
        var keys_client = [];
        for(var k in data_client) keys_client.push(k);

        for(var i =0; i < keys_client.length; i++) {
            ////console.log(data_client[keys_client[i]]["NAME"]);
            var json_obj_client = {
                "Name":data_client[keys_client[i]]["NAME"],
                "Address":data_client[keys_client[i]]["ADDRESS"],
                "Phone":data_client[keys_client[i]]["PHONE"]};
            json_array_client.push(json_obj_client);
        }
        $('#customers_DataTable').dataTable().fnClearTable();
        $('#customers_DataTable').dataTable().fnAddData(json_array_client);

    });

    // Firebase variable that listens on database events

    var starCountRef = firebase.database().ref('Driver/');
    starCountRef.on('value', function(snapshot) {
        ////console.log("Database Variable", snapshot.val());

        data_driver = snapshot.val();
        // Parse firebase snapshot
        var json_array_driver = [];
        var keys_driver = [];
        for(var k in data_driver) keys_driver.push(k);

        for(var i =0; i < keys_driver.length; i++) {
            ////console.log(data_driver[keys_driver[i]]["NAME"]);
            var json_obj_driver = {
                "Name":data_driver[keys_driver[i]]["DRIVERNAME"],
                "Phone":data_driver[keys_driver[i]]["DRIVERPHONE"],
                "Deliver":(data_driver[keys_driver[i]]["DELIVER"] == 1) ? "YES" : "NO",
                "Repair":(data_driver[keys_driver[i]]["REPAIR"] == 1) ? "YES" : "NO",
                "Gas Price Big":data_driver[keys_driver[i]]["GASBIG"],
                "Gas Price Small":data_driver[keys_driver[i]]["GASSMALL"],
                "Working Area":data_driver[keys_driver[i]]["WORKINGAREA"],
                "Working Hours From":data_driver[keys_driver[i]]["WORKINGHOURSFROM"],
                "Working Hours Till":data_driver[keys_driver[i]]["WORKINGHOURSTILL"]};
            json_array_driver.push(json_obj_driver);
        }
        $('#drivers_DataTable').dataTable().fnClearTable();
        $('#drivers_DataTable').dataTable().fnAddData(json_array_driver);


    });


    // Firebase variable that listens on database events
    var starCountRef = firebase.database().ref('FeedBack/');
    starCountRef.on('value', function(snapshot) {
        ////console.log("Database FeedBack", snapshot.val());
        var feedback_driver_snapshot = snapshot.val();

        // get clients snapshot
        var clients_list = firebase.database().ref('Client/');
        clients_list.once('value', function(snapshot) {
            ////console.log("CLIENTS : ", snapshot.val());
            var feedback_client_snapshot = snapshot.val();

            var feedback_drivers_key = [];
            var feedback_client_key = [];
            var feedback_array = [];
            var feedback_client_array = [];
            var feedback_obj = {};
            var feedback_client_obj = {};
            for(var i in feedback_driver_snapshot) feedback_drivers_key.push(i);

            for(var i = 0; i < feedback_drivers_key.length; i++) {

                //console.log("Driver Key : " + feedback_drivers_key[i], feedback_driver_snapshot[feedback_drivers_key[i]]);
                var current_driver_key = feedback_driver_snapshot[feedback_drivers_key[i]];
                for(var l in feedback_driver_snapshot[feedback_drivers_key[i]]) feedback_client_key.push(l);

                for(var j = 0; j < feedback_client_key.length; j++) {

                    var current_client_key = current_driver_key[feedback_client_key[j]];
                    feedback_obj = {};
                    feedback_client_obj = {};
                    feedback_obj.DRIVERNAME = current_client_key["DRIVERNAME"];
                    feedback_obj.AREA = current_client_key["AREA"];
                    feedback_obj.DELIVER = (current_client_key["DELIVER"] == 1) ? "YES" : "NO";
                    feedback_obj.REPAIR = (current_client_key["REPAIR"] == 1) ? "YES" : "NO";
                    feedback_obj.STARS = current_client_key["STARS"];


                    //console.log("Driver Details : ", current_client_key["DRIVERNAME"]);
                    //console.log("Driver Details : ", current_client_key["AREA"]);
                    //console.log("Driver Details : ", current_client_key["COMMENT"]);
                    //console.log("Driver Details : ", current_client_key["DELIVER"]);
                    //console.log("Driver Details : ", current_client_key["PHOTO"]);
                    //console.log("Driver Details : ", current_client_key["REPAIR"]);
                    //console.log("Driver Details : ", current_client_key["STARS"]);
                    //console.log("Client Key : " + feedback_client_key[j], feedback_driver_snapshot[feedback_drivers_key[i]]);

                    if(feedback_client_snapshot.hasOwnProperty(feedback_client_key[j])) {
                        var client_key = feedback_client_snapshot[feedback_client_key[j]];
                        feedback_client_obj.ADDRESS = client_key["ADDRESS"];
                        feedback_client_obj.NAME = client_key["NAME"];
                        feedback_client_obj.PHONE = client_key["PHONE"];
                        feedback_client_obj.COMMENT = current_client_key["COMMENT"];
                        feedback_client_obj.PHOTO = current_client_key["PHOTO"];
                        feedback_client_array.push(feedback_client_obj);
                        feedback_obj.CLIENTS = feedback_client_array;
                        //console.log("Client Details : ", client_key["ADDRESS"]);
                        //console.log("Client Details : ", client_key["NAME"]);
                        //console.log("Client Details : ", client_key["PHONE"]);
                    }

                }
                feedback_array.push(feedback_obj);
                feedback_client_array = [];
                feedback_client_key = [];
                //console.log("------------------------------------------");
            }
            feedback_obj = {};
            feedback_obj = feedback_array;
            console.log("!!!!!!!!!!!!!! ----",feedback_obj);
            $('#feedback_DataTable').dataTable().fnClearTable();
            $('#feedback_DataTable').dataTable().fnAddData(feedback_obj);
        });

        // Listener for clicking on details control in feedback table
        // Add event listener for opening and closing details
        $('#feedback_DataTable tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = feedback_table.row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tr.removeClass('details');
            }
            else {
                // Open this row
                row.child( format(row.data()) ).show();
                tr.addClass('shown');
                tr.addClass('details');
            }
        });
    });



    //Write To Firebase
    //var database = firebase.database();
    //writeUserData("id", "name", "email");
});


/**
 * Function that writes to Firebase
 *
 */
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('path/' + userId).set({
        username: name,
        email: email,
    });
}

/**
 * Function that creates children for rows
 *
 */
function format ( d ) {
    console.log("CHILD DATA : ", d["CLIENTS"]);
    //loop through all clients
	var child_table = "";
	if(d.hasOwnProperty("CLIENTS")) {
    var clients = d["CLIENTS"];
    for(var i = 0; i < clients.length; i++) {
        var image = new Image();
        image = 'data:image/png;base64,' + clients[i].PHOTO;
        child_table += '<table class="table table-striped table-bordered table-hover table-condensed" cellpadding="5" cellspacing="0" border="0" style="margin-top:20px; padding-left:50px;border-style: solid;border: 1px solid blue">'+
            '<tr>'+
            '<td>Client Name:</td>'+
            '<td>'+clients[i].NAME+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Client Number:</td>'+
            '<td>'+clients[i].PHONE+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Client Address:</td>'+
            '<td>'+clients[i].ADDRESS+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Client Comment:</td>'+
            '<td>'+clients[i].COMMENT+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td>Photo:</td>'+
            '<td><img src="'+image+'" alt="No Image"></img></td>'+
            '</tr>'+
            '</table><br>';
    }
	}
    // `d` is the original data object for the row
    return child_table;
}


function signIn() {

    if (validate_login_client_side()) {
        window.location.replace("dashboard.html");
        //TODO implement function validate_login_server_side()
    }
}

function signUp() {

    if (validate_login_client_side()) {
        window.location.replace("dashboard.html");
        //TODO implement function validate_login_server_side()
        //TODO Send Email to use with password
    }
}

function validate_login_client_side() {

    $("#email_span").hide();
    $("#password_span").hide();

    var validate = false;
    var email = $("#inputEmail").val();
    var pass = $("#inputPassword").val();
    if (email == "" || pass == "") {
        if (email == "") {
            $("#email_span").val("Fill Email");
            $("#email_span").show();
        }
        if (pass == "") {
            $("#password_span").val("Fill Password");
            $("#password_span").show();
        }
        return false;
    }
    //console.log(email);
    return true;
}

function validate_login_server_side() {

    //TODO : write ajax request to server side that checks if email and password are correct
    // IF CORRENT :
    //		Backend :
    //					1-Open session for this user
    //					2-Retreive data ONLY if this session exists
    //		Frontend :
    //					1- Redirect page to the desired one

}







