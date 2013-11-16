

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
				short_definition : $add_def_form.find('.short-definition').val(),
				long_definition : $add_def_form.find('.long-definition').val()

			},
			function(){
				location.reload(); 
			}, 
			'json'
			);

	});



});