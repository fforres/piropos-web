var $ = jQuery;
$(document).ready(function() {
	var API = "http://ufkkf5b6fa87.fforres.koding.io:3007/api"
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
			url: API+'/piropos',
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
			html += '<div class="piropo row row-xs-height" id="' + piropo.id + '">';
			html += '<div class="titulo col-xs-9 col-sm-10 col-xs-height">';
			html += '<div class="texto">';
			html += piropo.texto;
			html += '</div>';
			html += '<div class="pull-right firma">';
			html += "<span>~</span>" + piropo.usuario;
			html += '</div>';
			html += '</div>';
			html += '<div class="puntaje loading col-xs-3 col-sm-2 col-xs-height col-middle">';
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
			url: API+'/piropos/' + piropo.id + '/addVotoAFavor',
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
			url: API+'/piropos/' + piropo.id + '/addVotoEnContra',
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
		$cont.find('.votos').html(voto.msg.votoAFavor);
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