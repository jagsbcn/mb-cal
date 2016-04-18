(function ($) {

	var defaults = {
		
	}
	
	var textos = {
		m0: 'Enero',
		m1: 'Febrero',
		m2: 'Marzo',
		m3: 'Abril',
		m4: 'Mayo',
		m5: 'Junio',
		m6: 'Julio',
		m7: 'Agosto',
		m8: 'Septiembre',
		m9: 'Octubre',
		m10: 'Noviembre',
		m11: 'Diciembre',
		
		d0: 'Lunes',
		d1: 'Martes',
		d2: 'Miércoles',
		d3: 'Jueves',
		d4: 'Viernes',
		d5: 'Sábado',
		d6: 'Domingo'
	};

	var plant_dias_etiq = '<div class="cal-dias-etiq">{{#dias}}<div class="dia-etiq">{{nombre}}</div>{{/dias}}</div>';

	function Calendario(agenda, contexto) {
		this.agenda = agenda;
		this.contexto = contexto;
		this.locale = textos;
		
		//Info del dia de hoy
		this.dia_hoy = new Date().getDate();
		this.mes_hoy = new Date().getMonth() + 1;
		this.anyo_hoy = new Date().getFullYear();


		//Info del mes actual
		this.anyo_mes_actual = this.anyo_hoy;
		this.mes_actual = this.mes_hoy;  // en JS cuentan meses de 0 a 11
		this.dias_mes_actual = new Date(this.anyo_mes_actual, this.mes_actual, 0).getDate();
		
		calculaDatosCal(this);  //Esta function calcula el resto de datos del calendario a partir de la info del mes actual
						
		//Generamos la estructura HTML a visualizar
		this.mostrar();

		this.dia_agenda = this.dia_hoy+"/"+this.mes_hoy+"/"+this.anyo_hoy; 
		this.mostrarAgendaDia(this.dia_agenda);

		return this;
	};
	
	Calendario.prototype.navegaMes = function(pos) {
		switch(pos) {
			case "prev":
				this.mes_actual = this.mes_actual - 1;
				if (this.mes_actual == 0) {
					this.mes_actual = 12;
					this.anyo_mes_actual--;
				}

				//Calculamos el dia de la agenda
				if ((this.mes_hoy == this.mes_actual) && (this.anyo_hoy == this.anyo_mes_actual)) {
					this.dia_agenda = this.dia_hoy+"/"+this.mes_hoy+"/"+this.anyo_hoy;
				} else {
					this.dia_agenda = "1/"+this.mes_actual+"/"+this.anyo_mes_actual;
				}

				break;

			case "sig":				
				this.mes_actual = this.mes_actual + 1;
				if (this.mes_actual == 13) {
					this.mes_actual = 1;
					this.anyo_mes_actual++;
				}

				//Calculamos el dia de la agenda
				if ((this.mes_hoy == this.mes_actual) && (this.anyo_hoy == this.anyo_mes_actual)) {
					this.dia_agenda = this.dia_hoy+"/"+this.mes_hoy+"/"+this.anyo_hoy;
				} else {
					this.dia_agenda = "1/"+this.mes_actual+"/"+this.anyo_mes_actual;
				}

				break;

			case "hoy":
				this.anyo_mes_actual = this.anyo_hoy;
				this.mes_actual = this.mes_hoy;  // en JS cuentan meses de 0 a 11
				//Calculamos el dia de la agenda
				this.dia_agenda = this.dia_hoy+"/"+this.mes_hoy+"/"+this.anyo_hoy;
				
				break;

		}
		
		this.dias_mes_actual = new Date(this.anyo_mes_actual, this.mes_actual, 0).getDate();
		
		calculaDatosCal(this);
		this.mostrar();
		this.mostrarAgendaDia(this.dia_agenda);
	};
	
	function calculaDatosCal(_this) {
		//Info del mes anterior
		_this.mes_anterior = _this.mes_actual - 1;
		_this.anyo_mes_anterior = _this.anyo_mes_actual;
		if (_this.mes_anterior == 0) {
			_this.mes_anterior = 12;
			_this.anyo_mes_anterior--;
		}
		_this.dias_mes_anterior = new Date(_this.anyo_mes_anterior, _this.mes_anterior, 0).getDate();
		
		//Info del mes siguiente
		_this.mes_siguiente = _this.mes_actual + 1;
		_this.anyo_mes_siguiente = _this.anyo_mes_actual;
		if (_this.mes_siguiente == 13) {
			_this.mes_siguiente = 1;
			_this.anyo_mes_siguiente++;
		}
		_this.dias_mes_siguiente = new Date(_this.anyo_mes_siguiente, _this.mes_siguiente, 0).getDate();
		
		//Calculo de las semanas que tiene el mes
		_this.dia_semana_inicio_mes = new Date(_this.anyo_mes_actual, _this.mes_actual - 1, 1).getDay() - 1;
		if (_this.dia_semana_inicio_mes < 0) {
			_this.dia_semana_inicio_mes = 6;
		}
		
		_this.dia_semana_fin_mes = new Date(_this.anyo_mes_actual, _this.mes_actual - 1, _this.dias_mes_actual).getDay() - 1;
		if (_this.dia_semana_fin_mes < 0) {
			_this.dia_semana_fin_mes = 6;
		}
				
		_this.semanas_mes_actual = (_this.dias_mes_actual % 7 == 0 ? 0 : 1) + Math.floor(_this.dias_mes_actual / 7);
		if (_this.dia_semana_fin_mes < _this.dia_semana_inicio_mes) {
			_this.semanas_mes_actual ++;
		}
		
	};

	Calendario.prototype.mostrarAgendaDia = function(dia) {
		var agenda_html;
		var arr_dia = dia.split("/");

		agenda_html = '<table>';
		agenda_html += '<tr><th colspan="2" id="age-titulo">'+dia+'</th></tr>';

		for (var hora=0; hora<24; hora++) {
			agenda_html += '<tr><td rowspan="2" class="agenda-hora">'+hora+':00</td><td class="agenda-30-min-1"></td></tr>';
			agenda_html += '<tr><td class="agenda-30-min-2"></td></tr>';
		}

		agenda_html += '</table';

		this.agenda.height(this.contexto.height());
		this.agenda.html(agenda_html);
		this.contexto.find(".age-dia-actual").removeClass("age-dia-actual");
		this.contexto.find("#" + arr_dia[0] + "_" + arr_dia[1]).addClass("age-dia-actual");
	};

	Calendario.prototype.getTituloMes = function() {
		var mes_anyo = this.locale["m" + (this.mes_actual - 1)] + ' ' + this.anyo_mes_actual;

		return mes_anyo;
	};
	
	Calendario.prototype.mostrar = function() {
		var cal_html;
		var contador_dia =1, contador_dia_mes_sig = 1, contando_dias = false;

		this.contexto.html('');
		
		cal_html = '<div class="cal-mes">';
		
		// Mostramos los dias de la semana
		var data_dias_etiq = {dias:[]};
		for (i=0; i<7; i++) {
			data_dias_etiq.dias.push({"nombre":this.locale['d'+i]});
		}

		cal_html += Mustache.render(plant_dias_etiq, data_dias_etiq);

		//Mostramos los dias del mes
		for (i=1; i <= this.semanas_mes_actual; i++) {
			cal_html += '<div class="cal-semana">';
			
			for (j=0; j<7; j++) {
			
				if (!contando_dias) {
					if (j == this.dia_semana_inicio_mes) {
						contando_dias = true;

						if ((this.anyo_mes_actual == this.anyo_hoy) && (this.mes_actual == this.mes_hoy) && (contador_dia == this.dia_hoy)) {
							cal_html += '<div class="cal-dia dia-hoy" data-fecha="' + this.dia_hoy + '/' + this.mes_hoy + '/' + this.anyo_hoy + '">';
						} else {
							cal_html += '<div class="cal-dia" data-fecha="' + contador_dia + '/' + this.mes_actual + '/' + this.anyo_mes_actual + '">';
						}

						cal_html += '<span class="event dia_num" id="' + contador_dia + '_' + this.mes_actual + '">' + contador_dia + '</span>';
						cal_html += '</div>';
						contador_dia++;
					} else {
						cal_html += '<div class="cal-dia" data-fecha="' + (this.dias_mes_anterior - this.dia_semana_inicio_mes + j + 1) + '/' + this.mes_anterior + '/' + this.anyo_mes_anterior + '">';
						cal_html += '<span class="event dia_num_otro" id="' + (this.dias_mes_anterior - this.dia_semana_inicio_mes + j + 1) + '_' + this.mes_anterior + '">' + (this.dias_mes_anterior - this.dia_semana_inicio_mes + j + 1) + '</span>';
						cal_html += '</div>';
					}
				} else {
					if (!(contador_dia > this.dias_mes_actual)) {
						
						if ((this.anyo_mes_actual == this.anyo_hoy) && (this.mes_actual == this.mes_hoy) && (contador_dia == this.dia_hoy)) {
							cal_html += '<div class="cal-dia dia-hoy" data-fecha="' + this.dia_hoy + '/' + this.mes_hoy + '/' + this.anyo_hoy + '">';
						} else {
							cal_html += '<div class="cal-dia" data-fecha="' + contador_dia + '/' + this.mes_actual + '/' + this.anyo_mes_actual + '">';
						}

						cal_html +=' <span class="event dia_num" id="' + contador_dia + '_' + this.mes_actual + '">' + contador_dia + '</span>';
						cal_html += '</div>';
						contador_dia++;
					} else {
						cal_html += '<div class="cal-dia" data-fecha="' + contador_dia_mes_sig + '/' + this.mes_siguiente + '/' + this.anyo_mes_siguiente + '">';
						cal_html += '<span class="event dia_num_otro" id="' + contador_dia_mes_sig + '_' + this.mes_siguiente + '">' + contador_dia_mes_sig + '</span>';
						cal_html += '</div>';
						contador_dia_mes_sig++;
					}
				}
				
			}
						
			cal_html += '</div>';  // div.cal-semana
		}

		cal_html += '</div>';  // div.cal-mes
		
		//Mostramos el html generado
		this.contexto.html(cal_html);
	};
	
	$.fn.calendario = function(params) {
		return new Calendario(params, this);
	};

}(jQuery));