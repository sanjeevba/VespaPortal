_data = "";
data= {};
error_flag = false;
trainingprovider_required = false;
provider_name_required = false;
etplid_required = false;

$(document).ready(() => {
// Pass guid of Application to Confirm Step
    var guid = sessionStorage.getItem('grantGuid');
    alert('Grant '+guid);
		$('#liquid_form').attr('action', $('#liquid_form').attr('action')+ '&grantguid='+guid);
//
   $('#ees_portaloccupationattached').hide();
   $('#ees_portaloccupationattached_label').hide();
    $(".input-group-addon").hide();
    $(".list-group-item:gt(5)").hide();
    $(".list-group-item:eq(4)").hide();
    $(".input-group-btn").hide();
//KSB 10/24/2022 Added for story 6577 Remove grey line under average hourly wage
    $(".input-group-addon").hide();
//
    var lastStep = sessionStorage.getItem("applicationStep");
    sessionStorage.setItem('applicationStep','Request');
    _data = sessionStorage.getItem("grantAppData");
    data = JSON.parse(_data);
   insertField("Training Plan Name Value", $("#EntityFormView_EntityID").val());
   sessionStorage.setItem("grantAppData", JSON.stringify(data));
   $('#ees_affectedoccupation').hide();
   $('<select name="$ees_affectedoccupation2" id="ees_affectedoccupation2" style="width:162%" class="form-control picklist" title="Please select an item in this list"></select>').insertAfter('#ees_affectedoccupation');
   //  
   affectedOccupationLov();
   sleep(1000);
   // add Event Handler
     $("#ees_affectedoccupation2").on('change', function() { 
     sessionStorage.setItem('occupationGuid', $('#ees_affectedoccupation2 option:selected').val());
     updateAffectedOccupation();
   });
   //
   $('#ees_affectedoccupation_name').hide();
   $('#ees_affectedoccupation2 option:selected').val(data['Affected Occupation Value']);
   $('#ees_affectedoccupation2 option:selected').text(data['Affected Occupation']);

   $('<p style="color:red">&nbsp</p>').insertAfter("#ees_providername_label");
   $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_affectedoccupation_label");
   $('<p style="color:red" id=firstname>&nbsp*</p>').insertAfter("#ees_providercontactfirstname_label");
   $('<p style="color:red" id=lastname>&nbsp*</p>').insertAfter("#ees_providercontactlastname_label");
   $('<p style="color:red" id=phone>&nbsp*</p>').insertAfter("#ees_providercontactphone_label");
   $('<p style="color:red" id=email>&nbsp*</p>').insertAfter("#ees_providercontactemail_label ");
   $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_traininglength_label");
   //$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_certificatedescription_label");
   //if (role == "Anonymous")
   //     $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_manygrantdetailstothegrantappliid_label");

   $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_trainingprovidertype_label");
   $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_trainingprovider_label");
   $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_trainingprovidername_label");
//   $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_certificatesdescription_label");
  
   $('<p style="color:red">&nbsp</p><p>A certificate is required for reimbursement of training. A certificate may be awarded by a third party training provider or by your company directly to attest to the successful completion of training.</p>').insertAfter("#ees_certificatename_label");
   $("#ees_sourceidtp").val("Portal");
   $("#ees_sourceidtp").closest("td").hide();
   $("#ees_certificatedescription").closest("td").css("padding-bottom","0");

   restoreValues();  
  var grantGuid = sessionStorage.getItem('grantGuid');

     $("#ees_linkedbusinessid").val(data["Linked Buisness Value"]);
     $("#ees_linkedbusinessid_name").val(data["Linked Buisness Name"]);
     $("#ees_linkedbusinessid_entityname").val("account");
 //    $("#ees_linkedbusinessid").closest("td").hide();
 //    $("#ees_linkedbusinessid_name").hide();
 //    $("#ees_linkedbusinessid_label").hide();
    
    $("#ees_manygrantdetailstothegrantappliid").val(grantGuid);
    $("#ees_manygrantdetailstothegrantappliid_entityname").val("ees_grantapplicants");
    $("#ees_manygrantdetailstothegrantappliid_name").width(1050);
    $("#ees_manygrantdetailstothegrantappliid_name").val(data["Application Company Name"]);
    $("#ees_manygrantdetailstothegrantappliid_name").attr('disabled','disabled');
    $(".launchentitylookup").hide();
    $(".text-muted");
 //KSB 10/31/2022 story 6580
 //  $(".btn:lt(7)").hide(); 
 //

  $("#ees_etplidnew").change(function() {
      if ($("#ees_etplidnew").val() != "")
      suppressETPL();
      else
      showETPL();
  });

  $("#NextButton").hide();
//  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton" value="Next" onclick="sleep(2000);insertData(true);sleep(1000);if(error_flag)return;javascript:if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter('#NextButton');
  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$NextButton" value="Next" onclick="sleep(2000);insertData(true);sleep(1000);if(error_flag)return;javascript:if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$NextButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter('#NextButton');
  $("#PreviousButton").hide();
//  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$PreviousButton" value="Previous" onclick="sleep(1000);insertData(false);javascript:__doPostBack(\'ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$PreviousButton\',\'\')" id="PreviousButton2" class="btn btn-default button previous previous-btn" nonactionlinkbutton="true">').insertAfter("#PreviousButton")
  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$PreviousButton" value="Previous" onclick="sleep(1000);insertData(false);javascript:__doPostBack(\'ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$PreviousButton\',\'\')" id="PreviousButton2" class="btn btn-default button previous previous-btn" nonactionlinkbutton="true">').insertAfter("#PreviousButton")

document.getElementById('ees_providercontactphone').addEventListener('blur', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
  e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
});

if($("#ees_etplidnew").val() == "" ) 
document.getElementById('ees_providercontactemail').addEventListener('blur', function (e) {
  if (!isEmail($("#ees_providercontactemail").val())){
        alert('Provider Contact Email format is incorrect');
        
    }
});

if($("#ees_etplidnew").val() == "" )
$("#ees_providercontactphone").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
              evt.preventDefault();
            }

            if(self.val().length > 10)
            {
              self.val(self.val().substring(0,10));
            }
      });

$("#ees_traininglength").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
            evt.preventDefault();
            }
      });
      
      $("#ees_etplidnew").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
            evt.preventDefault();
            }
      });


       $("#ees_providercontactfirstname").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^a-zA-Z ]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
                  evt.preventDefault();
            }
      });
       

       $("#ees_providercontactlastname").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^a-zA-Z ]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
                  evt.preventDefault();
            }
      });

       $("#MaximumLengthValidatorees_providername").closest("div").hide();
        $("#MaximumLengthValidatorees_providercontactfirstname").closest("div").hide();
         $("#MaximumLengthValidatorees_providercontactlastname").closest("div").hide();
          $("#MaximumLengthValidatorees_providercontactphone").closest("div").hide();
           $("#MaximumLengthValidatorees_providercontactemail").closest("div").hide();
            $("#MaximumLengthValidatorees_traininglength").closest("div").hide();
             $("#MaximumLengthValidatorees_providername").closest("div").hide();
              $("#RangeValidatorees_averagehourlywagetacurrency").closest("div").hide();

$("#ees_etplidnew").closest("td").hide();

manageETPLid();

$("#ees_trainingprovider").on('change', function() { 
	manageETPLid();
});
if ($("#ees_trainingprovidertype_0").prop ("checked"))
    companySpecificTraining(); 
if ($("#ees_trainingprovidertype_1").prop ("checked"))
    thirdPartyTraining();

$("#ees_trainingprovidertype_0").on('change', function() { 
    if ($("#ees_trainingprovidertype_0").prop ("checked") )
	{
		companySpecificTraining(); 
	}
    if ($("#ees_trainingprovidertype_1").prop ("checked"))
    {
		thirdPartyTraining();
	}
	manageETPLid();
  });

$("#ees_trainingprovidertype_1").on('change', function() { 
    if ($("#ees_trainingprovidertype_0").prop ("checked") )
	{
		companySpecificTraining(); 
    }
    if ($("#ees_trainingprovidertype_1").prop ("checked"))
    {
		thirdPartyTraining();
	}
	manageETPLid();
  });

$("#ees_certificateawardedtpp").closest("td").prepend("<div style='margin-bottom: 10px;'>A certificate is required for reimbursement of training. A certificate may be awarded by a third party training provider or by your company directly to attest to the successful completion of training.</div>");

$('<div class="control"><input name="estcostpernewhire" type="text" value="" id="estcostpernewhire" class="text decimal form-control  dirty" onchange="setIsDirty(this.id);"></div>').insertAfter($('#ees_estcostpernewhire_label'));
 $('<p>&nbsp&nbsp($5,000 is the maximum amount allowed)</p>').insertAfter("#ees_estcostpernewhire_label");
 // Allow only a valid decimal number (integer for now)
$("#estcostpernewhire").on("input", function(evt) {
   var self = $(this);
   self.val(self.val().replace(/[^0-9]/g, ''));
   if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
   {
     evt.preventDefault();
   }
 });
$("#estcostpernewhire").val(formatCurrency( $("#ees_estcostpernewhire").val()));
$("#ees_estcostpernewhire").hide();
$("#estcostpernewhire").focus(function () {
        $("#estcostpernewhire").val($("#ees_estcostpernewhire").val());
});

$("#estcostpernewhire").blur(function () {
   $("#ees_estcostpernewhire").val($("#estcostpernewhire").val());
   $("#estcostpernewhire").val(formatCurrency( $("#ees_estcostpernewhire").val()));
});
// ees_averagehourlywagetacurrency
$('<div class="control"><input name="averagehourlywagetacurrency" type="text" value="" id="averagehourlywagetacurrency" class="text decimal form-control  dirty" onchange="setIsDirty(this.id);"></div>').insertAfter($('#ees_averagehourlywagetacurrency_label'));
// Allow only a valid decimal number
$("#averagehourlywagetacurrency").on("input", function(evt) {
   var self = $(this);
   self.val(self.val().replace(/[^0-9\.]/g, ''));
   if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57 )) 
   {
     evt.preventDefault();
   }
 });

$("#averagehourlywagetacurrency").val(formatCurrency( $("#ees_averagehourlywagetacurrency").val()));

$("#ees_averagehourlywagetacurrency").hide();

$("#averagehourlywagetacurrency").focus(function () {
        $("#averagehourlywagetacurrency").val($("#ees_averagehourlywagetacurrency").val());
});

$("#averagehourlywagetacurrency").blur(function () {
   $("#ees_averagehourlywagetacurrency").val($("#averagehourlywagetacurrency").val());
   $("#averagehourlywagetacurrency").val(formatCurrency( $("#ees_averagehourlywagetacurrency").val()));
});
if (lastStep == "Occupation")
      $("#NextButton").click();
});
function affectedOccupationLov() {
    var companyindustrysectortext = sessionStorage.getItem('companyindustrysectortext');
    
    $("#ees_affectedoccupation2").empty();
      let option = document.createElement("option");
                    option.value = "";
                    option.text = "";
                    $("#ees_affectedoccupation2").append(option);
    $.getJSON("/bs/getoccupationsbyindustry/", function (data) {
        if (data.results.length>0) {
            data.results.forEach(element => {
                let option = document.createElement("option");
                    option.value = element.id;
                    option.text = element.occupation;
                    $("#ees_affectedoccupation2").append(option);
            });   
        }
    });
}

  function updateAffectedOccupation() {
        var occupationRelatedGuid = sessionStorage.getItem('occupationRelatedGuid');
        var requestGuid = sessionStorage.getItem('requestGuid');
        var occupationGuid = sessionStorage.getItem('occupationGuid');
        var dataObject = {   
         "ees_occupation@odata.bind": "/new_occupations("+occupationGuid+")" 
           } 
    webapi.safeAjax({
      type: "PATCH",
      url: "/_api/ees_occupationrelatedentities("+occupationRelatedGuid+")",
      contentType: "application/json",
      data: JSON.stringify(dataObject),
      success: function(res, status, xhr) {
        }
    });
  }
  
function formatCurrency(total) {
    if (total == "")
       return ("");
       
    var neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

function companySpecificTraining() {
	$("#ees_trainingprovider").closest("td").hide();
    $("#ees_providername").closest("td").hide();
    trainingprovider_required = false;
    provider_name_required = false;
}

function thirdPartyTraining() {
	$("#ees_trainingprovider").closest("td").show();
    $("#ees_providername").closest("td").show();
    trainingprovider_required = true;
    provider_name_required = true;
}

function manageETPLid()
{
	var trainingProviderVal = $("#ees_trainingprovider option:selected").val();

	if(trainingProviderVal === "276030000" && $("#ees_trainingprovidertype_1").prop ("checked"))
	{
		$("#ees_etplidnew").closest("td").show();
        etplid_required = true;
	}
	else
	{
		$("#ees_etplidnew").closest("td").hide();
        etplid_required = false;
	}
}

function suppressETPL () {
$('#ees_providername').val("");
$("#ees_providercontactfirstname").val("");;
$("#ees_providercontactlastname").val("");
$("#ees_providercontactphone").val("");
$("#ees_providercontactemail").val("");
$('#ees_providername').hide();
$("#ees_providercontactfirstname").hide();
$("#ees_providercontactlastname").hide();
$("#ees_providercontactphone").hide();
$("#ees_providercontactemail").hide();
$("#firstname").hide();
$("#lastname").hide();
$("#phone").hide();
$("#email").hide();
$('#ees_providername_label').hide();
$("#ees_providercontactfirstname_label").hide();
$("#ees_providercontactlastname_label").hide();
$("#ees_providercontactphone_label").hide();
$("#ees_providercontactemail_label").hide();
}

function showETPL () {
$('#ees_providername').show();
$("#ees_providercontactfirstname").show();
$("#ees_providercontactlastname").show();
$("#ees_providercontactphone").show();
$("#ees_providercontactemail").show();
$('#ees_providername_label').show();
$("#ees_providercontactfirstname_label").show();
$("#ees_providercontactlastname_label").show();
$("#ees_providercontactphone_label").show();
$("#ees_providercontactemail_label").show();
$("#firstname").show();
$("#lastname").show();
$("#phone").show();
$("#email").show();
}

function insertData(validate) {
    if (validate) checkMandatory();
    if (validate && error_flag == true)
         return;
    //var xx = $("#ees_etplidnew").val();
    insertField("ETPL ID",$("#ees_etplidnew").val());
    insertField("Affected Occupation",$('#ees_affectedoccupation2 option:selected').text());
    insertField("Affected Occupation Value",$('#ees_affectedoccupation2 option:selected').val());
    insertField("Training Plan Name",$('#ees_name').val());
    insertField("Training Plan Name Value",$("#EntityFormView_EntityID").val());
	insertField("Briefly describe your occupational training",$("#ees_proposedtrainingdescription").val());
	insertField("Training Length",$("#ees_traininglength").val());
	insertField("Proposed Training Cost per Hire",$("#ees_estcostpernewhire").val());
	insertField("Average Hourly Wage",$("#ees_averagehourlywagetacurrency").val());

  if ($("#ees_trainingprovidertype_0").prop("checked")) {
           insertField("Training Type","Company Specific Training");  
        }
    else 
    if ($("#ees_trainingprovidertype_1").prop("checked"))
     {
            insertField("Training Type","Third Party Training");   
          }

    insertField("Training Provider",$('#ees_trainingprovider option:selected').text());
    insertField("Training ProviderVal",$('#ees_trainingprovider option:selected').val());
    insertField("Training Provider Name",$('#ees_providername').val());
    insertField("Training Contact First Name",$("#ees_providercontactfirstname").val());
    insertField("Training Contact Last Name",$("#ees_providercontactlastname").val());
    insertField("Training Contact Phone",$("#ees_providercontactphone").val());
    insertField("Training Contact Email",$("#ees_providercontactemail").val());
    insertField("Provider Name",$("#ees_providername").val());
	insertField("Expected # of New Hires Trained",$("#ees_anticipatednumberofnewhires").val());
	insertField("Expected # of Current Employees Trained",$("#ees_anticipatednumberofcurrentemployeestraine").val());  
    insertField("Certificate Name",$("#ees_certificatename").val());
    insertField("Certificate Description",$("#ees_certificatedescription").val());
    sessionStorage.setItem("grantAppData", JSON.stringify(data));
  
}

function insertField(_label,_value) {
    data[_label]=_value;
}

function checkCertification () {
if($("#ees_certificatename").val()  == "" || $("#ees_certificatedescription").val()  == "") {
    errorFlag = true;
    alert('Certificate Name and Description are required when a Certificate is awarded');
    return true; 
}
}

function restoreValues() {   
    if (data["Training Type"] == "Company Specific Training")
         $("#ees_trainingprovidertype_0").prop('checked', true);
    else
          if (data["Training Type"] == "Third Party Training")
               $("#ees_trainingprovidertype_1").prop('checked', true);           

     setOption('ees_trainingprovider',data['Training ProviderVal']); 
  // setOption('ees_affectedoccupation',data['Affected Occupation Value']); 
   $("#ees_name").val(data["Training Plan Name"]);
   $("#ees_etplidnew").val(data["ETPL ID"]);
   $("#ees_proposedtrainingdescription").val(data["Briefly describe your occupational training"]);
   $("#ees_traininglength").val(data["Training Length"]);
   $("#ees_estcostpernewhire").val(data["Proposed Training Cost per Hire"]);
   $('#ees_providername').val(data["Training Provider Name"]);
   $("#ees_providercontactfirstname").val(data["Training Contact First Name"]);
   $("#ees_providercontactlastname").val(data["Training Contact Last Name"]);
   $("#ees_providercontactphone").val(data["Training Contact Phone"]);
   $("#ees_providercontactemail").val(data["Training Contact Email"]);
   $("#ees_providername").val(data["Provider Name"]);
   $("#ees_anticipatednumberofnewhires").val(data["Expected # of New Hires Trained"]);
   $("#ees_anticipatednumberofcurrentemployeestraine").val(data["Expected # of Current Employees Trained"]);  
   $("#ees_certificatename").val(data["Certificate Name"]);
   $("#ees_certificatedescription").val(data["Certificate Description"]);
    if ($("#ees_etplidnew").val() != "")
      suppressETPL();
      else
      showETPL();
}

function checkMandatory () {
    error_flag = false;
    checkCertification();
/*
    var item = $('#ees_affectedoccupation2 option:selected').text();    
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for Affected Occupation');
             error_flag = true;
      }
*/
if (provider_name_required && $("#ees_etplidnew").val() == ""){
      item = $("#ees_providername").val();
      item = $.trim(item);

      if(item.length == 0 ) {
             alert('Please select a value for Provider Name');
             error_flag = true;
      }
}
       item = $("#ees_providercontactfirstname").val();
       item = $.trim(item);

      if(item.length == 0 && $("#ees_etplidnew").val() == "" ) {
             alert('Please select a value for Contact First Name');
              error_flag = true;
      }

     item = $("#ees_providercontactlastname").val();
       item = $.trim(item);

      if(item.length == 0  && $("#ees_etplidnew").val() == "") {
             alert('Please select a value for Contact Last Name');
              error_flag = true;
      }

    item = $("#ees_providercontactphone").val();
       item = $.trim(item);

      if(item.length == 0 && $("#ees_etplidnew").val() == "") {
             alert('Please select a value for Contact Phone');
              error_flag = true;
      }

    item = $("#ees_providercontactemail").val();
       item = $.trim(item);

      if(item.length == 0 && $("#ees_etplidnew").val() == "") {
             alert('Please select a value for Contact Email');
              error_flag = true;
      }     
      else if(!isEmail(item) && $("#ees_etplidnew").val() == "")
      {
            alert('Provider Contact Email format is incorrect');
            error_flag = true;
      } 

    item = $("#ees_traininglength").val();
       item = $.trim(item);

      if(item.length == 0 ) {
             alert('Please select a value for Training Length');
              error_flag = true;
      }

   item = $("#ees_estcostpernewhire").val();

      if(item > 5000) {
             alert('Please select a cost per hire <= $5,000');
              error_flag = true;
      }


  if (!$("#ees_trainingprovidertype_0").prop('checked') &&
      !$("#ees_trainingprovidertype_1").prop('checked')) {
             alert('Please select a value for Provider Type');
              error_flag = true;
      }

if (provider_name_required && $("#ees_etplidnew").val() == "") {
 item = $("#ees_providername").val();
       item = $.trim(item);

      if(item.length == 0 ) {
             alert('Please select a value for Provider Name');
              error_flag = true;
      }
}
if(trainingprovider_required) {
 item = $("#ees_trainingprovider").val();
       item = $.trim(item);

      if(item.length == 0 ) {
             alert('Please select a value for Provider');
              error_flag = true;
      }
}
}

function isEmail(email) {
  var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return EmailRegex.test(email);
}

function setOption(element, value) {
if (value != "") { 
var p1 = element + ' option[value="'
var p2 = '"]';
var res = p1+value+p2;
$(res).attr("selected","selected");

}
}
function sleep(milliseconds) {
            let timeStart = new Date().getTime();
            while (true) {
                let elapsedTime = new Date().getTime() - timeStart;
                if (elapsedTime > milliseconds) {
                    break;
                }
            }
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
