$(document).ready(function(){												

        $(".main-menu").navgoco({
            //caret: '<span class="caret"></span>',
            caret:'<i class="fa fa-fw fa-caret-down"></i>',
            accordion: false,
            openClass: 'open',
            save: true,
            cookie: {
                name: 'navigationcookie',
                expires: false,
                path: '/'
            },
            slide: {
                duration: 250,
                easing: 'swing'
            }
        });
 
      });