/**
 * This file contains the functions that manage the new link creation.
 *
 */

function select_node(ele){
    console.log(ele);
    //if(NF_view===false && ele.ref!=="bsInt") return;
    if(creating_link===true){ //possiamo creare un link
        if(ele1_selected===undefined){
            ele1_selected=ele;
            createTempLink();
        }else if(ele2_selected===undefined){
            if(ele1_selected.ref==="bsInt" && ele.ref!=="bsInt") return;
            if(ele1_selected.ref!=="bsInt" && ele.ref==="bsInt") return;
            ele2_selected=ele;
            console.log("qua ci arrivo");
            deleteTempLink();
            /*
             * QUA INSERIRE FINESTRA INSERIMENTO DATI FLOWS RULE
             */
            console.log("showModalFlow");

            if(!BS_view){
                hideComplexFRFields();
            }else{
                showComplexFRFields();
            }
            $('#idPriority').val(1);
            $("#idFlowRule").val(NextIdFlowRule());
            $("#idPortIn").val(ele1_selected.id);
            $("#idOutput").val(ele2_selected.id);
            unSetKeysWindowListener();
            $("#ModalFlowRules").modal("show");
            resetFormFlowRules();
            hideMatch();
            hideAction();
            $("#selLink").val("unidirectional link");
            $("#selLink").removeAttr("disabled");
            $(".duplicate").hide();
            
            $("#saveRule").attr('onclick','DrawNewLink()');
            $("#saveRule").html("Add Rule");
        }
    }
}

function DrawNewLink(){

    console.log($("#selLink").val());

    if($("#selLink").val()==="bidirectional link"){
        /* create two links */

        var newFR = fillNewFlowRule();
        var newFR2 = fillNewFlowRule2();

        console.log(newFR2);
        if(validateNewFlowRule(newFR) && validateNewFlowRule(newFR2)){
            isModified=true;

            var duplex=true;            
            var duplex2=true;
            
            flow_rules.push(newFR);
            flow_rules.push(newFR2);
            
            console.log(duplex);
            checkSplit();
            
            createLink(duplex,newFR.id,2);            
            createLink(duplex2,newFR2.id,1);
            
            $("#ModalFlowRules").modal("hide");
            if(BS_view){
                drawBigSwitchInfo(fg);
            }else{
                drawAnyItems();
            }
            setKeysWindowListener();
            updateView();
        }else{
            console.log("validazione fallita");
        }

    }else{
        /* create only one link */
        var newFR = fillNewFlowRule();

        if(validateNewFlowRule(newFR)){
            isModified=true;
            var duplex=isDuplex(newFR["match"]["port_in"],newFR["actions"][0]["output"]);
            newFR["full_duplex"]=duplex;
            
            flow_rules.push(newFR);
            console.log(duplex);
            checkSplit();
            createLink(duplex,newFR.id,1);
            $("#ModalFlowRules").modal("hide");
            if(BS_view){
                drawBigSwitchInfo(fg);
            }else{
                drawAnyItems();
            }
            setKeysWindowListener();
            updateView();
        }else{
            console.log("validazione fallita");
        }
    }
}

function deleteTempLink(){
    $('#newLinkButton').attr("class","btn btn-success btn-lg drawButton");
    $("#my_canvas").css("cursor","default");
    creating_link=false;
    svg.on("mousemove",null);
    lines_section.select("#newTmpLine").remove();
}
//temp link is the link that appear during the creation
function createTempLink(){
    var x1,y1,x2,y2;
    if(ele1_selected.ref==="bsInt" ){
        x1=ele1_selected.x+big_switch.x;
        y1=ele1_selected.y+big_switch.y;
    }

    if(ele1_selected.ref==="end-point"){
        x1=ele1_selected.x;
        y1=ele1_selected.y;
    }
    if(ele1_selected.ref==="NF_interface"){
        x1=parseInt(ele1_selected.x)+parseInt(ele1_selected.parent_NF_x);
        y1=parseInt(ele1_selected.y)+parseInt(ele1_selected.parent_NF_y);
    }
    var newLine=lines_section.append("line")
        .attr("x1",x1)
        .attr("y1",y1)
        .attr("id","newTmpLine")
        .attr("stroke","green")
        .style("stroke-dasharray",("3,3"))
        .attr("class","line");

    svg.on("mousemove",function(){

        var coordinates = [0, 0];
        coordinates = d3.mouse(this);
        var x = coordinates[0];
        var y = coordinates[1];
        //console.log("x: "+x);
        //console.log("y: "+y);
        newLine.attr("x2",x)
            .attr("y2",y);

    });
}

function createLink(duplex,idFR,num){
    console.log(ele1_selected);
    console.log(ele2_selected);

    var bs_int1={},bs_int2={};
    var ele1={},ele2={};

    if(ele1_selected.ref==="bsInt"){
        bs_int1.x=ele1_selected.x;
        bs_int1.y=ele1_selected.y;
        bs_int2.x=ele2_selected.x;
        bs_int2.y=ele2_selected.y;

        bs_int1.id=ele1_selected.id;
        bs_int2.id=ele2_selected.id;
        var type1=ele1_selected.id.split(":");
        var type2=ele2_selected.id.split(":");

        if(type1[0]==="endpoint"){
            var tmp=getEndPointByCompleteId(ele1_selected.id);
            ele1.x = tmp.x;
            ele1.y = tmp.y;
            ele1.id = "endpoint:" + tmp.id;
        }else if(type1[0]==="vnf") {
            var tmp = getInterfaceById(ele1_selected.id);
            ele1.x = parseInt(tmp.x) + parseInt(tmp.parent_NF_x);
            ele1.y = parseInt(tmp.y) + parseInt(tmp.parent_NF_y);
            ele1.id = "vnf:" + tmp.parent_NF_id + ":" + tmp.id;
        }
        if(type2[0]==="endpoint"){
            var tmp=getEndPointByCompleteId(ele2_selected.id);
            ele2.x = tmp.x;
            ele2.y = tmp.y;
            ele2.id = "endpoint:" + tmp.id;
        }else if(type2[0]==="vnf"){
            var tmp=getInterfaceById(ele2_selected.id);
            ele2.x = parseInt(tmp.x) + parseInt(tmp.parent_NF_x);
            ele2.y = parseInt(tmp.y) + parseInt(tmp.parent_NF_y);
            ele2.id = "vnf:" + tmp.parent_NF_id + ":" + tmp.id;
        }
    }else {

        if (ele1_selected.ref === "end-point") {
            ele1.x = ele1_selected.x;
            ele1.y = ele1_selected.y;
            ele1.id = "endpoint:" + ele1_selected.id;
        }
        if (ele1_selected.ref === "NF_interface") {
            ele1.x = parseInt(ele1_selected.x) + parseInt(ele1_selected.parent_NF_x);
            ele1.y = parseInt(ele1_selected.y) + parseInt(ele1_selected.parent_NF_y);
            ele1.id = "vnf:" + ele1_selected.parent_NF_id + ":" + ele1_selected.id;
        }

        bs_int1=getBSInterfaceById(ele1.id);

        if (ele2_selected.ref === "end-point") {
            ele2.x = ele2_selected.x;
            ele2.y = ele2_selected.y;
            ele2.id = "endpoint:" + ele2_selected.id;
        }
        if (ele2_selected.ref === "NF_interface") {
            ele2.x = parseInt(ele2_selected.x) + parseInt(ele2_selected.parent_NF_x);
            ele2.y = parseInt(ele2_selected.y) + parseInt(ele2_selected.parent_NF_y);
            ele2.id = "vnf:" + ele2_selected.parent_NF_id + ":" + ele2_selected.id;
        }

        bs_int2=getBSInterfaceById(ele2.id);
    }

    /*draw bs internal link*/
    lines_section.append("line")
        .attr("class","BS-line")
        .attr("stroke","black")
        //  .attr("opacity",0.6)
        .attr("x1",bs_int1.x+big_switch.x)
        .attr("y1",bs_int1.y+big_switch.y)
        .attr("x2",bs_int2.x+big_switch.x)
        .attr("y2",bs_int2.y+big_switch.y)
        .attr("idfr","fr-"+idFR)
        .attr("data-html","true")
        .attr("title",function(){
            if(duplex==true){
                return ""+bs_int1.id+"<br> <---> <br>"+bs_int2.id+"<br> link full duplex";
            }else{
                return ""+bs_int1.id+"<br> ---> <br>"+bs_int2.id;
            }
        })
        //aggiungo l'info da chi parte a chi arriva
        .attr("start","bs-"+bs_int1.id)
        .attr("end","bs-"+bs_int2.id)
        .attr("fullduplex",duplex)
        .attr("marker-end",function(d) {
           if(duplex) return "default";
            return "url(#IntArrow)";

        })
        .on("click",selectNewInternalBSLinks);


    /* draw the external link */
   lines_section.append("line")
        .attr("x1",ele1.x)
        .attr("y1",ele1.y)
        .attr("x2",ele2.x)
        .attr("y2",ele2.y)
       .attr("idfr","fr-"+idFR)
        .attr("stroke","black")
        .attr("class","line")
        .attr("start",ele1.id)
        .attr("end",ele2.id)
       .attr("fullduplex",duplex)
       .attr("marker-end",function() {
           if(duplex===true) return "default";
           var type=ele2.id.split(":");
           if(type[0]==="vnf") return "url(#IntArrow)"
           else return "url(#EPArrow)";
       })
        .on("click",selectSimpleLines);

    if(num==1){
        ele1_selected=undefined;
        ele2_selected=undefined;
    }
    setPointerAtLines();
    updateTooltips();
}