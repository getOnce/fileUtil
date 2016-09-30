define(function() {
	"use strict";
	return {
		/**
		 * @description 根据File对象生产img
		 * @param {File} file 文件对象
		 * @param {Function} cb callback(HTMLImageElement img)
		 */
		getImgByFile: function(file, cb) {
			this.getSrcByFile(file, function(src) {
				if(src) {
					var img = new Image();
					img.onload = function(e) {
						cb(this);
					};
					img.src = src;
				} else {
					cb();
				}
			});

			/*if(window.FileReader) {
				var reader = new FileReader();
				reader.onload = function(e){
					img.src = this.result;
				}
				reader.readAsDataURL(file);
			} else if(window.URL || window.webkitURL) {
				//File API
				var URL = (window.URL || window.webkitURL);
				img.onload = function(e) {
					URL.revokeObjectURL(this.src);
				};
				img.src = URL.createObjectURL(file);
			}*/
		},
		/**
		 * @description 根据File对象生产src
		 * @param {File} file 文件对象
		 * @param {Function} cb callback(String src)
		 */
		getSrcByFile: function(file, cb) {
			if(window.FileReader) {
				var reader = new FileReader();
				reader.onload = function(e){
					cb(this.result);
				}
				reader.readAsDataURL(file);
			} else if(window.URL || window.webkitURL) {
				cb((window.URL || window.webkitURL).createObjectURL(file));
			} else {
				cb();
			}
		}
	}
});