$(function() {

	window.FormView = Backbone.View.extend({
		el: $("#search_form"),
		search_ppoc: function(e) {
			e.preventDefault();
			var self = this;
			$.getJSON("http://www.loc.gov/pictures/search/?fo=json&callback=?&q=",{
				q: $("#txt_search").val()
			}, function(data) {
				$("#ul_gallery_grid li").remove() ;
				for(var i in data.results) {
					var picGallery = new Pic(data.results[i]);
					var picsGalleryView = new PicsGalleryView({model: picGallery});
					picsGalleryView.render();
					if (i>13){break;}
				}
			});
		},
		events: {
			"submit": "search_ppoc"
		}
    });

	window.PicsGalleryView = Backbone.View.extend({
		render: function() {
			var singlePic = _.template( $("#singlePic_template").html(), this.model.toJSON());
			$("#ul_gallery_grid").append(singlePic);
		}
	});

});