var btnUpload = $("#upload_file"),
	btnOuter = $(".button_outer");
btnUpload.on("change", function (e) {
	var ext = btnUpload.val().split('.').pop().toLowerCase();
	if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == 0) {
		$(".error_msg").text("Not an Image...");
	} else {
		$(".error_msg").text("");
		btnOuter.addClass("file_uploading");
		setTimeout(function () {
			btnOuter.addClass("file_uploaded");
		}, 3000);
		var uploadedFile = URL.createObjectURL(e.target.files[0]);
		setTimeout(function () {
			$("#uploaded_view").append('<img src="' + uploadedFile + '" />').addClass("show");
		}, 3500);
	}
});
$(".file_remove").on("click", function (e) {
	$("#uploaded_view").removeClass("show");
	$("#uploaded_view").find("img").remove();
	btnOuter.removeClass("file_uploading");
	btnOuter.removeClass("file_uploaded");
});
var btnUpload2 = $("#upload_file2"),
	btnOuter2 = $(".button_outer2");
btnUpload2.on("change", function (c) {
	var ext2 = btnUpload2.val().split('.').pop().toLowerCase();
	if ($.inArray(ext2, ['gif', 'png', 'jpg', 'jpeg']) == 0) {
		$(".error_msg").text("Not an Image...");
	} else {
		$(".error_msg").text("");
		btnOuter2.addClass("file_uploading2");
		setTimeout(function () {
			btnOuter2.addClass("file_uploaded2");
		}, 6000);
		var uploadedFile2 = URL.createObjectURL(c.target.files[0]);
		setTimeout(function () {
			$("#uploaded_view2").append('<img src="' + uploadedFile2 + '" />').addClass("show");
		}, 6500);
	}
});
$(".file_remove2").on("click", function (c) {

	$("#uploaded_view2").removeClass("show");
	$("#uploaded_view2").find("img").remove();
	btnOuter2.removeClass("file_uploading2");
	btnOuter2.removeClass("file_uploaded2");
});