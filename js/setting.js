const color = [
	{
		name:'pink',
		code:'#fb839e',
		url:'css/skins/pink.css'
	},
	{
		name:'light blue',
		code:'#3e99f5',
		url:'css/skins/light-blue.css'
	},
	{
		name:'light green',
		code:'#0dcdbd',
		url:'css/skins/light-green.css'
	},
	{
		name:'red',
		code:'#cc3b3b',
		url:'css/skins/red.css'
	},
	{
		name:'yellow',
		code:'#ff9800',
		url:'css/skins/yellow.css'
	}
]

$(document).ready(function() {
	setColors();
	function setColors(){
		for(let i=0; i<color.length;i++){
			const span = document.createElement("span");
			span.style.backgroundColor = color[i].code;
			$(".colors").append(span);
		}
	}

	// Pilih warna random saat load
	function setRandomColor(){
		const index = Math.floor(Math.random() * color.length);
		$(".alternate-style").attr("href", color[index].url);
		console.log("Tema random dipilih:", color[index].name);
	}

	$(".colors").on("click", "span", function(){
		const index = $(this).index();
		$(".alternate-style").attr("href", color[index].url);
	});

	// =============================
	// Theme Light & Dark Mode
	// =============================

	function setThemeByTime(){
		const hour = new Date().getHours();
		console.log("Jam sekarang:", hour);

		if(hour >= 6 && hour < 18){
			// Mode cerah (default)
			$("body").removeClass("dark");
			$(".theme-mode").val("light");
			console.log("Mode CERAH aktif");
		} else {
			// Mode malam
			$("body").addClass("dark");
			$(".theme-mode").val("dark");
			console.log("Mode GELAP aktif");
		}
	}

	// Jalankan saat halaman pertama kali load
	setThemeByTime();
	setRandomColor();


	// Manual override via dropdown/radio
	$(".theme-mode").change(function(){
		if($(this).val() == "light") {
			$("body").removeClass("dark");
		} else {
			$("body").addClass("dark");
		}
	});

	// Toggle Setting Box
	$(".s-toggle-btn").click(function(){
		$(".setting").toggleClass("open");
	})
});