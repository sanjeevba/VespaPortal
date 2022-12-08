_data = "";
data ={};
report="<table class='table'><th colspan='2'> Proposed Content </th>";
	 seg1 =        "<tr><td>"
	 seg2 =        "</td><td>"
	 seg3 =        "</td></tr>";
$(document).ready(() => {

 _data = sessionStorage.getItem("grantAppData");
 data=JSON.parse(_data);
//sessionStorage.setItem('TP Created','true');
//sessionStorage.setItem('Occupation Created','true');
//$(".list-group-item:gt(5)").hide();
//$(".list-group-item:eq(4)").hide();
/* Supply Linked Business for Authenticated Users */
//$("#ees_associatedbusiness_name").width(1050);
//$("#ees_associatedbusiness_name").attr("value",data["Linked Business Name"]);
$("#ees_associatedbusiness").attr("value",data["Linked Business Value"]);
$("#ees_associatedbusiness_entityname").attr("value",'account');
$("#ees_associatedbusiness_name").hide();
$("#ees_associatedbusiness_label").hide();
//var lastStep = sessionStorage.getItem("applicationStep");
//sessionStorage.setItem('applicationStep','Confirm');
//$("#ees_applicationstatus").closest("td").hide();
//$("#ees_applicationstatus_label").hide();
//$("#ees_granttype").closest("td").hide();
//$("#ees_granttype_label").hide();
$("#EntityFormView table").css("margin-bottom","0");
$(".tab-column").hide();
//$('<input type="button" name="ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton" value="Confirm" onclick="updateStatusandType();javascript:if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};__doPostBack(\'ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton\',\'\');navThankYou();" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter("#NextButton");
//$('<input type="button" name="ctl00$ContentContainer$WebFormControl_787bb251be49ed11bba0001dd80507a7$NextButton" value="Confirm" onclick="updateStatusandType();javascript:if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};__doPostBack(\'ctl00$ContentContainer$WebFormControl_787bb251be49ed11bba0001dd80507a7$NextButton\',\'\');navThankYou();" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter("#NextButton");
$('<input type="button" name="NextButton2" value="Confirm" onclick="updateGrantStatus()" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter("#NextButton");
$("#NextButton").hide();
  _data = sessionStorage.getItem("grantAppData");
  data = JSON.parse(_data);
  sessionStorage.setItem('appid',data["id"]);
  $("<p id='pagecontent'><b>ALMOST THERE! *Review Information *Click CONFIRM at bottom of page. *A Thank You Message will appear and an email sent to the email address listed on application. *Only One Application Per Employer (FEIN). Do Not Submit Multiple Applications.</b></p>").insertBefore(".tab-title");
getAssignmentData();
});

function updateGrantStatus() {
        var grantGuid = sessionStorage.getItem('grantGuid');
        var dataObject = {   
// Applied //
		 "ees_applicationstatus": 276030000
           } 
    webapi.safeAjax({
      type: "PATCH",
      url: "/_api/ees_grantapplicantses("+grantGuid+")",
      contentType: "application/json",
      data: JSON.stringify(dataObject),
      success: function(res, status, xhr) {
  //        alert('Grant Status Updated');
         window.location.href='/bs/newgrantapplicationthankyou';
        }
    });
  }

function setOption(element, value) {
if (value != "") { 
var p1 = element + ' option[value="'
var p2 = '"]';
var res = p1+value+p2;
$(res).attr("selected","selected");

}
}

function addLine(item) {
	if (data[item] == undefined || data[item].length == undefined ||$.trim(data[item]).length == 0)
	   return;

    report = report + seg1+item+seg2+data[item]+seg3;
}
/*
function fix_naics() {
if (data["NAICS Code:"] == undefined || data["NAICS Code:"].length == undefined ||$.trim(data["NAICS Code:"]).length == 0)
	   return;
 report = report + seg1+"NAICS Code:"+seg2+data["NAICS Code:"]+seg3;
}
*/

function getAssignmentData() {
    report = report + "<tr><td colspan='2' style='font-size:18px;font-weight:bold;'>Company</td></tr>";
//  addLine("Linked Business Name");
    addLine("Application Company Name");
    addLine("Company Address");
    addLine("Company City");
    addLine("Company State");   
    addLine("Company County");
    addLine("Company Zip");
    addLine("Company Industry Sector");
    addLine("Company Website");
    addLine("Federal Employer Identification Number (FEIN)");
    addLine("How were you made aware of the Employer Training Grant?");
	addLine("Business Size"); 
    addLine("SUTA");
    addLine("Women Business Enterprise");
    addLine("Minority Business Enterprise");
    addLine("Veteran Business Enterprise");
    addLine("Defense Industry");

//// Contact Fields ////////
    report = report + "<tr><td colspan='2' style='font-size:18px;font-weight:bold;'>Contact</td></tr>";
    addLine("First Name");
	addLine("Last Name");
	addLine("Job Title");
	addLine("Primary Telephone");
	addLine("Email");

    report = report + "<tr><td colspan='2' style='font-size:18px;font-weight:bold;'>Request</td></tr>";

    addLine("Training Plan Name");
    addLine("Briefly describe your occupational training");
	addLine("Affected Occupation");
// Request Fields
    addLine("Training Type");
    addLine("Training Provider Name");
    addLine("ETPL ID");
	addLine("Training Contact First Name");
    addLine("Training Contact Last Name");
    addLine("Training Contact Phone");
    addLine("Training Contact Email");	
    addLine("Training Length");
    addLine("Average Hourly Wage");
	addLine("Proposed Training Cost per Hire");
    addLine("Expected # of New Hires Trained");
	addLine("Expected # of Current Employees Trained");
	addLine("Certificate Name");
	addLine("Certificate Description");

    //addLine("Training Provider Name");
	//addLine("ETPL ID"); 
    //addLine("SUTA");
    // addline("NAICS Code:");
    // fix_naics();
	// addLine("Training Provider");
    // addLine("Training Type");
    // addLine("Training Provider Name");
	// addLine("ETPL ID");
	// addLine("Training Contact First Name");
    // addLine("Training Contact Last Name");
    // addLine("Training Contact Phone");
    // addLine("Training Contact Email");	

    $(report).insertAfter(".tab-title");
}
// Global Ajax Web Api proxy
  // Wrapper provided by Microsoft
  
  (function (webapi, $) {
    function safeAjax(ajaxOptions) {
      const deferredAjax = $.Deferred();
      shell.getTokenDeferred().done((token) => {
        // add headers for AJAX
        if (!ajaxOptions.headers) {
          $.extend(ajaxOptions, {
            headers: {
              __RequestVerificationToken: token,
            },
          });
        } else {
          ajaxOptions.headers.__RequestVerificationToken = token;
        }
        $.ajax(ajaxOptions)
          .done((data, textStatus, jqXHR) => {
            validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
          }).fail(deferredAjax.reject); // AJAX
      }).fail(function () {
        deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
      });
      return deferredAjax.promise();
    }
    webapi.safeAjax = safeAjax;
  }(window.webapi = window.webapi || {}, jQuery));

