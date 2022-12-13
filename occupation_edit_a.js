_data = "";
data= {};
   $(document).ready(() => {
      var guid = $('#EntityFormView_EntityID').val();
      if (guid != '00000000-0000-0000-0000-000000000000')
          sessionStorage.setItem('OccupationGuid',guid);
    $('<h1 style="color:red;font-size:40px;">Processing, Please wait for Confirmation Screen...</h1>').insertAfter(".list-group-item:eq(0)");
    $(".list-group-item").hide();
  	$(".launchentitylookup").hide();
    $(".btn").hide(); 
    $("#ees_occupation_name").hide();
    $("#ees_occupation_label").hide();
    $("#ees_trainingplan_name").hide();
    $("#ees_trainingplan_label").hide();
    var lastStep = sessionStorage.getItem('applicationStep');
    if (lastStep == 'Confirm')
      sessionStorage.setItem('applicationStep','Confirm');
    else
      sessionStorage.setItem('applicationStep','Occupation');
    _data = sessionStorage.getItem("grantAppData");
    data = JSON.parse(_data);   
   $("#ees_trainingplan_name").val(data["Training Plan Name"]);
   $("#ees_trainingplan").val(data["Training Plan Name Value"]);
   $("#ees_trainingplan_entityname").val("ees_grantapplicationdetails");

   $("#ees_occupation_name").val(data["Affected Occupation"]);
   $("#ees_occupation").val(data["Affected Occupation Value"]); 
   $("#ees_occupation_entityname").val("new_occupation");

   if (lastStep == "Request")
      if (data["Training Plan Name Value"] == "00000000-0000-0000-0000-000000000000")
       $("#PreviousButton").click();
   else
       $("#NextButton").click();
   if (lastStep == "Confirm")
      $("#PreviousButton").click();
 
   });
