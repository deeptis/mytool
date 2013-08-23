/* Add functionalities */

$(document).ready(function(){
    $("#verticals").change(function(){
        var vert = $(this).find(':selected').val();
        if (vert){
            var sub_vert = $(this).closest('#dropdown').find("#"+vert);
            sub_vert.siblings('.sub_content').addBack().hide();
            sub_vert.show();
        }else{
            $(this).closest('#dropdown').find('.sub_content').hide();
        }
    });
});
$(document).ready(function(){
        counter =1;
    $("#add").click(function(e){
    	counter++;
        e.preventDefault();
        var $newdiv = $('#dropdown').clone(true);
        $(document.createElement('div')).after("id", 'dropdown');
        var $dropdown = $newdiv.find('[id^=verticals]');
        var dropID = $('[id^=verticals]:last').attr('id');
        var idNumber = dropID.replace('verticals', '');
        $('div.vertical_section').append($newdiv);
        $dropdown.attr('id', idNumber != '' ? 'verticals' + (parseInt(idNumber)+ 1) : 'verticals1');
        $(".remove_button").show();
       
    });
    $(".remove_button").click(function(e){
    	counter--;
    	if(counter > 0){
        	$( e.target ).closest("#dropdown").remove();   
        }
        else{
            alert("Please select a vertical!");
        }
    	
    });
});	
