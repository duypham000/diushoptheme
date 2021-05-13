function go_to_link() {
	let eles = document.getElementsByClassName('goto')
	for (let i = 0; i < eles.length; i++) {
		const ele = eles[i]
		ele.addEventListener('click', (e) => {
			for (let i = 0; i < e.path.length; i++) {
				let link = e.path[i].getAttribute('goto')
				if (link) {
					window.location.href = link
					break
				}
			}
		})
	}
}

function show_suggest_search() {
	let search_input = $('.search > input')
	let target = $('.search > .suggest-ctn')

	search_input[0].addEventListener('focus', (event) => {
		target[0].classList.add('animate')
	})

	search_input[0].addEventListener('blur', (event) => {
		target[0].classList.remove('animate')
	})
}
function pagination() {
	/* 
		this javascript is only to change the "actpage" attribut on the .cdp div
	*/

	var paginationPage = parseInt($('.cdp').attr('actpage'), 10)
	$('.cdp_i').on('click', function () {
		var go = $(this).attr('href').replace('#!', '')
		if (go === '+1') {
			paginationPage++
		} else if (go === '-1') {
			paginationPage--
		} else {
			paginationPage = parseInt(go, 10)
		}
		$('.cdp').attr('actpage', paginationPage)
	})
}

status_btn_trgg = false
function minimenuTrigger() {
	// click
	let minimenu = $('.miniMenu')
	let cl = $('.overlay')
	let btntrgg = $('.miniMenuIcon')

	btntrgg[0].addEventListener('click', () => {
		if (status_btn_trgg) {
			cl[0].classList.remove('animate')
			minimenu[0].classList.remove('animate')
			status_btn_trgg = !status_btn_trgg
		} else {
			cl[0].classList.add('animate')
			minimenu[0].classList.add('animate')
			status_btn_trgg = !status_btn_trgg
		}
	})

	cl[0].addEventListener('click', () => {
		cl[0].classList.remove('animate')
		minimenu[0].classList.remove('animate')
		status_btn_trgg = !status_btn_trgg
	})

	// hover
	// $('.miniMenu>.item').hover(
	// 	function (e, er) {
	// 		// over
	// 		console.log(e.currentTarget)
	// 	},
	// 	function (e, er) {
	// 		// out
	// 		console.log(e.currentTarget)
	// 	},
	// )
}
$(document).ready(function () {
	go_to_link()
	show_suggest_search()
	pagination()
	minimenuTrigger()
})
