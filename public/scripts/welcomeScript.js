$(".userOptions").dropdown();
$('.scrollspy').scrollSpy();

var options = [
     {selector: '#demo', offset: 400, callback: function(el) {
       Materialize.showStaggeredList($('.demo_list'));
     } }
   ];
  Materialize.scrollFire(options);
