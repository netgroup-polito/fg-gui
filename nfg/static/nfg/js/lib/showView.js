/**
 * Created by pc asus on 25/11/2015.
 */
function showNFFG(bs_view){

    //if(bs_view===false && isSplitted===true){
    //    console.log("errore!");
    //    $('#ModalWarning').modal('show');
    //}
    //if(bs_view===false&& isSplitted===false){
    //    NF_view=true;
    //    $(".use_BIG,.BS_interface,.BS_line").hide();
    //    $(".line").show();
    //    $(".info").empty();
    //}else{
    //    NF_view=false;
    //    $(".use_BIG,.BS_interface,.BS_line").show();
    //    $(".line").hide();
    //}
}

function updateView(){
    if(isSplitted){
        showNFFG(true);
    }else{
        showNFFG(false);
    }
}

function switchView(){
    showNFFG(!NF_view);
}