var sectors_tags = {
	"result": [
      {
        "sector_id": "1",
        "sector_name": "企业服务",
        "sector_tags": [
          {
           "tag_id": "1",
           "tag_name": "B2D开发者服务"
          },
          {
          "tag_id": "2",
          "tag_name": "IT基础设施"
          }
        ]
      },
      {
       "sector_id": "2",
       "sector_name": "体育运动",
       "sector_tags": [
         {
           "tag_id": "3",
           "tag_name": "体育媒体及社区"
         },
         {
           "tag_id": "4",
           "tag_name": "体育用品及装备"
         }
       ]
      }
	]
}

var SectorsTags = {
    event_trigger: function(){
    	// 展开功能
        $(".expand-li").on("click",function(){
		  $(this).parent().prev().removeClass("content");
          $(this).addClass("hide");
          $(this).next().removeClass("hide");
	   });
       // 收起功能
	  $(".close-li").on("click",function(){
		 $(this).parent().prev().addClass("content");
         $(this).addClass("hide");
         $(this).prev().removeClass("hide");
	  })
	  // 选中功能
	  $("span.filter-li span").on("click",function(){
		if(!$(this).hasClass("selected")){
		   $(this).addClass("selected");
           $(this).after("<span class='delete-icon'></span>")
           // 插入选中标签显示栏
           var selected_tag = "<span class='selected-tag' id='tag_" + $(this).attr("id") + "'><span class='tag tag-content'>" + $(this).html() + 
                              "</span><span class='tag cancel-icon'>&times;</span></span>";
           $(".selected_tags .content").append(selected_tag);
		}
		if($(this).hasClass("sector")){
		 // 显示相应的tags
		  $(".tags_div").addClass("hide");
          var tags_div_id = "tags_div_" + $(this).attr("id").replace("sector_id_","");
          $("#" + tags_div_id).removeClass("hide");
		}
	  });
	  // 撤销选中功能
	  $("#sectors_tags_div").on("click",".delete-icon",function(){
        $(this).prev().removeClass("selected");
        var tag_id = "tag_" + $(this).prev().attr("id");
        // 清除选中的标签
        $("#" + tag_id).remove();
         $(this).remove();
	  });

	 // 通过选中标签撤销
	 $("#sectors_tags_div").on("click",".cancel-icon",function(){
        var id = $(this).parent().attr("id").replace("tag_","");
        $("#" + id).removeClass("selected");
        $("#" + id).next().remove();
        $(this).parent().remove();
	 });
    },
	init: function(data){
       var sectors_tags = data["result"];
       for(var i = 0; i < sectors_tags.length; i++){
       	  var sector = sectors_tags[i];
       	  var sector_item = "<span class='filter-li'><span id='sector_id_"+ sector["sector_id"]+ "' class='sector'>" + sector["sector_name"] + "</span></span>";
       	  $(".sectors .content").append(sector_item);

          // 初始化tags
          var tag_div = "<div id='tags_div_" + sector["sector_id"] + "' class='hide tags_div'></div>";
       	  $(".sectors_tags .content").append(tag_div);

       	  var sector_tags = sector["sector_tags"];
       	  for(var j = 0; j <  sector_tags.length; j++){
       	  	var tag = sector_tags[j];
       	    var tag_item = "<span class='filter-li'><span id='tag_id_"+ tag["tag_id"]+ "'>" + tag["tag_name"] + "</span></span>";
       	    $("#tags_div_" + sector["sector_id"]).append(tag_item);
       	  }
       }
       this.event_trigger();
	}
}
SectorsTags.init(sectors_tags);