(function($){

	function YTAPI_ParseURI( uri ) {

		var RawURI = $('<a/>').attr( 'href', uri ).get( 0 ); //.search.substr(1).split('&');
		var ParsedURI = {
			protocol : RawURI.protocol,
			hostname : RawURI.hostname,
			port : RawURI.port,
			pathname : RawURI.pathname,
			search : RawURI.search.substr(1).split('&'),
			hash : RawURI.hash,
			host : RawURI.host
		};
		var SearchPairs = {};
		for( var i = 0; i < ParsedURI.search.length; i ++ ) {
			var SearchParts = ParsedURI.search[ i ].split('=');
			SearchPairs[ SearchParts[ 0 ] ] = SearchParts[ 1 ];
		}
		ParsedURI.search = SearchPairs;

		return ParsedURI;

	}

	function YTAPI_Calculator_Init( container ) {

		container.empty();

		var ResultBox = $('<div/>')
			.appendTo( container );
		var InputBox = $('<input/>')
			.appendTo( container );
		var GetCodeBtn = $('<button/>')
			.appendTo( container )
			.attr('type','button')
			.html('Get Code')
			.on('click',function(e){

				var ParsedURI = YTAPI_ParseURI( InputBox.val() );

				var VideoCode = '';
				var PlistCode = '';
				switch( ParsedURI.pathname ) {
					case '/watch' :
						if( typeof ParsedURI.search.v != 'undefined' ) VideoCode = ParsedURI.search.v;
						if( typeof ParsedURI.search.list != 'undefined' ) PlistCode = ParsedURI.search.list;
						break;
					case '/playlist' :
						if( typeof ParsedURI.search.list != 'undefined' ) PlistCode = ParsedURI.search.list;
						break;
					default:
						VideoCode = ParsedURI.pathname.substr( 1 ).split( '/' )[ 0 ];
						break;
				}

				ResultBox.empty();
				var ResultTable = $( '<table/>' ).appendTo( ResultBox );
				$( '<tr><th>Video Code:</th><td>'+( VideoCode.length ? VideoCode : 'Not Found' )+'</td></tr>' ).appendTo( ResultBox );
				$( '<tr><th>Playlist Code:</th><td>'+( PlistCode.length ? PlistCode : 'Not Found' )+'</td></tr>' ).appendTo( ResultBox );

			});

	}

	function YTAPI_ChannelID_Init( container ) {

		container.empty();
		var ResultBox = $('<div/>')
			.appendTo( container );
		var InputBox = $('<input/>')
			.attr('placeholder', 'Video ID')
			.appendTo( container );
		var GetCodeBtn = $('<button/>')
			.appendTo( container )
			.attr('type','button')
			.html('Get Code')
			.on('click',function(e){

				ResultBox.empty().html('Checking, please wait...');
				$.ajax( {
					method: 'GET',
					url: 'https://www.googleapis.com/youtube/v3/videos',
					data: { part: 'snippet', id: InputBox.val(), key: $( '#api-key' ).val() }
				} )
				.done( function( msg ) {

					ResultBox.empty();
					var ResultTable = $( '<table/>' ).appendTo( ResultBox );
					$( '<tr><th>Channel ID:</th><td>'+( typeof msg.items[0].snippet.channelId == 'undefined' ? 'Not Found' : msg.items[0].snippet.channelId )+'</td></tr>' ).appendTo( ResultBox );

				} );

			});

	}

	$(document).on('ready',function(){

		YTAPI_Calculator_Init( $('#YTAPI-Calculator') );
		YTAPI_ChannelID_Init( $('#YTAPI-ChannelID') );
		//kj9-QKZVW54

	});

})(jQuery);