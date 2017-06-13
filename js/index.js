$( document ).ready(function() {
    // DOM ready

    // Test data
    /*
     * To test the script you should discomment the function
     * testLocalStorageData and refresh the page. The function
     * will load some test data and the loadProfile
     * will do the changes in the UI
     */
    // testLocalStorageData();
    // Load profile if it exits
    loadProfile();
});

/**
 * Function that gets the data of the profile in case
 * thar it has already saved in localstorage. Only the
 * UI will be update in case that all data is available
 *
 * A not existing key in localstorage return null
 *
 */
function getLocalProfile(callback){
    var profileImgSrc      = localStorage.getItem("PROFILE_IMG_SRC");
    var profileName        = localStorage.getItem("PROFILE_NAME");
    var profileReAuthEmail = localStorage.getItem("PROFILE_REAUTH_EMAIL");

    if(profileName !== null
            && profileReAuthEmail !== null
            && profileImgSrc !== null) {
        callback(profileImgSrc, profileName, profileReAuthEmail);
    }
}

/**
 * Main function that load the profile if exists
 * in localstorage
 */
function loadProfile() {
    if(!supportsHTML5Storage()) { return false; }
    // we have to provide to the callback the basic
    // information to set the profile
    getLocalProfile(function(profileImgSrc, profileName, profileReAuthEmail) {
        //changes in the UI
        $("#profile-img").attr("src",profileImgSrc);
        $("#profile-name").html(profileName);
        $("#reauth-email").html(profileReAuthEmail);
        $("#inputEmail").hide();
        $("#remember").hide();
    });
}

/**
 * function that checks if the browser supports HTML5
 * local storage
 *
 * @returns {boolean}
 */
function supportsHTML5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Test data. This data will be safe by the web app
 * in the first successful login of a auth user.
 * To Test the scripts, delete the localstorage data
 * and comment this call.
 *
 * @returns {boolean}
 */
function testLocalStorageData() {
    if(!supportsHTML5Storage()) { return false; }
    localStorage.setItem("PROFILE_IMG_SRC", "//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" );
    localStorage.setItem("PROFILE_NAME", "César Izquierdo Tello");
    localStorage.setItem("PROFILE_REAUTH_EMAIL", "oneaccount@gmail.com");
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
	return true;
	console.log(email);
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







