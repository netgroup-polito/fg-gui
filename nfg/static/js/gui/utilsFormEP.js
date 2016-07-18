/* In this file there are all functions to manage 
   the EndPoint form */



/*
function drawFormEP(){
    var opt = "";

            $(function(){
                $("#boxInterface").hide();
                $("#boxGre").hide();
                $("#boxVlan").hide();
                $("#titleInterface").hide();
           
                $("#seltypeEP").change(function(){
                    var opt_sel = $( "#seltypeEP" ).val();
                                      
                        switch(opt_sel){

                            case "internal":
                                viewInputIternal();
                                break;

                            case "interface":
                                viewInputInterface();
                                break;

                            case "interface-out":
                                viewInputInterface();
                                break;

                            case "gre-tunnel":
                                viewInputGre();
                                break;

                            case "vlan":
                                viewInputVlan();
                                break;
                        }
                        opt = opt_sel;
                        console.log($( "#seltypeEP" ).val());                    
                })
            })            
}

*/

function showEditInfoEP(idEP){
    unSetKeysWindowListener();
    fillFormInfoEP(idEP);
}


function fillFormInfoEP(idEP){
    var ep;
    ep = getEndPointById(idEP);
    var type=ep["type"];

    $("#nameEP").val(ep["name"]);
    $("#remoteEPid").val(ep["remote_endpoint_id"]);
    $("#idEndPoint").val(ep["id"]);



    onClickDrawEP(type,ep)


    $("#saveEP").attr("onclick","saveNewEp()");
    $("#saveEP").html("Save End Point");
    $('#FormEP').modal('show');


    console.log(ep);

}

function viewInputIternal(){
    $("#boxVlan").hide();
    $("#boxGre").hide();
    $("#boxInterface").hide();
    $("#titleInterface").hide();
}

function viewInputInterface(){
    $("#boxVlan").hide();
    $("#boxGre").hide();
    $("#boxInterface").show();
    $("#titleInterface").show().html("Interface");
}

function viewInputGre(){
    $("#boxVlan").hide();
    $("#boxGre").show();
    $("#boxInterface").hide();
    $("#titleInterface").show().html("Gre-tunnel");
}

function viewInputVlan(){
    $("#boxVlan").show();
    $("#boxGre").hide();
    $("#boxInterface").hide();
    $("#titleInterface").show().html("Vlan");
}


function resetFormEp(){
    $("#titleInterface").hide();
    $('#boxInterface').hide();
    $('#boxGre').hide();
    $('#boxVlan').hide();


    /* Reset Input Form */
    $("#nameEP").val("");
    $("#remoteEPid").val("");
    /*interface*/
    resetInputsInterface();
    /*gre*/
    resetInputsGree();
    /*vlan*/
    resetInputsVlan();
    /* Reset Validazione */
    resetValidation();
}

function resetInputsInterface(){
    $("#interface").val("");
    $("#remoteIP").val("");
    $("#node").val("");
    $("#switch").val("");
}

function resetInputsGree(){
    $("#localIP").val("");
    $("#remoteIP").val("");
    $("#greInterface").val("");
    $("#ttl").val("");
}

function resetInputsVlan(){
    $("#vlanID").val("");
    $("#vlanSwitch").val("");
    $("#vlanInterface").val("");
    $("#vlanNode").val("");
}

function resetValidation(){
    $("#interface").parent().parent().attr("class","form-group");
    $("#localIP").parent().parent().attr("class","form-group");
    $("#remoteIP").parent().parent().attr("class","form-group");
    $("#greInterface").parent().parent().attr("class","form-group");
    $("#vlanID").parent().parent().attr("class","form-group");
    $("#vlanInterface").parent().parent().attr("class","form-group");
}



