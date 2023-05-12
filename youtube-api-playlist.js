(function($){

	var Scripts = document.getElementsByTagName( 'script' );
	var Script_Self = Scripts[ Scripts.length - 1 ];

	var Playlist, Playlist_Display, Playlist_Controls, Playlist_Wallet, Playlist_Items;
	var Playlist_Index = 0;

	function Playlist_ReflowControls() {

		// Hint Prev/Next Buttons...
		$( Playlist.find( '.ytapi-playlist-viewer-controls-prev' ).get( 0 ) ).css( { "opacity" : ( Playlist_Index == 0 ? 0.25 : 1.0 ) } );
		$( Playlist.find( '.ytapi-playlist-viewer-controls-next' ).get( 0 ) ).css( { "opacity" : ( Playlist_Index == Playlist_Items.length - 1 ? 0.25 : 1.0 ) } );

	}

	function Playlist_ReflowItems() {

		if( !Playlist_Items.filter('.active').length ) return;
		Playlist_Wallet.animate( { scrollTop : Math.round( Playlist_Wallet.scrollTop() ) + Math.round( $(Playlist_Items.filter('.active').get(0)).position().top ) - Math.round( parseFloat( Playlist_Wallet.css( "padding-top" ) ) ) } );

	}

	function Playlist_Reflow() {

		if( Playlist.attr( 'data-equalizer' ) ) {
			if( typeof Playlist != 'undefined' && Playlist.length ) {
				new Foundation.Equalizer( Playlist ).applyHeight();
			}
		}
		Playlist_ReflowItems();
		Playlist_ReflowControls();

	}

	function Playlist_UpdateIndex() {

		Playlist_Index = Playlist_Items.filter( '.active' ).index();

	}

	function Playlist_BindControls() {

		Playlist.find( '.ytapi-playlist-viewer-controls-prev' ).on( 'click', function() {
			if( Playlist_Index == 0 ) return;
			Playlist_Items.removeClass( 'active' );
			$( Playlist_Items.get( Playlist_Index-1 ) ).trigger( 'click' );
		} );

		Playlist.find( '.ytapi-playlist-viewer-controls-next' ).on( 'click', function() {
			if( Playlist_Index == Playlist_Items.length-1 ) return;
			Playlist_Items.removeClass( 'active' );
			$( Playlist_Items.get( Playlist_Index+1 ) ).trigger( 'click' );
		} );

	}

	function Playlist_BindItems() {

		Playlist_Items.on( 'click', function() {

			// Playlist Indexing...
			Playlist_Items.removeClass( 'active' );
			var Item = $( this ).addClass( 'active' );
			Playlist_UpdateIndex();

			// Image Processing...
			if( $( this ).attr( 'data-imageurl' ) ) {
				Playlist_Display.empty();
				var Image_URL = $( this ).data( 'imageurl' );
				$('<img/>')
				.appendTo( Playlist_Display )
				.attr( 'src', Image_URL )
				.addClass( 'ytapi-playlist-viewer-display-image' )
				.css( {
					"display" : "block",
					"width" : "100%",
					"height" : "auto"
				} )
				.on('load', function() {
					Playlist_Reflow();
				});
			}

			// Video Embed Processing...
			if( $( this ).attr( 'data-videoid' ) ) {
				Playlist_Display.empty();
				var Embed_Container = $( '<div/>' )
				.appendTo( Playlist_Display )
				.addClass( 'ytapi-playlist-viewer-display-embed' );
				var Embed_Inner = $( '<div/>' )
				.appendTo( Embed_Container )
				.addClass( 'ytapi-playlist-viewer-display-embed-inner' )
				.css( {
					"padding" : "0 0 56.25% 0",
					"max-width" : "100%",
					"height" : "0",
					"overflow" : "hidden",
					"position" : "relative"
				} );
				var Embed_Iframe = $( '<iframe/>' )
				.appendTo( Embed_Inner )
				.attr( 'src', '//www.youtube.com/embed/' + Item.data( 'videoid' ) )
				.attr( 'frameborder', '0' )
				.attr( 'allowfullscreen', '' )
				.attr( 'security', 'restricted' )
				.css( {
					"width" : "100%",
					"height" : "100%",
					"position" : "absolute",
					"top" : "0",
					"left" : "0"
				} );
			}

			// Title and Description...
			$('<div/>')
			.appendTo( Playlist_Display )
			.addClass( 'ytapi-playlist-viewer-display-title' )
			.html( $( Item.find( '.ytapi-playlist-wallet-item-content-title' ).get( 0 ) ).html() );
			$('<div/>')
			.appendTo( Playlist_Display )
			.addClass( 'ytapi-playlist-viewer-display-desc' )
			.html( $( Item.find( '.ytapi-playlist-wallet-item-content-desc' ).get( 0 ) ).html() );

			Playlist_Reflow();

		} );

	}

	function Playlist_Init() {

		Playlist = $( Script_Self.parentNode );
		Playlist_Display = $( Playlist.find( '.ytapi-playlist-viewer-display' ).get( 0 ) );
		Playlist_Controls = $( Playlist.find( '.ytapi-playlist-viewer-controls' ).get( 0 ) );
		Playlist_Wallet = $( Playlist.find( '.ytapi-playlist-wallet' ).get( 0 ) );
		Playlist_Items = $( Playlist.find( '.ytapi-playlist-wallet-item' ) );

		// Event Bindings...
		Playlist_BindItems();
		Playlist_BindControls();

		// First Run...
		$( Playlist_Items.get( 0 ) ).trigger( 'click' );

	}

	$( document ).on( 'ready', Playlist_Init );

})(jQuery);