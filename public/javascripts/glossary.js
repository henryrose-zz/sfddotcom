

$(function(){
	var $add_def_form, 
		$submit_button; 

	$add_def_form = $('.add-definition form'); 


	$submit_button = $add_def_form.find('button'); 


	$submit_button.click(function(e){
		e.preventDefault(); 

		$.post(
			'/adddefinition', 
			{
				term : $add_def_form.find('.term').val(), 
				definition : $add_def_form.find('.definition').val()
			},
			function(){}, 
			'json'
			);

	});



});