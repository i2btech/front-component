'use strict';
import $ from 'jquery';

const validate = () => {
	/**
	 * Validate validations customs
	 */
	$.validator.addMethod("alphanumeric", function(value, element) {
		return this.optional(element) || /^\w+$/i.test(value);
	}, "Digite solo Letras o Números.");

	$.validator.addMethod("integer", function(value, element) {
		return this.optional(element) || /^-?\d+$/.test(value);
	}, "Digite solo número.");

	$.validator.addMethod("currency", function(value, element, param) {
			var isParamString = typeof param === "string",
					symbol = isParamString ? param : param[ 0 ],
					soft = isParamString ? true : param[ 1 ],
					regex;

			symbol = symbol.replace( /,/g, "" );
			symbol = soft ? symbol + "]" : symbol + "]?";
			regex = "^[" + symbol + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$";
			regex = new RegExp( regex );
			return this.optional( element ) || regex.test( value );
	}, "Digite precio válido.");

	$.validator.addMethod("email", function(value, element) {
		return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value);
	}, "Digite email válido.");

	$.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-zA-ZÁáÂâÀàÄäÃãÉéÊêÈèËëÍíÎîÌìÏïÓóÔôÒòÖöÕõÚúÛûÙùÜüÑñÇçÿ]+$/i.test(value);
	}, "Digite solo letras.");

	$.validator.addMethod("letterspace", function(value, element) {
		return this.optional(element) || /^[a-zA-ZÁáÂâÀàÄäÃãÉéÊêÈèËëÍíÎîÌìÏïÓóÔôÒòÖöÕõÚúÛûÙùÜüÑñÇçÿ ]+$/i.test(value);
	}, "Digite solo letras y espacio.");

	$.validator.addMethod("cname", function(value, element) {
		return this.optional(element) || /^([A-ZÁÂÀÄÃÉÊÈËÍÎÌÏÓÔÒÖÕÚÛÙÜÑÇ]{1}[a-záâàäãéêèëíîìïóôòöõúûùüñçÿ]+[\s]?)+$/i.test(value);
	}, "Digite solo letras y un espacio.");

	$.validator.addMethod("nick", function(value, element) {
		return this.optional(element) || /^[a-zA-Z0-9_]+$/i.test(value);
	}, "Digite solo letras.");

	$.validator.addMethod("creditcard", function(value, element) {
		if (this.optional(element)) {
			return "dependency-mismatch";
		}

		// Accept only spaces, digits and dashes
		if ( /[^0-9 \-]+/.test( value ) ) {
			return false;
		}

		var nCheck = 0,
			nDigit = 0,
			bEven = false,
			n, cDigit;

		value = value.replace( /\D/g, "" );

		// Basing min and max length on
		// https://developer.ean.com/general_info/Valid_Credit_Card_Types
		if ( value.length < 13 || value.length > 19 ) {
			return false;
		}

		for ( n = value.length - 1; n >= 0; n-- ) {
			cDigit = value.charAt( n );
			nDigit = parseInt( cDigit, 10 );
			if ( bEven ) {
				if ( ( nDigit *= 2 ) > 9 ) {
					nDigit -= 9;
				}
			}

			nCheck += nDigit;
			bEven = !bEven;
		}

		return ( nCheck % 10 ) === 0;
	}, "Digite número de tarjeta de credito válido." );

	$.validator.addMethod( "extension", function( value, element, param ) {
		param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
		return this.optional( element ) || value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
	}, $.validator.format( "Digite una extensión válida." ) );

	$.validator.addMethod( "notEqualTo", function( value, element, param ) {
		return this.optional( element ) || !$.validator.methods.equalTo.call( this, value, element, param );
	}, "Digite valores diferentes." );

	$.validator.addMethod( "nowhitespace", function( value, element ) {
		return this.optional( element ) || /^\S+$/i.test( value );
	}, "No digite espacio en blanco." );

	$.validator.addMethod( "time", function( value, element ) {
		return this.optional( element ) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test( value );
	}, "Digite hora válida." );

	$.validator.addMethod( "time12h", function( value, element ) {
		return this.optional( element ) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test( value );
	}, "Digite hora válida am/pm formato." );

	/* Copyright (c) 2009 José Joaquín Núñez (josejnv@gmail.com) http://joaquinnunez.cl/blog/
	* Licensed under GPL (http://www.opensource.org/licenses/gpl-2.0.php)
	* Use only for non-commercial usage.
	*
	* Version : 0.5
	*
	* Requires: jQuery 1.2+
	*/

	(function() {
		$.fn.Rut = function(options) {
			var defaults = {
				digito_verificador: null,
				on_error: function(){},
				on_success: function(){},
				validation: true,
				format: true,
				format_on: 'change'
			};

			var opts = $.extend(defaults, options);

			return this.each(function() {

				if(defaults.format) {
					$(this).bind(defaults.format_on, function() {
						$(this).val($.Rut.formatear($(this).val(),defaults.digito_verificador==null));
					});
				}
				if(defaults.validation) {
					if(defaults.digito_verificador == null) {
						$(this).bind('blur', function() {
							var rut = $(this).val();

							if($(this).val() != "" && !$.Rut.validar(rut)) {
									defaults.on_error();

							} else if($(this).val() != "") {
									defaults.on_success();
							}
						});
					} else {
						var id = $(this).attr("id");

						$(defaults.digito_verificador).bind('blur', function() {
							var rut = $("#"+id).val()+"-"+$(this).val();
							if($(this).val() != "" && !$.Rut.validar(rut)) {
									defaults.on_error();

							} else if($(this).val() != "") {
									defaults.on_success();
							}
						});
					}
				}
			});
		}
	})();

	/**
	 * Funciones
	 */
	$.Rut = {
		formatear: function(Rut, digitoVerificador) {
			var sRut = new String(Rut);
			var sRutFormateado = '';
			sRut = $.Rut.quitarFormato(sRut);

			if(digitoVerificador) {
				var sDV = sRut.charAt(sRut.length-1);
				sRut = sRut.substring(0, sRut.length-1);
			}

			while(sRut.length > 3) {
				sRutFormateado = "." + sRut.substr(sRut.length - 3) + sRutFormateado;
				sRut = sRut.substring(0, sRut.length - 3);
			}
			sRutFormateado = sRut + sRutFormateado;

			if(sRutFormateado != "" && digitoVerificador) {
				sRutFormateado += "-"+sDV;

			} else if(digitoVerificador) {
				sRutFormateado += sDV;
			}

			return sRutFormateado;
		},
		quitarFormato: function(rut) {
			var strRut = new String(rut);

			while(strRut.indexOf(".") != -1) {
				strRut = strRut.replace(".","");
			}

			while(strRut.indexOf("-") != -1) {
				strRut = strRut.replace("-","");
			}

			return strRut;
		},
		digitoValido: function(dv) {
			if(dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K') {
				return false;
			}
			return true;
		},
		digitoCorrecto: function(crut) {
			let largo = crut.length;
			let rut;

			if(largo < 2) {
				return false;
			}

			if(largo > 2) {
				rut = crut.substring(0, largo - 1);

			} else {
				rut = crut.charAt(0);
			}

			let dv = crut.charAt(largo-1);
			$.Rut.digitoValido(dv);

			if(rut == null || dv == null) {
				return 0;
			}

			let dvr = $.Rut.getDigito(rut);

			if(dvr != dv.toLowerCase()) {
				return false;
			}
			return true;
		},
		getDigito: function(rut) {
			//let dvr = '0';
			let suma = 0;
			let mul  = 2;

			for(let i = rut.length -1; i >= 0; i--) {
				suma = suma + rut.charAt(i) * mul;

				if(mul == 7) {
					mul = 2;
				} else {
					mul++;
				}
			}
			let res = suma % 11;
			if(res==1) {
				return 'k';

			} else if(res==0) {
				return '0';
			} else {
				return 11-res;
			}
		},
		validar: function(texto) {
			texto = $.Rut.quitarFormato(texto);
			let largo = texto.length;

			// rut muy corto
			if(largo < 2) {
				return false;
			}

			// verifica que los numeros correspondan a los de rut
			for(let i = 0; i < largo ; i++ ) {
				// numero o letra que no corresponda a los del rut
				if(!$.Rut.digitoValido(texto.charAt(i))) {
					return false;
				}
			}

			var invertido = "";
			for(let i = (largo-1), j = 0; i >= 0; i--,j++) {
				invertido = invertido + texto.charAt(i);
			}
			var dtexto = "";
			dtexto = dtexto + invertido.charAt(0);
			dtexto = dtexto + '-';
			let cnt = 0;

			for(let i = 1, j = 2; i < largo; i++,j++) {
				if(cnt == 3) {
					dtexto = dtexto + '.';
					j++;
					dtexto = dtexto + invertido.charAt(i);
					cnt = 1;
				} else {
					dtexto = dtexto + invertido.charAt(i);
					cnt++;
				}
			}

			invertido = "";
			for(let i = (dtexto.length-1), j = 0; i >= 0; i--,j++) {
				invertido = invertido + dtexto.charAt(i);
			}

			if($.Rut.digitoCorrecto(texto)) {
				return true;
			}
			return false;
		}
	};

	$.validator.addMethod("rut", function(value, element) {
		return this.optional(element) || $.Rut.validar(value);
	}, "Ingrese un RUT válido");

	$.validator.addMethod("rutmail", function(value, element) {
		return this.optional(element) || $.Rut.validar(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
	}, "Ingrese un RUT o un mail válido");
};

export default validate;
