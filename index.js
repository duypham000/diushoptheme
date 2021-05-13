function hover_on_card() {
	// on hover on card
	let eles = document.querySelectorAll('.product-card')
	for (let i = 0; i < eles.length; i++) {
		let e = eles[i]
		e.addEventListener('mouseover', (ele, ev) => {
			let element = ele.path[1]
			element.classList.add('animate')
		})
		e.addEventListener('mouseout', (ele, ev) => {
			let element = ele.path[1]
			element.classList.remove('animate')
		})
	}
}

$(document).ready(function () {
	hover_on_card()
	$('.slide-show').bxSlider({
		auto: true,
		stopAutoOnClick: true,
		randomStart: true,
		hideControlOnEnd: true,
	})
})
