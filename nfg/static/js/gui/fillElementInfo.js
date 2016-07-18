


function fillNewEP(){
	
	var ep = {};
    var type=$("#seltypeEP").val();

	ep["name"] = $("#nameEP").val();
	ep["type"] = type;
	ep["remote_endpoint_id"] = $("#remoteEPid").val();
    ep["id"] = $("#idEndPoint").val()
    ep["icon"] = $("#selIconEP").val();

    $("#idEndPoint").val(ep["id"]);
    
    
    for(var t in currentEP["properties"]){
        var selector="#id"+t;
        var s=$(selector).val();
        if(!ep.hasOwnProperty(type))
                ep[type]={};
        ep[type][t]=$(selector).val()
    }


	console.log(ep);

    ep["x"] = Math.random()*50+200;
    ep["y"] = Math.random()*10+40;
	
    return ep;
}

function updateEP(){
    return fillNewEP();

} 

function fillNewVNF(){

    var vnf = {};
    var port = {};

    vnf["x"] = Math.random()*100+400;
    vnf["y"] = Math.random()*30+50;
    
    vnf["id"] = $("#idVNF").val();
    vnf["name"] = $("#nameVNF").val();
    vnf["vnf_template"] = template_js.name;
    vnf["ports"] = [];

    var ports_template = template_js.ports;

    ports_template.forEach(function(port_t){
        var num_port = $("#MinMax"+port_t.label).val();
        console.log(num_port);
        
        for(var i=0;i<num_port;i++){
            port = {};
            port.id = port_t.label+":"+i;
            port.name = port_t.name+i;

            port.x = i*8;
            port.y = 0;
            port.parent_NF_x = vnf["x"];
            port.parent_NF_y = vnf["y"];

            port.parent_NF_id = $("#idVNF").val();
            vnf["ports"].push(port);
        }

    });

    console.log(vnf);
       
    return vnf;
}

function updateVNF(){
    setKeysWindowListener();
    var vnf = {};
    var port = {};

    //vnf["id"] = $("#idVNF").val();
    //
    //NF_list.forEach(function(ele){
    //    if(vnf.id == ele.id) vnf = ele;
    //});
    vnf=getVNFById($("#idVNF").val());
    /* recupero la VNF  da modificare */

    console.log(vnf);
    vnf["name"] = $("#nameVNF").val();
    if( vnf["name"]=== undefined ||  vnf["name"]===""){
        vnf["name"]="Unnamed VNF";
    }

    console.log(vnf);     

    $('#text_'+vnf.id).text(vnf.name);

    $('#FormNF').modal('hide');

    return vnf;

}


function NextIdEP(){
    var len=EP_list.length;
    var newid;
    if(len===0){
        newid=1;
    }else {
        newid=parseInt(EP_list[len - 1].id) + 1;
    }
    var s_id;
    if(newid<10){
        s_id="0000000"+newid;
    }else{
        s_id="000000"+newid;
    }
    return s_id;
}

function validateNewEndPoint(endpoint){
    var validate = true;
    var reqired=[];
    var type=currentEP["type"];
    reqired=currentEP["required"];

    for(var i=0;i<reqired.length;i++){
        var selector="#id"+reqired[i];
        if(endpoint[type][reqired[i]]=="") {
            validate = false;
            $(selector).parent().parent().attr("class","form-group has-error has-feedback");
          console.log("non trovo "+reqired[i]);
        }
        else //erase error
            $(selector).parent().parent().attr("class","form-group");
    }




    if(endpoint.id==""){ validate = false;
                           console.log("id null");}   /*required*/

    return validate;
}

/***************************************************************************************/
/*                                  VNF fill                                           */
/***************************************************************************************/

function NextIdVNF(){
    var len=NF_list.length;
    var newid;
    if(len!==0){
        newid=parseInt(NF_list[len-1].id)+1;
    }else{
        newid=1;
    }
    var s_id;
    if(newid<10){
        s_id="0000000"+newid;
    }else{
        s_id="000000"+newid;
    }
    return s_id;
}

function fillTemplateVNF(template){

    $("#idExpandable").val(template["expandable"]);
    $("#idUri").val(template["uri"]);
    
    $("#idType").val(template["vnf-type"]);
    $("#idMemorySize").val(template["memory-size"]);
    $("#idRoot").val(template["root-file-system-size"]);
    $("#idRootFileSystemSize").val(template["root-file-system-size"]);
    $("#idSwapDiskSize").val(template["swap-disk-size"]);
}

/***************************************************************************************/
/*                                  FlowRule fill                                      */
/***************************************************************************************/


function NextIdFlowRule(){
    var len = flow_rules.length;
    var newid;
    if(len===0){
        newid=1;
    }else{
        newid = parseInt(flow_rules[len-1].id)+1
    }
    var s_id;
    if(newid<10){
        s_id = "0000000"+newid;
    }else{
        s_id = "000000"+newid;
    }

    return s_id;
}

function fillNewFlowRule(){
    var flow_rule = {};
    var match = {};

    var actions = [];
    var action = {};

    flow_rule["double"] = false;            /*chiedere  a francesco settaggio iniziale*/
    flow_rule["full_duplex"] = false;
    
    flow_rule["id"] = NextIdFlowRule();
    flow_rule["priority"] = $("#idPriority").val();
    flow_rule["description"] = $("#idDescription").val();
    
    match["hard_timeout"] = $("#idHardTimeout").val();
    match["ether_type"] = $("#idEtherType").val();
    match["vlan_id"] = $("#idVlanID").val();
    match["vlan_priority"] = $("#idVlanPriority").val();
    match["source_mac"] = $("#idSourceMac").val();
    match["dest_mac"] = $("#idDestinationMac").val();
    match["source_ip"] = $("#idSourceIP").val();
    match["dest_ip"] = $("#idDestinationIP").val();
    match["tos_bits"] = $("#idTosBits").val();
    match["source_port"] = $("#idSourcePort").val();
    match["dest_port"] = $("#idDestinationPort").val();
    match["protocol"] = $("#idProtocol").val();
    //match["port_in"] = $("#idPortIn").val();
    match["port_in"] = ele1_selected.fullId;


    flow_rule["match"] = match;

    //action["output"] = $("#idOutput").val();
    action["output"] = ele2_selected.fullId;

    action["set_vlan_id"] = $("#idSetVlanId").val();
    action["set_vlan_priority-id"] = $("#idSetVlanPriorityId").val();
    action["pop_vlan"] = $("#idPopVlan").val();
    action["set_ethernet_src_address"] = $("#idSetEthernetSrcAddress").val();
    action["set_ethernet_dst_address"] = $("#idSetEthernetDstAddress").val();
    action["set_ip_src_address"] = $("#idSetIpSrcAddress").val();
    action["set_ip_dst_address"] = $("#idSetIpDstAddress").val();
    action["set_ip_tos"] = $("#idSetIpTos").val();
    action["set_l4_src_port"] = $("#idSetL4SrcPort").val();
    action["set_l4_dst_port"] = $("#idSetL4DstPort").val();
    action["output_to_queue"] = $("#idOutputToQueue").val();

    actions.push(action);
    flow_rule["actions"] = actions;

    console.log("flow rule appena creata");
    console.log(flow_rule);

    return flow_rule;
}


function fillNewFlowRule2(){
    var flow_rule = {};
    var match = {};

    var actions = [];
    var action = {};

    flow_rule["double"] = false;            /*chiedere  a francesco settaggio iniziale*/
    flow_rule["full_duplex"] = false;

    flow_rule["id"] = $("#idFlowRule2").val();
    flow_rule["priority"] = $("#idPriority2").val();
    flow_rule["description"] = $("#idDescription2").val();
    

    match["hard_timeout"] = $("#idHardTimeout2").val();
    match["ether_type"] = $("#idEtherType2").val();
    match["vlan_id"] = $("#idVlanID2").val();
    match["vlan_priority"] = $("#idVlanPriority2").val();
    match["source_mac"] = $("#idSourceMac2").val();
    match["dest_mac"] = $("#idDestinationMac2").val();
    match["source_ip"] = $("#idSourceIP2").val();
    match["dest_ip"] = $("#idDestinationIP2").val();
    match["tos_bits"] = $("#idTosBits2").val();
    match["source_port"] = $("#idSourcePort2").val();
    match["dest_port"] = $("#idDestinationPort2").val();
    match["protocol"] = $("#idProtocol2").val();
    //match["port_in"] = $("#idPortIn").val();
    match["port_in"] = ele2_selected.fullId;


    flow_rule["match"] = match;

    //action["output"] = $("#idOutput").val();
    action["output"] = ele1_selected.fullId;

    action["set_vlan_id"] = $("#idSetVlanId2").val();
    action["set_vlan_priority-id"] = $("#idSetVlanPriorityId2").val();
    action["pop_vlan"] = $("#idPopVlan").val();
    action["set_ethernet_src_address"] = $("#idSetEthernetSrcAddress2").val();
    action["set_ethernet_dst_address"] = $("#idSetEthernetDstAddress2").val();
    action["set_ip_src_address"] = $("#idSetIpSrcAddress2").val();
    action["set_ip_dst_address"] = $("#idSetIpDstAddress2").val();
    action["set_ip_tos"] = $("#idSetIpTos2").val();
    action["set_l4_src_port"] = $("#idSetL4SrcPort2").val();
    action["set_l4_dst_port"] = $("#idSetL4DstPort2").val();
    action["output_to_queue"] = $("#idOutputToQueue2").val();

    actions.push(action);
    flow_rule["actions"] = actions;

    console.log("flow rule 2 appena creata");
    console.log(flow_rule);

    return flow_rule;
}

function validateNewFlowRule(flow_rule){
    var validate = true;

    if(flow_rule.id=="" || flow_rule.id==undefined || flow_rule.id == null){
        console.log("validazione fallita");
        validate = false;
    }

    if(flow_rule.priority=="" || flow_rule.priority==undefined || flow_rule.priority==null){
        console.log("campo priorita richiesto");
        $("#idPriority").parent().parent().attr("class","form-group has-error has-feedback");
        validate = false;
    }

    if(isNaN(flow_rule.priority)){
        console.log("campo priorita deve essere un numero");
        $("#idPriority").parent().parent().attr("class","form-group has-error has-feedback");
        validate = false;

    }else{
        flow_rule.priority=parseInt(flow_rule.priority);
    }
    return validate;
}




