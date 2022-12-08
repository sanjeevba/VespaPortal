$(document).ready(() => {
debugger; // Overview (new)
// Updated 10/18/22 (JEK)
    var roles = "{{ user.roles }}";

    if(roles.contains("Administrators")  ||  roles.contains("Authenticated")  ) {
        var role = "Authenticated"
        $('#ees_portalanonymous').val(0);

        // Set the Linked Business field for the initial record creation. 
        if (sessionStorage.getItem('grantAppData'))
        {
            grantData=JSON.parse(sessionStorage.getItem('grantAppData'));
            if (grantData != null && grantData["Linked Business Value"] !== undefined){
				// Continue with Overview step.
				UpdateOverviewForm(grantData['Linked Business Value'], sessionStorage.getItem('Linked Business Name'));
            }
        }
		// Get the first linked business for this users (Async), then continue with Overview step from the callback.
		getLinkedBusinessForUser();
    }
    else 
    {
        role = "Anonymous";
        $('#ees_portalanonymous').val(1);
    }

  }); 

function UpdateOverviewForm(accountGuid, accountName) {

        $("#ees_associatedbusiness").val(accountGuid);
        $("#ees_associatedbusiness_name").val(accountName);
        $("#ees_associatedbusiness_entityname").val("account");

        $("#ees_associatedbusiness").hide();
        $("#ees_associatedbusiness_name").hide();
        $("#ees_associatedbusiness").closest("td").hide();

        $("#ees_sourceid").val("Portal");
        $('#ees_granttype').val(1);

        $("#ees_sourceid").hide();
        $('#ees_granttype').hide();

        $("#ees_sourceid_label").hide();
        $('#ees_granttype_label').hide();

        $('#ees_portalanonymous').hide();
        $('#ees_portalanonymous_label').hide();

        $(".list-group-item:gt(5)").hide();
        $(".list-group-item:eq(4)").hide();
       sessionStorage.setItem('applicationStep','Overview');
       sessionStorage.setItem("grantAppData","");
       sessionStorage.setItem('TPGuidAppended','false');
       sessionStorage.setItem('OccupationGuidAppended','false');
       sessionStorage.setItem('TP Created','false');
       sessionStorage.setItem('Occupation Created','false');
       sessionStorage.setItem('OccupationGuid','00000000-0000-0000-0000-000000000000');
       getapplicantconfiguration(); // This updates the Overview form with the overview text.
       getOutofState();
}

function getLinkedBusinessForUser() {  
      $.ajax({
        url: '/bs/getaccountscontacts/',
        data: {
          format: 'json'
        }, 
        error: function(xhr, status, error) {
          alert('status = ' + status);
          alert('error = ' + error)
          $('#info').html('<p>error!</p>');
        },
        success: function(data) {
            accountguid = data.results[0].id;
            accounttext = data.results[0].account;
            UpdateOverviewForm(accountguid, accounttext);
        },
        type: 'GET'
      });
    }

function getapplicantconfiguration() {
    $.ajax({
        url: '/bs/getnewgrantapplicationconfiguration',
        data: {
            format: 'text'
        },
        error: function (xhr, status, error) {
            alert('status = ' + status);
            alert('error = ' + error);
            $('#info').html('<p>error!</p>');
        },
        success: function (data) {
                    var newapps= false;
                    data.results.forEach((element) => {
                    if (element.name == 'New Applications Accepted' && 
                    element.integrationtype == 'Portal' && element.fieldconfiguration == "Yes") {
                        newapps = true;
                       }
                       });
                data.results.forEach((element) => {             
                    if (element.name == 'Grant Application Overview (On)' && element.integrationtype == 'Portal' && newapps) {
                         $(decodeURI(element.html_encoded)).insertAfter(".tab-title"); 
                       }    
                      });
            },
        type: 'GET'
    });
}

function getOutofState() {
     var outofState = "";
    $.getJSON("/bs/getcounties/", function (data) {
        if (data.results.length>0) {
            data.results.forEach(element => { 
			   if (element.name == 'Out of State') {
            outofState = element.countyid;
            sessionStorage.setItem('Out of State',outofState);
            }
            });
          }

      });
}
