"use strict";

function Calendario(params, contexto) {
	this.contexto = contexto;
	this.contexto.html("<h1>Jagsitooooo</h1>");

	return this;
};

Calendario.prototype.mostrar = function() {
	this.contexto.html('');
};


(function ($) {

	$.fn.calendario = function(params) {
		return new Calendario(params, this);
	}

}(jQuery));