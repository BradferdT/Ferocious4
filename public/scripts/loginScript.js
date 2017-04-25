$('#register').click(function(){
    $('#email').prop('required', true);
    $('.email_display').show('slow');
});

$('#login').click(function(){
  $('#email').prop('required', false);
  $('.email_display').hide('slow');
})

$('#form_login').submit(function(e){
  if($(document.activeElement).val() == 'Register'){
    console.log('Register');
  }else if($(document.activeElement).val() == 'Login'){
    console.log('login');
  }else{
    e.preventDefault();
  }
})

$('#email').on('invalid', function(e){
  e.preventDefault();
})
