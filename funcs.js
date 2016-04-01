"use strict";

(function ($) {

	var opciones = {};

	var calendario = $('#calendario').calendario(opciones);
	
	$("#txt-sig").text(calendario.getTituloMes("sig"));	
	$("#txt-act").text(calendario.getTituloMes("act"));
    $("#txt-prev").text(calendario.getTituloMes("prev"));	
	
	$(".cal-dia").click(function() {
		alert($(this).data("dia") + '/' + $(this).data("mes") + '/' + $(this).data("anyo"));
	});
	
	$("#btn-sig").click(function() {
		calendario.navegaMes("sig");
		
		$("#txt-sig").text(calendario.getTituloMes("sig"));	
		$("#txt-act").text(calendario.getTituloMes("act"));
		$("#txt-prev").text(calendario.getTituloMes("prev"));	
	});
	
	$("#btn-prev").click(function() {
		calendario.navegaMes("prev");
		
		$("#txt-sig").text(calendario.getTituloMes("sig"));	
		$("#txt-act").text(calendario.getTituloMes("act"));
		$("#txt-prev").text(calendario.getTituloMes("prev"));	
	});

}(jQuery));