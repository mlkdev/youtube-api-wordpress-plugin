(function($){

	var Scripts = document.getElementsByTagName( 'script' );
	var Lightbox = $( Scripts[ Scripts.length - 1 ].parentNode );
	var Lightbox_Shade, Lightbox_Display, Lightbox_Locked = -1;

	var Image_Dismiss = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBvbHlnb24gZmlsbD0iI2ZmZiIgcG9pbnRzPSIzIDAgMCAzIDEyIDE1IDAgMjcgMyAzMCAxNSAxOCAyNyAzMCAzMCAyNyAxOCAxNSAzMCAzIDI3IDAgMTUgMTIgMyAwIi8+PC9zdmc+";

	function Lightbox_Init() {

		Lightbox_Shade = $( '<div/>' )
		.appendTo( $( 'body' ) )
		.css( {
			"display" : "none",
			"width" : "100%",
			"height" : "100%",
			"background-color" : "rgba(0,0,0,0.75)",
			"background-image" : "url("+Image_Dismiss+")",
			"background-repeat" : "no-repeat",
			"background-position" : "calc(100% - 25px) 25px",
			"background-size" : "30px 30px",
			"position" : "fixed",
			"z-index" : "1000000",
			"top" : "0",
			"left" : "0"
		} )
		.on( 'click', function() {
			$( this ).fadeOut();
			Lightbox_Locked = -1;
		} );
		Lightbox_Display = $( '<div/>' )
		.appendTo( Lightbox_Shade )
		.css( {
			"width" : "75vw",
			"height" : "0",
			"padding-bottom" : "42.1875vw",
			"background" : "#000",
			"position" : "fixed",
			"top" : "50%",
			"left" : "50%",
			"-webkit-transform" : "translate(-50%,-50%)",
			"-moz-transform" : "translate(-50%,-50%)",
			"-ms-transform" : "translate(-50%,-50%)",
			"-o-transform" : "translate(-50%,-50%)",
			"transform" : "translate(-50%,-50%)"
		} );
		$( '.ytapi-lightbox-group-item, .ytapi-lightbox-item' )
		.css( { "cursor" : "pointer" } )
		.on( 'click', function() {
			var VideoID = $( this ).data( 'videoid' );
			Lightbox_Display.hide();
			Lightbox_Locked = $( document ).scrollTop();
			Lightbox_Shade.fadeIn( '400', function() {
				$( '<iframe/>' )
				.appendTo( Lightbox_Display.empty() )
				.attr( 'src', '//www.youtube.com/embed/' + VideoID )
				.attr( 'frameborder', '0' )
				.attr( 'allowfullscreen', '' )
				.attr( 'security', 'restricted' )
				.css( {
					"width" : "100%",
					"height" : "100%",
					"position" : "absolute",
					"top" : "0",
					"left" : "0"
				} )
				.on('load', function() {
					Lightbox_Display.fadeIn();
				});
			} );
		} );

	}

	$( document )
	.on( {
		ready: function() {
			Lightbox_Init();
		},
		scroll: function() {
			if( Lightbox_Locked >= 0 ) {
				$( document ).scrollTop( Lightbox_Locked );
			}
		}
	} );

})(jQuery);