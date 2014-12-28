angular.module("main", ["ngCookies","ngRoute","ngAnimate"])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/',{
                templateUrl:"/views/piropos",
                controller:"piroposController"
            })
            .when('/newest',{
                templateUrl:"/views/piropos",
                controller:"loMasNuevoController"
            })
            .when('/bestOfLastDay',{
                templateUrl:"/views/piropos",
                controller:"ultimoDiaController"
            })
            .when('/bestOfTheWeek',{
                templateUrl:"/views/piropos",
                controller:"ultimaSemanaController"
            })
            .when('/bestOfTheMonth',{
                templateUrl:"/views/piropos",
                controller:"ultimoMesController"
            })
            .when('/usuario/:usuario',{
                templateUrl:"/views/piropos",
                controller:"UsuarioPiroposController"
            })
            .when('/busqueda/:searchText',{
                templateUrl:"/views/piropos",
                controller:"searchController"
            })
            .when('/piropo/:piropoId',{
                templateUrl:"/views/piropo",
                controller:"piropoController"
            })
            .otherwise({ redirectTo: '/' })
    })
    .controller("searchController", ['$scope', '$cookies', '$http','$routeParams', function($scope, $cookies, $http, $routeParams) {
        var searchURL = API + '/piropos/searchIgnoreCase?searchParameter='+$routeParams.searchText
        var piroposPromise = $http.get(searchURL)
		piroposPromise.success(function(data, status, headers, config) {
		    $scope.$parent.isExpanded = "";
		    $scope.iconoBotonBusqueda = "fa-search"
			$scope.piropos = data.piropos
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
	}])
	.controller("sideBarController", ['$scope','$routeParams','$location','$rootScope', function($scope,$routeParams,$location,$rootScope) {
        $scope.isExpanded = "";
        $scope.iconoBotonBusqueda = "fa-search"
        $scope.realizarBusqueda = function(event) {
            $scope.iconoBotonBusqueda = "fa-spinner"
            $scope.girar = "fa-spin"
            $location.path("/busqueda/"+$scope.searchTerm)
        }
        $scope.abrirSidebar = function(event){
            $scope.isExpanded = "nav-expanded";
        }
        $scope.cerrarSidebar = function(event){
            $scope.isExpanded = "";
        }
	}])
	.controller("loMasNuevoController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		var now =  new Date().valueOf()
        var lastweek =  new Date().valueOf() - (60*60*24*1000)
        var ob = {
        	"order":"creado DESC",
        	"limit":"10"
        }
        var url = API + '/piropos?filter='+JSON.stringify(ob)
		var piroposPromise = $http.get(url)
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
		
	}])
	.controller("ultimoDiaController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		var now =  new Date().valueOf()
        var lastweek =  new Date().valueOf() - (60*60*24*1000)
        var ob = {
        	"order":"votoAFavor DESC",
        	"limit":"20",
        	"where":{
        	    "and":[{
        	    "creado": {
        	        "gte":lastweek
        	    }},{
        	    "creado": {
        	        "lte":now
        	    }}
        	    ]
        	}	
        }
        var url = API + '/piropos?filter='+JSON.stringify(ob)
		var piroposPromise = $http.get(url)
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
		
	}])
	.controller("ultimoDiaController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		var now =  new Date().valueOf()
        var lastweek =  new Date().valueOf() - (60*60*24*1000)
        var ob = {
        	"order":"votoAFavor DESC",
        	"limit":"20",
        	"where":{
        	    "and":[{
        	    "creado": {
        	        "gte":lastweek
        	    }},{
        	    "creado": {
        	        "lte":now
        	    }}
        	    ]
        	}	
        }
        var url = API + '/piropos?filter='+JSON.stringify(ob)
		var piroposPromise = $http.get(url)
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
		
	}])
	.controller("ultimaSemanaController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		var now =  new Date().valueOf()
        var lastweek =  new Date().valueOf() - (60*60*24*7*1000)
        var ob = {
        	"order":"votoAFavor DESC",
        	"limit":"20",
        	"where":{
        	    "and":[{
        	    "creado": {
        	        "gte":lastweek
        	    }},{
        	    "creado": {
        	        "lte":now
        	    }}
        	    ]
        	}	
        }
        var url = API + '/piropos?filter='+JSON.stringify(ob)
		var piroposPromise = $http.get(url)
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
		
	}])
	.controller("ultimoMesController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		var now =  new Date().valueOf()
        var lastweek =  new Date().valueOf() - (60*60*24*31*1000)
        var ob = {
        	"order":"votoAFavor DESC",
        	"limit":"20",
        	"where":{
        	    "and":[{
        	    "creado": {
        	        "gte":lastweek
        	    }},{
        	    "creado": {
        	        "lte":now
        	    }}
        	    ]
        	}	
        }
        var url = API + '/piropos?filter='+JSON.stringify(ob)
		var piroposPromise = $http.get(url)
		piroposPromise.success(function(data, status, headers, config) {
		    console.log(data)
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
		
	}])
	.controller("piroposController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		var piroposPromise = $http.get(API + '/piropos?filter={"order":"votoAFavor DESC","limit":"10"}')
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		$scope.piropoEvents = {}
		
	}])
	.controller("UsuarioPiroposController", ['$scope', '$cookies', '$http','$routeParams', function($scope, $cookies, $http, $routeParams) {
	    var url = API + '/piropos?filter={"order":"votoAFavor DESC","where":{"usuario":"'+$routeParams.usuario+'"},"limit":"10"}'
		var piroposPromise = $http.get(url)
		                                                   //'{"order":"votoAFavor DESC","where":{"usuario":"Maetschl"}}'
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropos = data
		})
		piroposPromise.error(function(data, status, headers, config) {})
		hoverOverPiropos($scope)
	}])
	.controller("piropoController", ['$scope', '$cookies', '$http','$routeParams', function($scope, $cookies, $http, $routeParams) {
		var piroposPromise = $http.get(API + '/piropos/'+$routeParams.piropoId)
		$scope.piropo = {}
		piroposPromise.success(function(data, status, headers, config) {
			$scope.piropo = data
			$scope.piropoId = data.id
		})
		piroposPromise.error(function(data, status, headers, config) {})
		hoverOverPiropos($scope)
	}])
	.controller("votosPiropoController", ['$scope', '$cookies', '$http', function($scope, $cookies, $http) {
		$scope.votar = {}
		$scope.votar.afavor = function(event) {
			$piropoCont = $(event.currentTarget).parents(".puntaje")
			if ($piropoCont.hasClass("novotado")) {
				votar($cookies, $scope, $scope.piropoId, $http, "afavor");
			}
		}
		$scope.votar.encontra = function(event) {
			$piropoCont = $(event.currentTarget).parents(".puntaje")
			if ($piropoCont.hasClass("novotado")) {
				votar($cookies, $scope, $scope.piropoId, $http, "encontra");
			}
		}
	}])
	
	
	.controller("crearPiroposController", ['$scope', '$http','$attrs', function($scope, $http, $attrs) {
        $scope.estaMostrado     = false;
        $scope.estaMostradoBtn  = false;
		$scope.mostrarCreacion = function(event){
            $scope.estaMostrado = !$scope.estaMostrado;
		};
		$scope.guardarPiropo = function(event){
            ob = {
                usuario : $scope.inputPiropoForm.entername.$modelValue,
                texto : $scope.inputPiropoForm.enterpiropo.$modelValue
            };
            $http.post(API + "/piropos/",ob)
                .success(function(data, status, headers, config) {
                    console.log(data)
                    $.amaran({
                        content:{
                            title:'Tu piropopo fue creado sin problemas!',
                            message:'Míralo en el siguiente link',
                            info:'<a href="#/piropo/'+data.id+'"><i class="fa fa-fw fa-anchor"></i>'++'</a>',
                            icon:'fa fa-check'
                        },
                        theme:'awesome ok'
                    });
                    $.amaran({
    					content: {
    						bgcolor: '#9B59B6',
    						color: '#ecf0f1',
    						message: '<h4>Piropo creado</h4> <a href="#/piropo/'+data.id+'"><i class="fa fa-fw fa-anchor"></i>Míralo en este link</a>'
    					},
    					theme: 'colorful',
    					position: 'bottom left',
    					closeButton: true,
    					sticky: false
    				});
                })
                .error(function(data, status, headers, config) {
                    $.amaran({
    					content: {
    						bgcolor: '#9B59B6',
    						color: '#ecf0f1',
    						message: '<h4>Piropo creado</h4> <a href="#/piropo/'+data.id+'"><i class="fa fa-f fa-anchor"></i>Míralo en este link</a>'
    					},
    					theme: 'colorful',
    					position: 'bottom left',
    					closeButton: true,
    					sticky: false
    				});
                });
		};
		$scope.$watch(
            function(scope){
                return scope.inputPiropoForm.$invalid;
            },
            function(newValue,oldValue){
                if(!newValue){
                    $scope.estaMostradoBtn = true;
                }else{
                    $scope.estaMostradoBtn = false;
                }
            }
        );
	}])
	.directive('clickearEnCualquierOtroLadoParaCerrarElSidebar', function($document){
      return {
        restrict: 'A',
        link: function($scope, elem, attr, ctrl) {
            elem.find("a").bind('click',function(event){
                console.log(event);
            });
            $document.bind('click', function(event){
                var isClickedElementChildOfPopup = elem
                    .find(event.target)
                    .length > 0;

                if (isClickedElementChildOfPopup){
                    if(event.target.localName == "a"){
                        $scope.isExpanded = "";
                    }
                    $scope.isExpanded = "nav-expanded";
                }else{
                    $scope.isExpanded = "";
                }
                
            });
        }
      }
    })
	.directive("votacionPiropo",function($cookies){
        return function($scope,$element,$attrs){
            $scope.$watch(
                function(scope){
                    return scope.$parent.piropoId
                 },function(newValue,oldValue){
                    if (newValue && piropoCookieGet(newValue, $cookies)) {
                        $scope.piropoId = newValue
                        var elsestado = "votado " + "votado" + piropoCookieGet(newValue, $cookies).tipo
                        $scope.estavotado = elsestado;
                    } else {
                        $scope.estavotado = "novotado"
                    }
                }   
            )
        }
	})
	.directive("showMe",function($animate){
	    return function ($scope, $element, $attrs){
            $scope.$watch( 
    		    function(scope){
    		        return $attrs.showMe
    		    },function(newValue,oldValue){
                    if(newValue  == "true"){
                        //SHOW
                        $animate.removeClass($element,"ocultado")
                        $animate.removeClass($element,"fadeOut")
                        $animate.addClass($element,"fadeIn")

                    }else{
                        $animate.removeClass($element,"fadeIn");
                        $animate.addClass($element,"fadeOut");//.then($animate.addClass($element,"ocultado"))
                        $animate.addClass($element,"ocultado");
                    }
                }
            );
        };
	})
	.animation(".hidear",function(){
        return{
            addClass:function($element,classname){
                $($element).hide(200);
            },
            removeClass:function($element,classname){
                $($element).show(200);
            }
        };
	});
function hoverOverPiropos($scope){
	$scope.piropoEvents = {};
    $scope.piropoEvents.mouseenter= function(event){
        $piropoCont = $(event.currentTarget);
        $piropoCont.addClass("hovered");
	};
	$scope.piropoEvents.mouseleave= function(event){
        $piropoCont = $(event.currentTarget);
        $piropoCont.removeClass("hovered");
	};
}
function votar($cookies, $scope, id, $http, estado) {
	var clase = "";
	var url = "";
	if (estado == "afavor") {
		clase = "votado votadoafavor";
		url = "/addVotoAFavor";
	} else if (estado == "encontra") {
		clase = "votado votadoencontra";
		url = "/addVotoEnContra";
	}
	var piroposPromise = $http.post(API + "/piropos/" + id + url);
	piroposPromise.success(function(data, status, headers, config) {
		$scope.estavotado = clase;
		$scope.piropo.votoAFavor = data.msg.votoAFavor;
		piropoCookieAdd(id, estado, $cookies);
	});
	piroposPromise.error(function(data, status, headers, config) {});
}

function piropoCookieAdd(idpiropo, estado, $cookies) {
	var votos = {};
	if ($cookies.votos) {
        votos = JSON.parse($cookies.votos);
	}
	if (!votos[idpiropo]) {
		votos[idpiropo] = {};
	}
	votos[idpiropo].votado = true;
	votos[idpiropo].tipo = estado;
	$cookies.votos = JSON.stringify(votos);
}

function piropoCookieGet(id, $cookies) {
	if ($cookies.votos && JSON.parse($cookies.votos)[id] && JSON.parse($cookies.votos)[id].votado) {
		return JSON.parse($cookies.votos)[id];
	} else {
		return false;
	}
}