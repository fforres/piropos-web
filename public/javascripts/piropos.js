var $ = jQuery;
$(document).ready(function() {

	/* INTERFAZ Y VALIDACION DE CREACION PIROPO*/
	$('.info .header .new a.activate').on("click", function(e) {
		e.preventDefault();
		$(".aNewOne").toggle(230, function() {
			$(this).find("input").focus()
		})
	});


	$(".aNewOne .validable").on("keyup", function() {
		var $cont = $(this).parent()
		if ($(this).val().length >= 3) {
			$cont.find("span").html("");
			$cont.addClass("success")
			$cont.find("span").html("<i class='fa fa-fw fa-check-circle form-control-feedback'></i>")
		} else {
			$cont.find("span").html("");
			$cont.removeClass("success")
			$cont.find("span").html("<i class='fa fa-fw fa-close form-control-feedback'></i>")
		}
		activateSaveButton($cont.parent());
	});


	function activateSaveButton($cont) {
		if ($cont.parent().find(".success").length == 2) {
			$(".info .header .new a.save").show(200)
		} else {
			$(".info .header .new a.save").hide(200)
		}
	}


	/*  CREACION */
	$('.info .header .new a.save').on("click", function(e) {
		var elIcono = $(this).find("i");
		elIcono.removeClass("fa-save").addClass("fa-spinner fa-spin");
		var nombre = $(".header .aNewOne .entername").val();
		var piropo = $(".header .aNewOne .enterpiropo").val();
		if (nombre && piropo && nombre.length > 0 && piropo.length > 0) {
			piropo = piropo.replace(/\n/g, "");
			var ob = {
				usuario: nombre,
				texto: piropo
			}
			var request = $.ajax({
				url: API + '/piropos/',
				type: 'POST',
				data: ob
			});
			//exito
			request.done(function(data) {
				paintOnePiropo(data, true);
				$(".aNewOne").hide(230, function() {
					$(this).find(".validable").val("");
				})
				$.amaran({
					content: {
						bgcolor: '#484860',
						color: '#222',
						message: '<h4>Piropo Creado!</h4> Tu piropopo fue creado con éxito!'
					},
					theme: 'colorful',
					position: 'bottom left',
					closeButton: true,
					sticky: false
				});
			});
			//fallo
			request.error(function(data) {});
			//siempre
			request.always(function(data) {
				elIcono.removeClass("fa-spinner fa-spin").addClass("fa-save");
				elIcono.parent().hide()
			});
		} else {

		}
	});

	/* OBTENCION PIROPOS */
	if (window.location.pathname == "/") {
		getPiropos();
	} else if (window.location.pathname.split("/")[1] == "piropo") {
		var elParametro = window.location.pathname.split("/")[2];
		if (elParametro.lastIndexOf("?fb_action_ids") != -1) {
			elParametro = elParametro.substring(0, elParametro.lastIndexOf("?fb_action_ids"))
		}
		getPiropoById(elParametro)
	} else if (window.location.pathname.split("/")[1] == "usuario") {
		var elParametro = window.location.pathname.split("/")[2];
		if (elParametro.lastIndexOf("?fb_action_ids") != -1) {
			elParametro = elParametro.substring(0, elParametro.lastIndexOf("?fb_action_ids"))
		}
		getPiroposByUser(elParametro)
	}

	function getPiropos(opts) {
		loadingInterface();
		var defaults = {
			filter: {
				limit: 10,
				order: ["votoTotal DESC"]
			}
		};
		var options = {
			filter: $.extend(defaults.filter, opts)
		}
		var request = $.ajax({
			url: API + '/piropos',
			type: 'GET',
			data: options
		});
		//exito
		request.done(function(data) {
			paintPiropos(data);
		});
		//fallo
		request.error(function(data) {
			errorInterface(data);
		});
		//siempre
		request.always(function(data) {});
	}

	function getPiropoById(seoUrl, opts) {
		var defaults = {
			where: {
				id: seoUrl
			}
		};

		var options = {
			filter: $.extend(defaults.filter, opts)
		}
		console.log(options)
		var request = $.ajax({
			url: API + '/piropos/' + seoUrl,
			type: 'GET'
		});
		//exito
		request.done(function(data) {

			if (data.length === 0) {
				errorInterface(data);
			} else {
				var aux = [data]
				paintPiropos(aux);
			}
		});
		//fallo
		request.error(function(data) {
			errorInterface(data);
		});
		//siempre
		request.always(function(data) {});
	}
	function getPiroposByUser(username, opts) {
		var defaults = {
			where: {
				usuario: username
			}
		};
		var request = $.ajax({
			url: API + '/piropos?filter='+JSON.stringify(defaults),
			type: 'GET'
		});
		//exito
		request.done(function(data) {

			if (data.length === 0) {
				errorInterface(data);
			} else {
				paintPiropos(data);
			}
		});
		//fallo
		request.error(function(data) {
			errorInterface(data);
		});
		//siempre
		request.always(function(data) {});
	}



	function paintPiropos(piropos) {
		$('#piropos')
			.addClass('loaded')
			.removeClass('loading')
			.removeClass('error');
		$.each(piropos, function(k, piropo) {
			paintOnePiropo(piropo);
		});
	}

	function paintOnePiropo(piropo, created) {
		var alcomienzo = false;
		if (created) {
			alcomienzo = true;
		}
		var html = '';
		html += '<div class="piropo col-xs-12" id="' + piropo.id + '">';
		html += '<div class="col-xs-12 row-xs-height">'
		html += '<div class="titulo col-xs-9 col-sm-12 col-lg-10 col-xs-height">';
		html += '<div class="texto col-xs-12">';
		html += piropo.texto;
		html += '</div>';
		html += '<div class="col-xs-12 col-sm-6 links">';
		html += '<a href="/piropo/' + piropo.id + '"><i class="fa fa-fw fa-link"></i></a>';
		html += '<a href="#" data-compartir="true" data-redsocial="facebook" data-url="/piropo/' + piropo.id + '"><i class="fa fa-fw fa-facebook"></i></a>';
		html += '<a href="https://twitter.com/intent/tweet?text=' + piropo.texto.substring(0, 484860) + '(...)&hashtags=piropo&via=SrPiropos&url=' + window.location.origin + "/piropo/" + piropo.id + '" data-compartir="true" data-redsocial="twitter"><i class="fa fa-fw fa-twitter"></i></a>';
		html += '</div>';
		html += '<a href="/usuario/'+ encodeURIComponent(piropo.usuario)+'"class="col-xs-12 col-sm-6 firma">';
		html += "<span>~</span>" + piropo.usuario;
		html += '</a>';
		html += '</div>';
		html += '<div class="puntaje loading col-xs-3 col-sm-2 col-lg-2 col-xs-height col-middle">';
		html += '<i class="fa fa-fw fa-spinner fa-spin"></i>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		if (alcomienzo) {
			$('#piropos .info .body').prepend(html);
		} else {
			$('#piropos .info .body').append(html);
		}
		addShareLinksListeners(piropo, $(".piropo#" + piropo.id))
		getVotoPorPiropo(piropo, $(".piropo#" + piropo.id), {})
	}

	function addShareLinksListeners(piropo, $cont) {
		$cont.find("a[data-compartir='true']").on("click", function(e) {
			e.preventDefault()
			var redSocial = $(this).data("redsocial");
			var shareUrl = $(this).data("url");
			if (redSocial == "facebook") {
				FB.ui({
					method: 'share',
					href: window.location.origin + shareUrl
				}, function(response) {});
			}
		})
	}

	function getVotoPorPiropo(piropo, $cont, opts) {

		var html = '';
		html += '<a class="aFavor">';
		html += '<i class="fa fa-fw fa-caret-up"></i>';
		html += '</a>';
		html += '<div class="votos">';
		html += '</div>';
		html += '<a class="enContra">';
		html += '<i class="fa fa-fw fa-caret-down"></i>';
		html += '</a>';
		$cont.find('.puntaje').removeClass('loading');
		if (estaVotado(piropo.id)) {
			if (estaVotado(piropo.id).tipo == "afavor") {
				$cont.find('.puntaje').addClass("votado votadoafavor");
			} else if (estaVotado(piropo.id).tipo == "encontra") {
				$cont.find('.puntaje').addClass("votado votadoencontra");
			}
		} else {
			$cont.find('.puntaje').addClass("novotado");
		}

		$cont.find('.puntaje').html(html)
		updateVotoInterfazLoading($cont)
		updateVotoInterfaz(piropo, $cont, opts)
		$cont.find('.puntaje a').on("click", function() {
			var elClickeado = $(this);
			var elClickeadoContainer = $(this).parent();
			if (elClickeadoContainer.hasClass("novotado")) {
				updateVotoInterfazLoading($cont)
				if (elClickeado.hasClass("aFavor")) {
					addVotoAFavor(piropo, elClickeado)
				} else if (elClickeado.hasClass("enContra")) {
					addVotoEnContra(piropo, elClickeado)
				}
			}
		});
	}

	function addVotoAFavor(piropo, $cont, opts) {
		var defaults = {};
		var options = $.extend(defaults, opts);
		var request = $.ajax({
			url: API + '/piropos/' + piropo.id + '/addVotoAFavor',
			type: 'GET',
			data: options
		});
		//exito
		request.done(function(data) {
			updateVotoInterfaz(data.msg, $cont.parent(), opts);
			agregarVotoCookie(data.msg.id, "afavor", $cont.parent());
		});
		//fallo
		request.error(function(data) {});
		//siempre
		request.always(function(data) {});
	}

	function addVotoEnContra(piropo, $cont, opts) {
		var defaults = {};
		var options = $.extend(defaults, opts);
		var request = $.ajax({
			url: API + '/piropos/' + piropo.id + '/addVotoEnContra',
			type: 'GET',
			data: options
		});
		//exito
		request.done(function(data) {
			updateVotoInterfaz(data.msg, $cont.parent(), opts);
			agregarVotoCookie(data.msg.id, "encontra", $cont.parent());
		});
		//fallo
		request.error(function(data) {});
		//siempre
		request.always(function(data) {});
	}

	function updateVotoInterfazLoading($cont) {
		$cont.find('.votos').html('<i class="fa fa-fw fa-spinner fa-spin"></i>');
	}

	function updateVotoInterfaz(voto, $cont, opts) {
		$cont.find('.votos').attr("data-aFavor", voto.aFavor).attr("data-enContra", voto.enContra).html(voto.votoTotal);
	}

	function agregarVotoCookie(idVoto, tipo, $cont) {
		var laCookie = JSON.parse($.cookie("votos"));
		laCookie[idVoto] = {
			votado: true,
			tipo: tipo
		};
		laCookie = $.cookie("votos", JSON.stringify(laCookie));
		$cont.removeClass("novotado").addClass("votado");
		if (tipo == "afavor") {
			$cont.addClass("votadoafavor");
		} else if (tipo == "encontra") {
			$cont.addClass("votadoencontra");
		}
	}

	function estaVotado(idVoto) {
		if (typeof $.cookie("votos") == "undefined" || $.cookie("votos").trim().length === 0) {
			var ob = {};
			$.cookie("votos", JSON.stringify(ob));
			return false;
		} else if (
			typeof JSON.parse($.cookie("votos")) != "undefined" &&
			typeof JSON.parse($.cookie("votos"))[idVoto] != "undefined" &&
			JSON.parse($.cookie("votos"))[idVoto].votado === true
		) {
			return JSON.parse($.cookie("votos"))[idVoto]
		} else {
			return false;
		}
	}

	function loadingInterface() {
		$('#piropos')
			.addClass('loading')
			.removeClass('loaded')
			.removeClass('error');
	}

	function errorInterface() {
		$('#piropos')
			.addClass('error')
			.removeClass('loaded')
			.removeClass('loading');
	}
});