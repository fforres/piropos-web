var $ = jQuery;
$(document).ready(function() {
	var API = "http://ufkkf5b6fa87.fforres.koding.io:3007/api"
	
	/* INTERFAZ Y VALIDACION DE CREACION PIROPO*/
	$('.info .header .new a.activate').on("click", function(e) {
		e.preventDefault();
		$(".aNewOne").toggle(230,function(){
			$(this).find("input").focus()
		})
	});

	
	$(".aNewOne .validable").on("keyup",function(){
		var $cont = $(this).parent()
		if($(this).val().length >= 3){
			$cont.find("span").html("");
			$cont.addClass("success")
			$cont.find("span").html("<i class='fa fa-fw fa-check-circle form-control-feedback'></i>")
		}else{
			$cont.find("span").html("");
			$cont.removeClass("success")
			$cont.find("span").html("<i class='fa fa-fw fa-close form-control-feedback'></i>")
		}
		activateSaveButton($cont.parent());
	});
	
	
	function activateSaveButton($cont){
		if($cont.parent().find(".success").length ==2){
			$(".info .header .new a.save").show(200)
		}else{
			$(".info .header .new a.save").hide(200)
		}
	}
	
	
	
	/*  CREACION */
	$('.info .header .new a.save').on("click", function(e) {
		var nombre = $(".header .aNewOne .entername").val();
		var piropo = $(".header .aNewOne .enterpiropo").val();
		if(nombre && piropo && nombre.length >0 && piropo.length >0)
		{
			piropo = piropo.replace(/\n/g, "<br />");
			var ob = {
				usuario: 	nombre,
				texto:		piropo 
			}
			var request = $.ajax({
				url: API+'/piropos/',
				type: 'POST',
				data: ob
			});
			//exito
			request.done(function(data) {
				console.log(data)
			});
			//fallo
			request.error(function(data) {});
			//siempre
			request.always(function(data) {});
		}else{
			
		}
	});
	
	/* OBTENCION PIROPOS */
	
	getPiropos();
	function getPiropos(opts) {
		loadingInterface();
		var defaults = {
			filter:{
				limit: 10,
				order: ["votoTotal DESC"]
			}
		};
		var options = { filter: $.extend(defaults.filter, opts) }
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
			html += '<blockquote class="piropo row" id="' + piropo.id + '">';
				html += '<div class="col-xs-12 row-xs-height">'
					html += '<div class="titulo col-xs-9 col-sm-10 col-lg-10 col-xs-height">';
						html += '<div class="texto">';
							html += piropo.texto;
						html += '</div>';
						html += '<div class="pull-right firma">';
							html += "<span>~</span>" + piropo.usuario;
						html += '</div>';
					html += '</div>';
					html += '<div class="puntaje loading col-xs-3 col-sm-2 col-lg-2 col-xs-height col-middle">';
						html += '<i class="fa fa-fw fa-spinner fa-spin"></i>';
					html += '</div>';
				html += '</div>';
			html += '</blockquote>';
			$('#piropos .info .body').append(html);
			getVotoPorPiropo(piropo, $(".piropo#" + piropo.id), {})
		});
	}

	function getVotoPorPiropo(piropo, $cont, opts) {
		var html = '';
		html += '<div class="aFavor">';
		html += '<i class="fa fa-fw fa-caret-up"></i>';
		html += '</div>'; 
		html += '<div class="votos">';
		html += '</div>';
		html += '<div class="enContra">';
		html += '<i class="fa fa-fw fa-caret-down"></i>';
		html += '</div>';
		$cont.find('.puntaje').removeClass('loading');
		$cont.find('.puntaje').html(html)
		updateVotoInterfaz(piropo,$cont,opts)
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
			updateVotoInterfaz(data.msg, $cont.parent(), opts);
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
			updateVotoInterfaz(data.msg, $cont.parent(), opts);
		});
		//fallo
		request.error(function(data) {});
		//siempre
		request.always(function(data) {});
	}

	function updateVotoInterfaz(voto, $cont, opts) {
		$cont.find('.votos').html(voto.votoTotal);
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