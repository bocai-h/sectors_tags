var SectorsTags = {
	// 默认设置
	setting:{
		"data_source": null,
		"init_sectors": [],
		"init_sector_tags": [],
		// 行业是否可以多选(multiple/single) 默认多选
		"sector_flag": "multiple"
	},
	init: function(setting){
		  // 传递设置覆盖默认设置
       $.extend(this.setting,setting);
			 var data = this.setting.data_source;
			 var init_sectors = this.setting.init_sectors;
			 var init_sector_tags = this.setting.init_sector_tags;
       for(var i = 0; i < data.length; i++){
       	  var sector = data[i];
       	  var sector_item = "<span class='filter-li'><span id='sector_id_"+ sector["sector_id"]+ "' class='sector'>" + sector["sector_name"] + "</span></span>";
       	  $(".sectors .sectors_content").append(sector_item);

          // 初始化tags
          var tag_div = "<div id='tags_div_" + sector["sector_id"] + "' class='hide tags_div'></div>";
       	  $(".sectors_tags .tags_content").append(tag_div);

       	  var sector_tags = sector["sector_tags"];
       	  for(var j = 0; j <  sector_tags.length; j++){
       	  	var tag = sector_tags[j];
       	    var tag_item = "<span class='filter-li'><span id='tag_id_"+ tag["tag_id"]+ "' class='sector_tag'>" + tag["tag_name"] + "</span></span>";
       	    $("#tags_div_" + sector["sector_id"]).append(tag_item);
       	  }
       };
       this.binds();
			 //  初始化选中行业
 			for(var n = 0; n < init_sectors.length; n++){
 				var sector_id = "sector_id_" + init_sectors[n];
        $("#" + sector_id).trigger("click");
 			};
			// 初始化选中行业标签
			for(var m = 0; m < init_sector_tags.length; m++){
				var sector_tag_id = "tag_id_" + init_sector_tags[m];
				$("#" + sector_tag_id).trigger("click");
			}
	},
  binds: function(){
    this.expand();
		this.close();
		this.sector_selected();
		this.sector_tag_selected();
		this.cancel_selected();
  },
	expand: function(){
		// 展开功能
			$(".expand-li").on("click",function(){
				$(this).parent().prev().removeClass("content");
				$(this).addClass("hide");
				$(this).next().removeClass("hide");
			});
	},
	close: function(){
		// 收起功能
		$(".close-li").on("click",function(){
			$(this).parent().prev().addClass("content");
			 $(this).addClass("hide");
			 $(this).prev().removeClass("hide");
		});
	},
	sector_selected: function(){
		var self = this;
		var sector_flag = self.setting.sector_flag;
    $("span.filter-li span.sector").on("click",function(){
        if(sector_flag == "single"){

				}else{
					if(!$(this).hasClass("selected")){
	           $(this).addClass("selected");
	           $(this).after("<span class='delete-icon'></span>")
	           // 插入选中标签显示栏
	           var selected_tag = "<span class='selected-tag' id='tag_" + $(this).attr("id") + "'><span class='tag tag-content'>" + $(this).html() +
	                               "</span><span class='tag cancel-icon'>&times;</span></span>";
	           $(".selected_tags .content").append(selected_tag);
	         };
				};
				// 显示相应的tags
				$(".tags_div").addClass("hide");
				var tags_div_id = "tags_div_" + $(this).attr("id").replace("sector_id_","");
				$("#" + tags_div_id).removeClass("hide");
		});
	},
	sector_tag_selected: function(){
    var self = this;
		$("span.filter-li span.sector_tag").on("click",function(){
			if(!$(this).hasClass("selected")){
				 $(this).addClass("selected");
				 $(this).after("<span class='delete-icon'></span>")
				 // 插入选中标签显示栏
				 var selected_tag = "<span class='selected-tag' id='tag_" + $(this).attr("id") + "'><span class='tag tag-content'>" + $(this).html() +
														 "</span><span class='tag cancel-icon'>&times;</span></span>";
				 $(".selected_tags .content").append(selected_tag);
			 };
		});
	},
	cancel_selected: function(){
		var self = this;
		// 撤销选中功能
		$("#sectors_tags_div").on("click",".delete-icon",function(){
				$(this).prev().removeClass("selected");
				var sector_dom_id = $(this).prev().attr("id");
				var sector_id = sector_dom_id.replace("sector_id_","");
				var tag_id = "tag_" + sector_dom_id;
				// 清除选中的标签
				$("#" + tag_id).remove();
			 // 如果是行业标签需要清除其所有子项的选中状态 包括子项的选中标签 同时切换sector_tags到最后一个选中的sector所属
				if($(this).prev().hasClass("sector")){
					 var data = self.setting.data_source;
					 for(var i = 0; i < data.length; i++){
						 var sector_item = data[i];
						 if(sector_item["sector_id"] == sector_id){
								var sector_tags = sector_item["sector_tags"];
								for(var j = 0; j < sector_tags.length; j++ ){
									 var tag_item = sector_tags[j];
									 var tag_id = "tag_id_" + tag_item["tag_id"]
									 $("#" + tag_id).removeClass("selected");
									 $("#" + tag_id).next().remove();
									 // 清除子项选中的标签
									 $("#tag_" + tag_id).remove();
								}
								break;
						 }
					 };
					//  最后一个选中的sector对应的tag_div
					var active_tags_div_id = "tags_div_" + $("span.filter-li span.sector.selected").last().attr("id").replace("sector_id_","");
          $("#" + active_tags_div_id).removeClass("hide");
				}
				$(this).remove();
		 });
		// 通过选中标签撤销
		$("#sectors_tags_div").on("click",".cancel-icon",function(){
			 var id = $(this).parent().attr("id").replace("tag_","");
			 $("#" + id).next().trigger("click");
			 $(this).parent().remove();
		});
	}
};
$(document).ready(function(){
	// sectors_tags_data,sector_ids,sector_tag_ids是从数据js文件中引入进来的 最后一个参数是对是否可选择多个行业的设置(multiple/single)
	var setting = {
		"data_source": sectors_tags_data["result"],
		"init_sectors": sector_ids,
		"init_sector_tags": sector_tag_ids,
	}
	SectorsTags.init(setting);
});
