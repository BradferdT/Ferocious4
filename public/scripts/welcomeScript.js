$(".userOptions").dropdown();
$('.scrollspy').scrollSpy();

var options = [
     {selector: '#demo', offset: 200, callback: function(el) {
       Materialize.showStaggeredList($('.demo_list'));
     } }
   ];
  Materialize.scrollFire(options);
