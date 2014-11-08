var $ = jQuery;
$(document).ready(function() {
	$('.info .header .new a').on("click", function(e) {
		e.preventDefault();

	});
	getPiropos();

	function getPiropos(opts) {
		loadingInterface();
		var defaults = {
			include: 'voto',
			limit: 10
		};
		var options = $.extend(defaults, opts);
		var request = $.ajax({
			url: 'http://localhost:3007/api/piropos',
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

	function paintPiropos(piropos) {
		$('#piropos')
			.addClass('loaded')
			.removeClass('loading')
			.removeClass('error');
		$.each(piropos, function(k, piropo) {
			var html = '';
			html += '<div class="piropo row" id="' + piropo.id + '">';
			html += '<div class="titulo col-xs-9 col-sm-10">';
			html += '<h2>';
			html += piropo.texto;
			html += '</h2>';
			html += '<h4 class="pull-right">';
			html += "<span>-</span>" + piropo.creador;
			html += '</h4>';
			html += '</div>';
			html += '<div class="puntaje loading col-xs-3 col-sm-2">';
			html += '<i class="fa fa-fw fa-spinner fa-spin"></i>';
			html += '</div>';
			html += '</div>';
			$('#piropos .info .body').append(html);
			getVotoPorPiropo(piropo, $(".piropo#" + piropo.id), {})
		});
	}

	function getVotoPorPiropo(piropo, $cont, opts) {
		console.log(piropo)
		var html = '';
		html += '<div class="aFavor">';
		html += '<i class="fa fa-fw fa-caret-up"></i>';
		html += '</div>';
		html += '<div class="votos">';
		html += piropo.votoAFavor;
		html += '</div>';
		html += '<div class="enContra">';
		html += '<i class="fa fa-fw fa-caret-down"></i>';
		html += '</div>';
		$cont.find('.puntaje').removeClass('loading');
		$cont.find('.puntaje').html(html)
		$cont.find('.puntaje .aFavor').on("click", function() {
			addVotoAFavor(piropo, $(this))
		});
		$cont.find('.puntaje .enContra').on("click", function() {
			addVotoEnContra(piropo, $(this))
		});
	}

	function addVotoAFavor(piropo, $cont, opts) {
		var defaults = {};
		var options = $.extend(defaults, opts);
		var request = $.ajax({
			url: 'http://localhost:3007/api/piropos/' + piropo.id + '/votoAFavor',
			type: 'GET',
			data: options
		});
		//exito
		request.done(function(data) {
			updateVotoInterfaz(data, $cont.parent(), opts);
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
			url: 'http://localhost:3007/api/piropos/' + piropo.id + '/votoEnContra',
			type: 'GET',
			data: options
		});
		//exito
		request.done(function(data) {
			updateVotoInterfaz(data, $cont.parent(), opts);
		});
		//fallo
		request.error(function(data) {});
		//siempre
		request.always(function(data) {});
	}

	function updateVotoInterfaz(voto, $cont, opts) {
		$cont.find('.votos').html(voto.msg.favor);
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