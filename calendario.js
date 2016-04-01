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

	function Calendario(params, contexto) {
		this.contexto = contexto;
		this.locale = textos;
		
		//Info del mes actual
		this.anyo_mes_actual = new Date().getFullYear();
		this.mes_actual = new Date().getMonth() + 1;  // en JS cuentan meses de 0 a 11
		this.dias_mes_actual = new Date(this.anyo_mes_actual, this.mes_actual, 0).getDate();
		
		calculaDatosCal(this);  //Esta function calcula el resto de datos del calendario a partir de la info del mes actual
						
		//Generamos la estructura HTML a visualizar
		this.mostrar();

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
				break;			
			case "sig":				
				this.mes_actual = this.mes_actual + 1;
				if (this.mes_actual == 13) {
					this.mes_actual = 1;
					this.anyo_mes_actual++;
				}
				break;
		}
		
		this.dias_mes_actual = new Date(this.anyo_mes_actual, this.mes_actual, 0).getDate();
		
		calculaDatosCal(this);
		this.mostrar();
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

	Calendario.prototype.getTituloMes = function(pos) {
		var mes_anyo;
		
		switch(pos) {
			case "prev":
				mes_anyo = this.locale["m" + (this.mes_anterior - 1)] + ' ' + this.anyo_mes_anterior;
				break;
			case "act":
				mes_anyo = this.locale["m" + (this.mes_actual - 1)] + ' ' + this.anyo_mes_actual;
				break;
			case "sig":
				mes_anyo = this.locale["m" + (this.mes_siguiente - 1)] + ' ' + this.anyo_mes_siguiente;
				break;
		}
		
		return mes_anyo;
	};
	
	Calendario.prototype.mostrar = function() {
		var cal_html;
		var contador_dia =1, contador_dia_mes_sig = 1, contando_dias = false;
		
		this.contexto.html('');
		
		cal_html = '<div class="cal-mes">';
		
		// Mostramos los dias de la semana
		cal_html += '<div class="cal-dias-etiq">';
		for (i=0; i<7; i++) {
			cal_html += '<div class="dia-etiq">' + this.locale['d'+i] +'</div>';
		}
		cal_html += '</div>';  //div.cal-dias_etiq
		
		//Mostramos los dias del mes
		for (i=1; i <= this.semanas_mes_actual; i++) {
			cal_html += '<div class="cal-semana">';
			
			for (j=0; j<7; j++) {
			
				if (!contando_dias) {
					if (j == this.dia_semana_inicio_mes) {
						contando_dias = true;
						cal_html += '<div class="cal-dia" data-anyo="' + this.anyo_mes_actual + '" data-mes="' + this.mes_actual + '" data-dia="' + contador_dia + '">';
						cal_html += '<span class="event dia_num">' + contador_dia + '</span>';
						cal_html += '</div>';
						contador_dia++;
					} else {
						cal_html += '<div class="cal-dia" data-anyo="' + this.anyo_mes_anterior + '" data-mes="' + this.mes_anterior + '" data-dia="' + (this.dias_mes_anterior - this.dia_semana_inicio_mes + j + 1) + '">';
						cal_html += '<span class="event dia_num_otro">' + (this.dias_mes_anterior - this.dia_semana_inicio_mes + j + 1) + '</span>';
						cal_html += '</div>';
					}
				} else {
					if (!(contador_dia > this.dias_mes_actual)) {
						cal_html += '<div class="cal-dia" data-anyo="' + this.anyo_mes_actual + '" data-mes="' + this.mes_actual + '" data-dia="' + contador_dia + '">';
						cal_html +=' <span class="event dia_num">' + contador_dia + '</span>';
						cal_html += '</div>';
						contador_dia++;
					} else {
						cal_html += '<div class="cal-dia" data-anyo="' + this.anyo_mes_siguiente + '" data-mes="' + this.mes_siguiente + '" data-dia="' + contador_dia_mes_sig + '">';
						cal_html += '<span class="event dia_num_otro">' + contador_dia_mes_sig + '</span>';
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