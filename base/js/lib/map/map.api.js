window.qq = window.qq || {};
qq.maps = qq.maps || {};
window.soso || (window.soso = qq);
soso.maps || (soso.maps = qq.maps);
(function () {
    function getScript(src) {
        document.write('<' + 'script src="' + src + '"' +' type="text/javascript"><' + '/script>');
    }
    qq.maps.__load = function (apiLoad) {
        delete qq.maps.__load;
        apiLoad([["2.4.38","",0],["http://open.map.qq.com/","apifiles/2/4/38/mods/","http://open.map.qq.com/apifiles/2/4/38/theme/",true],[1,18,34.519469,104.461761,4],[1479979905345,"http://pr.map.qq.com/pingd","http://pr.map.qq.com/pingd"],["http://apis.map.qq.com/jsapi","http://apikey.map.qq.com/mkey/index.php/mkey/check","http://sv.map.qq.com/xf","http://sv.map.qq.com/boundinfo","http://sv.map.qq.com/rarp","http://search.map.qq.com/","http://routes.map.qq.com/","http://confinfo.map.qq.com/confinfo"],[[null,["http://rt0.map.gtimg.com/tile","http://rt1.map.gtimg.com/tile","http://rt2.map.gtimg.com/tile","http://rt3.map.gtimg.com/tile"],"png",[256,256],1,19,"114",true,false],[null,["http://m0.map.gtimg.com/hwap","http://m1.map.gtimg.com/hwap","http://m2.map.gtimg.com/hwap","http://m3.map.gtimg.com/hwap"],"png",[128,128],4,18,"110",false,false],[null,["http://p0.map.gtimg.com/sateTiles","http://p1.map.gtimg.com/sateTiles","http://p2.map.gtimg.com/sateTiles","http://p3.map.gtimg.com/sateTiles"],"jpg",[256,256],1,19,"101",false,false],[null,["http://rt0.map.gtimg.com/tile","http://rt1.map.gtimg.com/tile","http://rt2.map.gtimg.com/tile","http://rt3.map.gtimg.com/tile"],"png",[256,256],1,19,"",false,false],[null,["http://sv0.map.qq.com/hlrender/","http://sv1.map.qq.com/hlrender/","http://sv2.map.qq.com/hlrender/","http://sv3.map.qq.com/hlrender/"],"png",[256,256],1,19,"",false,false],[null,["http://rtt2.map.qq.com/rtt/","http://rtt2a.map.qq.com/rtt/","http://rtt2b.map.qq.com/rtt/","http://rtt2c.map.qq.com/rtt/"],"png",[256,256],1,19,"",false,false],null,[["http://rt0.map.gtimg.com/vector/","http://rt1.map.gtimg.com/vector/","http://rt2.map.gtimg.com/vector/","http://rt3.map.gtimg.com/vector/"],[256,256],4,18,"114",["http://rt0.map.gtimg.com/icons/","http://rt1.map.gtimg.com/icons/","http://rt2.map.gtimg.com/icons/","http://rt3.map.gtimg.com/icons/"]],null],["http://s.map.qq.com/TPano/v1.1.1/TPano.js","http://map.qq.com/",""]],loadScriptTime);
    };
    var loadScriptTime = (new Date).getTime();
    getScript("http://open.map.qq.com/apifiles/2/4/38/main.js");
})();