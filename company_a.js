_data = "";
data ={};
url = window.location.href
outofState=sessionStorage.getItem('Out of State');
gguid = "";
$(document).ready(() => {  

    _data = sessionStorage.getItem("grantAppData");

if (_data != "")
     data=JSON.parse(_data);
     
$("#ees_defenseindustry").closest("td").css("padding-bottom","0");

$(".btn:lt(1)").hide();

$("#ees_sourceid").val("Portal");

  $(".list-group-item:gt(5)").hide();
  $(".list-group-item:eq(4)").hide();
   var lastStep = sessionStorage.getItem("applicationStep");
   var gguid = $("#EntityFormView_EntityID").val();
   sessionStorage.setItem('grantGuid',gguid);
   sessionStorage.setItem('applicationStep','Company');

   if (lastStep == "Overview"){
         clearCompanyType();
         $("#ees_companystate option[value='']").attr('selected', 'selected');
   }

  sessionStorage.setItem('applicationStep','Company');

$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_companystate_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_applicantname_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_zipcode_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_fein_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_businesssizegrantapplicant_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_certificatedescription_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_referralsource_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_womenbusinessenterprise_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_veteranbusinessenterprise_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_minoritybusinessenterprise_label");
$('<p style="color:red">&nbsp*</p>').insertAfter("#ees_defenseindustry_label");
var check = $("#ees_suta_label").val();
if (check.indexOf('*') ==  -1)
     $('<p style="color:red">&nbsp*</p>').insertAfter("#ees_suta_label");
  var laststep = sessionStorage.getItem('applicationStep');
  sessionStorage.setItem('applicationStep','Company');
 
$("#ees_websiteurl").on("change", function() {
     validateWebsite();
});  

$("#ees_companystate").on("change", function() {
      if ($('#ees_companystate option:selected').val() != "276030013")     {
        $("#ees_countyid").val(outofState);
        $("#ees_countyid").attr('disabled','disabled');
      }
      else
          $("#ees_countyid").removeAttr("disabled");
});   


$("#ees_sourceid").closest("td").hide();
//$("#ees_sourceid_label").hide();
$("#ees_granttype").hide();

$("#ees_granttype").val('1');
$("#ees_granttype_label").hide();
$("#ees_applicationstatus").closest("td").hide();
$("#ees_applicationstatus_label").hide();

// $('<input type="button" name="ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton" value="Next" onclick="sleep(1000);activateCounty(); sleep(1000);if (insertData()) { if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentContainer$WebFormControl_44307413a1a6ec11b3fe001dd804fb18$NextButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))}" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter("#NextButton");
 $('<input type="button" name="ctl00$ContentContainer$WebFormControl_9a886c3c494aed11bba0001dd80507a7$NextButton" value="Next" onclick="sleep(1000);activateCounty(); sleep(1000);if (insertData()) { if(typeof webFormClientValidate === \'function\'){if(webFormClientValidate()){if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{return false;}}else{if(typeof Page_ClientValidate === \'function\'){if(Page_ClientValidate(\'\')){clearIsDirty();disableButtons();this.value = \'Processing...\';}}else{clearIsDirty();disableButtons();this.value = \'Processing...\';}};WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentContainer$WebFormControl_9a886c3c494aed11bba0001dd80507a7$NextButton&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))}" id="NextButton2" class="btn btn-primary button next submit-btn" nonactionlinkbutton="true">').insertAfter("#NextButton");
 $("#NextButton").hide();
  $("#PreviousButton").hide();


      $("#ees_fein").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
                  evt.preventDefault();
            }
            if(self.val().length >= 9)
            {
                  var str = self.val().substring(0,9);
                  self.val(str);
            }
                  
      });

      document.getElementById('ees_fein').addEventListener('blur', function (e) {
            var x = e.target.value.length;
            if(x >= 2)
            {
                  var feinVal = (e.target.value).replace("-","");
                  var b = "-";
                  var position = 2;
                  var output = [feinVal.slice(0, position), b, feinVal.slice(position)].join('');
                  e.target.value = output;
            }

            if(x < 9)
            {
                  $("#ees_fein").blur();
                  alert("The FEIN must be exactly 9 digits.");
            }
           
      });

       $("#ees_zipcode").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
                  evt.preventDefault();
            }
      });

      $("#ees_suta").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^0-9]/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
                  evt.preventDefault();
            }
      });

      $("#ees_companycity").on("input", function(evt) {
            var self = $(this);
            self.val(self.val().replace(/[^a-zA-Z. \']/g, ''));
            if ((evt.which != 46 ) && (evt.which < 48 || evt.which > 57)) 
            {
                  evt.preventDefault();
            }
      });

      $("#MaximumLengthValidatorees_fein").closest("div").hide();
      $("#MaximumLengthValidatorees_suta").closest("div").hide();
      $("#MaximumLengthValidatorees_applicantname").closest("div").hide();
      $("#MaximumLengthValidatorees_zipcode").closest("div").hide();

      
      
 
});

function updateStatusandType() {
// Draft
 $('#ees_applicationstatus').val(276030008);
 $('#ees_granttype').val(1);
}

function validateWebsite() {
       var result = true;
       var pattern = /^[a-zA-Z0-9-\.]+\.[a-z]{2,4}/

      var regex = new RegExp(pattern);
      var website_url = $("#ees_websiteurl").val();// url of the website

      website_url = website_url.replace(/^(https:\/\/)/,'');
      website_url = website_url.replace(/^(http:\/\/)/,'');

      if(website_url != 'N/A' && website_url != 'NA' && website_url != 'N/A' &&  website_url != 'na'  && website_url != 'n/a'  )
      {
            if (website_url.match(regex) ) {
            } else {
                  alert('Please enter a valid Company Web Site or N/A');
                  result = false;
            }
      }
      return(result);
}

function activateCounty() {
      $("#ees_countyid").removeAttr("disabled");
}
function clearCompanyType () {
  $("#ees_minoritybusinessenterprise_0").removeAttr('checked');
  $("#ees_veteranbusinessenterprise_0").removeAttr('checked');
  $("#ees_womenbusinessenterprise_0").removeAttr('checked');
  $("#ees_defenseindustry_0").removeAttr('checked');
}

function insertData() {
    if (!checkType())
        return(false);

    insertField("Application Company Name",$("#ees_applicantname").val());
    insertField("Company City",$("#ees_companycity").val());
	
	if ($("#ees_veteranbusinessenterprise_0").prop("checked")) 
          insertField("Veteran Business Enterprise","No");    
        else  
         if ($("#ees_veteranbusinessenterprise_1").prop("checked")) 
          insertField("Veteran Business Enterprise","Yes")
          else
            insertField("Veteran Business Enterprise",""); 
  

     if ($("#ees_minoritybusinessenterprise_0").prop("checked")) 
          insertField("Minority Business Enterprise","No");    
        else  
         if ($("#ees_minoritybusinessenterprise_1").prop("checked")) 
          insertField("Minority Business Enterprise","Yes")
          else
            insertField("Minority Business Enterprise",""); 
  
     if ($("#ees_womenbusinessenterprise_0").prop("checked")) 
          insertField("Women Business Enterprise","No");    
        else  
         if ($("#ees_womenbusinessenterprise_1").prop("checked")) 
          insertField("Women Business Enterprise","Yes")
          else
            insertField("Women Business Enterprise",""); 
			
	  if ($("#ees_defenseindustry_0").prop("checked")) 
          insertField("Defense Industry","No");    
        else  
         if ($("#ees_defenseindustry_1").prop("checked")) 
          insertField("Defense Industry","Yes")
          else
            insertField("Defense Industry",""); 
								
    insertField("Company Address",$("#ees_companyaddress").val());
    insertField("SUTA",$("#ees_suta").val());
    insertField("Company Zip",$("#ees_zipcode").val());
    insertField("Company Industry Sector",$('#ees_companyindustrysector option:selected').text());
    sessionStorage.setItem('companyindustrysectortext',$('#ees_companyindustrysector option:selected').text());
    insertField("Business Size",$('#ees_businesssizegrantapplicant option:selected').text());
    insertField("Company Website",$("#ees_websiteurl").val());
        
    insertField("Federal Employer Identification Number (FEIN)",$("#ees_fein").val());
    insertField("Company State",$('#ees_companystate option:selected').text());

    insertField("Company County",$('#ees_countyid option:selected').text()); 
    insertField("Company County Value",$('#ees_countyid option:selected').val()); 
    insertField("How were you made aware of the Employer Training Grant?",$('#ees_referralsource option:selected').text());
    sessionStorage.setItem("grantAppData", JSON.stringify(data));
    return(true);
}

function insertField(_label,_value) {
    data[_label]=_value;
}

function prefillFields() {
      $("#ees_applicantname").val(data['Application Company Name']);

      
      $("#ees_companycity").val(data['Company City']);

      $("#ees_companyaddress").val(data['Company Address']);
      $("#ees_zipcode").val(data['Company Zip']);

     setOption('#ees_businesssizegrantapplicant',data["Business Size Value"]);

    $("#ees_websiteurl").val(data['Company Website']);
    $("#ees_suta").val(data['SUTA']);

     if (data["Company State"] == "IN" || data["Company State"] == "Indiana" )
         $('#ees_companystate').val("276030013");

     setOption('#ees_countyid',data["Company County Value"]);
     setOption('#ees_naicscode',data["NAICS Code Value"]);
}

function setOption(element, value) {
if (value != "") { 
var p1 = element + ' option[value="'
var p2 = '"]';
var res = p1+value+p2;
$(res).attr("selected","selected");

}
}

function checkType(event) {
      var result = true;
	    
      if(!$('#ees_minoritybusinessenterprise_0').prop('checked') && !$('#ees_minoritybusinessenterprise_1').prop('checked')) {
             alert('Please select a value for Minority Business Enterprise');
             result = false;
      }

      if(!$('#ees_womenbusinessenterprise_0').prop('checked') && !$('#ees_womenbusinessenterprise_1').prop('checked')) {
        alert('Please select a value for Women Business Enterprise');
             result = false;
      }

      if(!$('#ees_veteranbusinessenterprise_0').prop('checked') && !$('#ees_veteranbusinessenterprise_1').prop('checked')) {
             alert('Please select a value for Veteran Business Enterprise');
             result = false;
      }

      if(!$('#ees_defenseindustry_0').prop('checked') && !$('#ees_defenseindustry_1').prop('checked')) {
             alert('Please select a value for Defense Industry');
             result = false;
      }

      var item = $("#ees_zipcode").val();    
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for Zip Code');
             result = false;
      }

      item = $("#ees_fein").val();     
      item = $.trim(item);
      if(item.length !=10 ) {
             alert('FEIN must be exactly 9 digits');
             result = false;
      }

      item = $("#ees_suta").val();     
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for SUTA');
             result = false;
      }
      else if(item.length < 6)
      {
            alert('Please Enter your 6+ digit SUTA');
            result = false;
      }

      item = $('#ees_referralsource option:selected').text();    
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for referral source');
             result = false;
      }

      item = $('#ees_businesssizegrantapplicant option:selected').text();  
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for business size');
             result = false;
      }
 
      item = $("#ees_applicantname").val();
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for Application Company Name');
             result = false;
      }

      item = $('#ees_companystate option:selected').text(); 
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for Company State');
             result = false;
      }

      item = $('#ees_countyid option:selected').text(); 
      item = $.trim(item);
      if(item.length == 0 ) {
             alert('Please select a value for Company County');
             result = false;
      }
            
      if (!validateWebsite())
         result = false;
         
      return(result);
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