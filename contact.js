_data = "";
data= {};
$(document).ready(() => {

/*
debugger; //Contact
  var guid = sessionStorage.getItem('requestGuid');
   if (sessionStorage.getItem('TPGuidAppended') == 'false' && sessionStorage.getItem('TP Created') == 'true') {
       $('#liquid_form').attr('action', $('#liquid_form').attr('action')+ '&tpguid='+guid);
  // Only Append once
       sessionStorage.setItem('TPGuidAppended','true');
   }
   if (sessionStorage.getItem('TP Created') == 'true') {
     $('#ees_portaltpattached').val(1);
   }
*/

    var  tpguid = sessionStorage.getItem('requestGuid');
    $('#liquid_form').attr('action', $('#liquid_form').attr('action')+ '&tpguid='+tpguid);
    $('#ees_portaltpattached').closest("td").hide();
    $('#ees_portaltpattached_label').hide();
    $("#ees_email").closest("td").css("padding-bottom","0");
 //  $(".list-group-item:gt(5)").hide();
 //  $(".list-group-item:eq(4)").hide();
   var lastStep = sessionStorage.getItem("applicationStep");
    sessionStorage.setItem('applicationStep','Contact');

  data = JSON.parse(sessionStorage.getItem("grantAppData"));
 
  restoreValues();
  $("#PreviousButton").hide();
//  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$PreviousButton" value="Previous" onclick="sleep(1000);insertData(false);javascript:__doPostBack(\'ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$PreviousButton\',\'\')" id="PreviousButton2" class="btn btn-default button previous previous-btn" nonactionlinkbutton="true">').insertAfter("#PreviousButton")
  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$PreviousButton" value="Previous" onclick="sleep(1000);insertData(false);javascript:__doPostBack(\'ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$PreviousButton\',\'\')" id="PreviousButton2" class="btn btn-default button previous previous-btn" nonactionlinkbutton="true">').insertAfter("#PreviousButton")
  $("#NextButton").hide();
//  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton" value="Next" onclick="sleep(1000);if(!insertData(true)) return;sleep(1000);javascript:if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter('#NextButton');
  $('<input type="button" name="ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$NextButton" value="Next" onclick="if(!insertData(true)) return;javascript:if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentContainer$WebFormControl_36d8c59f2674ed1181ab001dd806a5d8$NextButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter('#NextButton');

// Phone mask
document.getElementById('ees_phonenumber').addEventListener('blur', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
  e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
});

      $("#ees_phonenumber").on("input", function(evt) {
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

});

function isEmail(email) {
  var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return EmailRegex.test(email);
}

function correctPhoneLength(phone) {
        if (phone.length != 14) {
          return false;
        }
        return true;
}
function restoreValues() {
      if (data["First Name"] != undefined)
         $("#ees_firstname").val(data["First Name"]);
      if (data["Last Name"] != undefined)
         $("#ees_lastname").val(data["Last Name"]);
      if (data["Email"] != undefined)
         $("#ees_email").val(data["Email"]);
      if (data["Primary Telephone"] != undefined)
         $("#ees_phonenumber").val(data["Primary Telephone"]);
      if (data["Job Title"] != undefined)
         $("#ees_jobtitle").val(data["Job Title"]);
}

function insertData(validate) {
    if (validate && !isEmail($("#ees_email").val())){
          alert('Email format is incorrect');
         return false;
    }
    if (validate && !correctPhoneLength($("#ees_phonenumber").val())){
          alert('Phone length is incorrect');
         return false;
    }

    insertField("Email",$("#ees_email").val());
    insertField("First Name",$("#ees_firstname").val());
    insertField("Last Name",$("#ees_lastname").val());	
    insertField("Primary Telephone",$("#ees_phonenumber").val());
    insertField("Job Title",$("#ees_jobtitle").val());
    sessionStorage.setItem("grantAppData", JSON.stringify(data));
    return true;
}

function insertField(_label,_value) {
    data[_label]=_value;
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
