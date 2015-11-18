/**
 * This file contains generic utility functions.
 *
 **/

function getVNFById(id){
    var vnf;
    NF_list.forEach(function(e){
        if(e.id == id){ vnf=e;}
    });
    return vnf;
}

function getEndPointById(id){
    var endpoint;
    EP_list.forEach(function(e){
        if (e.id == id) {endpoint=e;}

    });
    return endpoint;
}

function getFlowRulesById(id){
    var flowrule;
    flow_rules.forEach(function(e){
        if(e.id == id){ flowrule=e; }
    });
    return flowrule;
}

function getInterfaceById(id){
    var interface;
    var data=id.split(":");
    NF_list.forEach(function(nf){
        if(nf.id == data[1]){ nf["ports"].forEach(function(i){ if(i.id==data[2]+":"+data[3]) interface=i;}); }
    });
    return interface;
}

function elaborateFlowRules(){

    //funzione che
    // 1. arricchische il campo match e il campo action con la posizione delle corrispettive interfacce
    // 2. elimina l'info rindondante andata-ritorno, e setta un campo aggiuntivo che dice se � fullduplex o no

    flow_rules.forEach(function(fr,i){
        //1 setto la posizione delle interfacce

        var pos=getLinkEndPositionById(fr["match"]["port_in"]);
        fr["match"]["interface_position_x"]=pos.x;
        fr["match"]["interface_position_y"]=pos.y;

        //console.log("match");
        /*
        --->>>DA FARE<<<--- da nodificare con un forEach
         */
        pos=getLinkEndPositionById(fr["action"][0]["output"]);
        fr["action"][0]["interface_position_x"]=pos.x;
        fr["action"][0]["interface_position_y"]=pos.y;

        //console.log(pos.x,pos.y);

        //2. cerco all'interno di flow_rules se c'� il suo duale, se no setto fullduplex a false;
        //--->>>DA FARE<<<--- SE � FULL DUPLEX OCCORRE NON AGGIUNGERE UNA SECONDA VOLTA UNA LINEA!
        fr["full_duplex"] = false;
        for(var j=0;j<flow_rules.length;j++) {
            if (fr["match"]["port_in"] === flow_rules[j]["action"]["output"] && fr["action"]["output"] == flow_rules[j]["match"]["port_in"]) {
                fr["full_duplex"] = true;
                break;
            }
        }
    });
}

function setInitialNFPositions(){
    var n=NF_list.length;
    var alfa=2*Math.PI/n;
    for(var i=0;i<n;i++){
        NF_list[i].x=parseInt(300*Math.cos(alfa*(i))+svg_width/2-NF_width/2-NF_offset_x/2);
        NF_list[i].y=parseInt(300*Math.sin(alfa*(i))+svg_height/2-NF_height/2-NF_offset_y/2);
        NF_list[i].ports.forEach(function(e){
            e.x=parseInt(Math.random()*NF_width);
            e.y=0;
        })
    }
}

function setInitialEPPositions(){
    var n=EP_list.length;
    var alfa=2*Math.PI/2;
    for(var i=0;i<n;i++){
        EP_list[i].x=parseInt(200*Math.cos(alfa*(i)+Math.PI/2)+svg_width/2);
        EP_list[i].y=parseInt(200*Math.sin(alfa*(i)+Math.PI/2)+svg_height/2);

    }
}

/*
 --->>>DA FARE<<<--- COMPLETAMENTE DA RIFARE LE POSIZIONI LE TROVA DALL'OGGETTO JS NON DALL'HTML!
 */
function getLinkEndPositionById(id){
    //dato un id, devo ricavarmi la posizione di tale interfaccia
    //console.log(id);
    var data=id.split(":");
    var x,y;

    if(data[0]==="vnf"){
        //var id_mod=id.replace(/:/g,"\\:");
        //console.log("id_mod: "+id_mod);
        //console.log("qui");
        var NF_interface=getInterfaceById(id);
        var NF=getVNFById(data[1]);
        x=parseInt(NF_interface.x+parseInt(NF.x));
        y=parseInt(NF_interface.y+parseInt(NF.y));

        return {x:x,y:y};
    }else{
        if(data[0]==="endpoint"){

            var endpoint=getEndPointById(data[1]);

            x=parseInt(endpoint.x);
            y=parseInt(endpoint.y);
            //var id_mod=id.replace(/:/g,"\\:");
            //var EP_interface=svg.select("#"+id_mod);
            //var x=parseInt(EP_interface.attr("cx"));
            //var y=parseInt(EP_interface.attr("cy"));
            //console.log(x,y);

            return {x:x,y:y};
        }
    }
}
