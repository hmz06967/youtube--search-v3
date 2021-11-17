
	//google api keyinizi aşağıya girdikten sonra script çalışır 
	$(function(){  
		$.ARamaYap = {
			GetStringDuration: function (string){
				var array=string.match(/(\d+)(?=[MHS])/ig)||[],
				formatted=array.map(function(item)
				{
					if(item.length<2) return '0'+item;return item;
				}).join(':');	
				 return formatted;
			},
			
			SerializeQuerySearch: function (query,pagetoken){
				
			var NextPage='&pageToken='+pagetoken,
				aranan=query,
				Max = 16,
				key  = 'sizin google api key',
				JSONurl= 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+aranan+'&key='+key+'&maxResults='+Max+'&type=video'+NextPage,
				sonuc = $("#sonuc");
			sonuc.empty();	
				
			$.getJSON(JSONurl ,function(data){
				
				var sayilrle=data.nextPageToken;$("._bpls[page-token=next]").attr("id",sayilrle);

			$.each(data.items,function(i,item){var kod=item.id.videoId,isim=item.snippet.title;
				$(".Results").empty();$("._bpls[page-token=next]").show();
				$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+kod+'&part=contentDetails&key'+key,function(data){
					
					$.each(data.items,function(i,item){
						
					var string=item.contentDetails.duration, 
						formatted= $.ARamaYap.GetStringDuration(string), 
						ne = '<div class="sonuclar" ><a href="#'+kod+'" title="'+isim+'">'+isim+'</a><span>'+formatted+'</span></div>';

					sonuc.append(ne);

					});
				});

				return true});
			});
			}		
		}
	});
	


