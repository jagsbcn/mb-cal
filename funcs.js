(function ($) {

	var opciones = {};

	var calendario = $('#calendario').calendario($("#agenda-dia"));

	$(".page-header h3").text(calendario.getTituloMes());
	
	$(".cal-dia").click(function() {
		calendario.mostrarAgendaDia($(this).data("fecha"));
	});

	$('.btn-group button[data-calendar-nav]').click(function() {
		calendario.navegaMes($(this).data("calendar-nav"));
		$(".page-header h3").text(calendario.getTituloMes());
	});

}(jQuery));