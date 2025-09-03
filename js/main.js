$(window).on("load",function(){

	// Preloader
	$(".preloader").fadeOut(600);

	// Home Section Slideshow
	let slideIndex = $(".slide.active").index();
	const slideLen = $(".slide").length;

	function slideShow(){
		$(".slide").removeClass("active").eq(slideIndex).addClass("active");
		if (slideIndex == slideLen-1) {
			slideIndex = 0;
		}
		else{
			slideIndex++;
		}
		setTimeout(slideShow,5000);
	}
	slideShow();

	// Tombol Audio
	$(".fa-music").click(function(){

		if($(this).hasClass("pause")){
			$("#myAudio")[0].play();
		}
		else{
			$("#myAudio")[0].pause();
		}
		$(this).toggleClass("pause");
	})
	musicStart = true;
})

$(document).ready(function(){
	let musicStart = false;

	// Nav Toggle
	$(".hamburger-btn").click(function(){
		$(".header .nav").slideToggle();
	})
	$(".header .nav a").click(function(){
		if($(window).width() < 768) {
			$(".header .nav").slideToggle();
		}
	})
	// Fixed Header
	$(window). scroll(function(){
		const audio = $("#myAudio")[0];
		audio.volume = 0.5;

		if($(this).scrollTop() > 100){
			$(".header").addClass("fixed");

			// Play musik hanya sekali
			if (!musicStart) {
				audio.play().then(() => {
					$(".fa-music").removeClass("pause");
                    musicStart = true;
				}).catch(() => {
				});
			}
		}
		else{
			$(".header").removeClass("fixed");
		}
	})

	// ScrollIt
	$.scrollIt({
		topOffset: -50
	});

	//People Filter
	peopleFilter($(".filter-btn.active").attr("data-target"))
	$(".filter-btn").click(function(){
		if ($(this).hasClass("active")) {
			return;
		}
		peopleFilter($(this).attr("data-target"))
	})
	function peopleFilter(target){
		$(".filter-btn").removeClass("active");
		$(".filter-btn[data-target='"+target+"']").addClass("active");
		$(".people-item").hide();
		$(".people-item[data-category='"+target+"']").fadeIn();
	}

	// Gallery Popup
	const wHeight = $(window).height();
	$(".gallery-popup .gp-img").css("max-height", wHeight + "px");

	let itemIndex = 0;
	const totalGalleryItems = $(".gallery-item").length;

	$(".gallery-item").click(function(){
		itemIndex = $(this).index();
		$(".gallery-popup").addClass("open");
		$(".gallery-popup .gp-img").hide();
		gpSlideShow();
	})

	$(".gp-controls .next").click(function(){
		if (itemIndex == totalGalleryItems-1){
			itemIndex = 0;
		}
		else{
			itemIndex++;
		}
		$(".gallery-popup .gp-img").fadeOut(function(){
			gpSlideShow();
		})
	})

	$(".gp-controls .prev").click(function(){
		if (itemIndex == 0){
			itemIndex = totalGalleryItems-1;
		}
		else{
			itemIndex--;
		}
		$(".gallery-popup .gp-img").fadeOut(function(){
			gpSlideShow();
		})
	})

	function gpSlideShow(){
		const imgSrc = $(".gallery-item").eq(itemIndex).find("img").attr("data-large");
		$(".gallery-popup .gp-img").fadeIn().attr("src",imgSrc);
		$(".gp-counter").text((itemIndex+1) +"/"+ totalGalleryItems);
	}

	// Close Gallery Popup
	$(".gp-close").click(function(){
		$(".gallery-popup").removeClass("open");
	})

	// Hide Gallery Popup when clicked outside of gp-container
	$(".gallery-popup").click(function(){
		if ($(event.target).hasClass("open")) {
			$(".gallery-popup").removeClass("open");
		}
	})

})