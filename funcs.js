"use strict";

(function ($) {

	var opciones = {};

	var calendario = $('#calendario').calendario(opciones);

	$("h1").click(function() {
		calendario.mostrar();
	});

}(jQuery));