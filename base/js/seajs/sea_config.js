var config = seajs.config({
    base: 'http://static.100yy.com',
    alias: {
		jquery: 'http://static.100yy.com/base/js/jquery/jquery.js',
		cookie: 'http://static.100yy.com/base/js/lib/jquery.cookie.js'
	},
    map: [
        [/^(.*\.(?:js))(.*)$/i, '$1?ver=20160921104708']
    ]
});