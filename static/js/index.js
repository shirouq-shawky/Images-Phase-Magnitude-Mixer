
let crop1;
let crop2;
let img1_Mag;
let img1_phase;
let img2_Mag;
let img2_phase;

var merge = function () {
	selectbox1 = document.getElementById("inputState1").value;
	selectbox2 = document.getElementById("inputState2").value;
	console.log(selectbox1, selectbox2);
	checkbox = document.getElementById("high").checked;
	console.log(checkbox);
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	fd.append("high", checkbox);
	fd.append("requestinfo", "merge");
	fd.append("img1mode", selectbox1);
	fd.append("img2mode", selectbox2);
	xhr.open("POST", "/", true);
	xhr.send(fd);
	xhr.onload = function (e) {
		if (this.readyState === 4) {
			console.log("Server returned: ", e.target.responseText);
			var result = document.getElementById('result');
			result.src = e.target.responseText;
		};
	};

};

var changeimg1src = function () {
	selectbox1 = document.getElementById("inputState1");
	console.log(selectbox1.value);
	var image4 = document.getElementById('img4');
	if (selectbox1.value == "phase") {
		image4.src = img1_phase;
	} else {
		console.log("else cond");
		console.log(img1_Mag);
		image4.src = img1_Mag;

	};


};

var changeimg2src = function () {
	selectbox2 = document.getElementById("inputState2");
	console.log(selectbox2.value);
	var image3 = document.getElementById('img3');
	if (selectbox2.value == "phase") {
		image3.src = img2_phase;
	} else {
		image3.src = img2_Mag;
	};


};





var loadFile1 = function (event) {
	console.log(event.target.files.length);
	var image = document.getElementById('img1');
	image.src = URL.createObjectURL(event.target.files[0]);
	var image4 = document.getElementById('img4');
	console.log(typeof crop1);
	if (typeof crop1 !== "undefined") {
		crop1.destroy();
		crop1 = Jcrop.attach(image4);

	} else {
		crop1 = Jcrop.attach(image4);
	};

	console.log(typeof crop1);
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	fd.append("image1", event.target.files[0], event.target.files[0].filename);
	fd.append("requestinfo", "image1");
	xhr.open("POST", "/", true);
	xhr.send(fd);
	xhr.onload = function (e) {
		if (this.readyState === 4) {
			console.log("Server returned: ", e.target.responseText);
			var image4 = document.getElementById('img4');
			console.log(e.target.responseText.length);
			response = e.target.responseText;
			split_paths = response.split("|");
			img1_Mag = split_paths[0];
			img1_phase = split_paths[1];
			console.log(img1_Mag, img1_phase);


			image4.src = img1_Mag;


		}
		crop1.listen('crop.change', (widget, e) => {
			console.log(widget.pos);
			console.log(widget.pos.x);
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			fd.append("requestinfo", 'crop1pos')
			fd.append("x", widget.pos.x)
			fd.append("y", widget.pos.y)
			fd.append("w", widget.pos.w)
			fd.append("h", widget.pos.h)

			xhr.open("POST", "/", true);
			xhr.send(fd);
			xhr.onload = function (e) {
				if (this.readyState === 4) {
					console.log("Server returned: ", e.target.responseText);
					console.log(crop1.active.pos);

				}
			};

		});



	};

};


var loadFile2 = function (event) {
	console.log(event.target.files.length);
	var image = document.getElementById('img2');
	image.src = URL.createObjectURL(event.target.files[0]);
	var image3 = document.getElementById('img3');
	console.log(event.target.id)
	if (typeof crop2 !== "undefined") {
		crop2.destroy();
		crop2 = Jcrop.attach(image3);

	} else {
		crop2 = Jcrop.attach(image3);
	};
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	fd.append("image2", event.target.files[0], event.target.files[0].filename);
	fd.append("requestinfo", "image2");
	xhr.open("POST", "/", true);
	xhr.send(fd);
	xhr.onload = function (e) {
		if (this.readyState === 4) {
			console.log("Server returned: ", e.target.responseText);
			var image3 = document.getElementById('img3');
			console.log(e.target.responseText.length);
			response = e.target.responseText;
			split_paths = response.split("|");
			img2_Mag = split_paths[0];
			img2_phase = split_paths[1];
			console.log(img2_Mag, img2_phase);
			image3.src = img2_phase;



		}
	};
	crop2.listen('crop.change', (widget, e) => {
		console.log(widget.pos);
		console.log(widget.pos.x);
		var xhr = new XMLHttpRequest();
		var fd = new FormData();
		fd.append("requestinfo", 'crop2pos')
		fd.append("x", widget.pos.x)
		fd.append("y", widget.pos.y)
		fd.append("w", widget.pos.w)
		fd.append("h", widget.pos.h)

		xhr.open("POST", "/", true);
		xhr.send(fd);
		xhr.onload = function (e) {
			if (this.readyState === 4) {
				console.log("Server returned: ", e.target.responseText);
				console.log(crop2.active.pos);

			}
		};

	});



};








