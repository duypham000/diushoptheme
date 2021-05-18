$(document).ready(function () {
	dropdown_selectBox()
	set_qtt()
	cmt_md_show()		
	// get_style()
	suggest_btn_event()
})

var current_trans_suggest_box = 0;
function suggest_btn_event() {
	$('.suggest-box').hover(function () {
			// over
			$('.pag-btn').addClass('animate')
		}, function () {
			// out
			$('.pag-btn').removeClass('animate')
		}
	);

	$('.pag-btn').click(function (e) { 
		console.log(e.target.classList[1]);
		if (e.target.classList[1] == 'arr-next' && current_trans_suggest_box != -4764) {
			current_trans_suggest_box -= 1191;
		}else if (e.target.classList[1] == 'arr-pre' && current_trans_suggest_box != 0) {			
			current_trans_suggest_box += 1191;
		}

		if (current_trans_suggest_box == 0) 
			$('.arr-pre').css('display', 'none')
		else
		$('.arr-pre').css('display', 'flex')

		if (current_trans_suggest_box == -4764) 
			$('.arr-next').css('display', 'none')
		else
		$('.arr-next').css('display', 'flex')

		$('.box-ctn').css('transform', 'translate('+ current_trans_suggest_box +  'px, 0)')
	});
}

var cur_target_md_id = null;

function cmt_md_show() {
	// hide
	$('.show-media > .md-show > .md-overlay').click((e) => { 
		$(".show-media").removeClass("animate")
		$('.md-ctn').html(" ");
		list_md = []
	});

	let list_md = []
	// show
	$(".cmt-md-ele > *").click((e)=>{
		let ele = e.currentTarget
		let father;
		if (ele.getAttribute("type") == "vid") {
			father = e.target.offsetParent;			
		}
		else{
			father = e.target.offsetParent.offsetParent;
		}

		let list = father.children[0].children;
		for (let i = 0; i < list.length; i++) {
			let elee = list[i];
			let type = elee.children[0].attributes[0].nodeValue
			let url;
			if ( type == "img") {
				url = elee.children[0].attributes[1].nodeValue
			}else{
				url = elee.children[0].children[0].attributes[0].nodeValue
			}
			list_md.push([type, url])
		}

		for (let i = 0; i < list_md.length; i++) {
			let ele_current_src, ele_list_src;
			ele_list_src = list_md[i][1]
			if (ele.getAttribute("type") == "vid") {
				ele_current_src = e.target.children[0].attributes[0].nodeValue;
			}
			else{
				ele_current_src = e.target.attributes[1].nodeValue;
			}
			if (ele_current_src == ele_list_src) {
				cur_target_md_id = i
			}
		}
		create_md(ele.getAttribute("type") , (ele.getAttribute("type") == "img" ? ele.getAttribute("src") : ele.childNodes[1].getAttribute("src")));
	})

	// navigation for md
	
	$('.md-show > .nav-btn').click((e)=>{
		let nav_to = e.target.classList[1];
		if (nav_to == 'next') {
			cur_target_md_id < list_md.length - 1 ? cur_target_md_id++ : cur_target_md_id = list_md.length - 1
		}
		else (
			cur_target_md_id > 0 ? cur_target_md_id-- : cur_target_md_id = 0
		)
		create_md(list_md[cur_target_md_id][0] , list_md[cur_target_md_id][1]);	
	})
	
}

function create_md(type, link) {
	let ele_add;
	if (type == "img") {
		ele_add = '<img src="'+ link +'" alt="">'
	}

	if (type == "vid") {
		ele_add = '<video  controls> <source src=" ' + link + ' " > </video>'
	}

	$('.md-ctn').html(ele_add);
	$(".show-media").addClass("animate")
}

function dropdown_selectBox() {
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus()
		$(this).toggleClass('active')
		$(this).find('.dropdown-menu').slideToggle(300)
	})
	$('.dropdown').focusout(function () {
		$(this).removeClass('active')
		$(this).find('.dropdown-menu').slideUp(300)
	})
	$('.dropdown .dropdown-menu li').click(function () {
		$(this).parents('.dropdown').find('span').text($(this).text())
		$(this).parents('.dropdown').find('input').attr('value', $(this).attr('value'))
	})
	/*End Dropdown Menu*/

	$('.dropdown-menu li').click(function () {
		var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
			msg = '<span class="msg">Hidden input value: '
		$('.msg').html(msg + input + '</span>')

		let style = get_style()
		if (style.length != 0) {
			$(".btn-addToCart").removeClass("disabled");
		}
	})
}

function get_style() {
	let list = $('.dropdown > input')
	let style = []
	for (let i = 0; i < list.length; i++) {
		const ele = list[i]
		if (ele.attributes[2] == undefined) {
			style = []
			break
		}
		let val = ele.attributes[2].textContent
		style.push(val)
	}



	return style
}

function set_qtt(nav) {
	let q = $('.quantity > input').val()
	if (nav == 'in') {
		if (q >= 100) q = 100
		else q++
	}
	if (nav == 'de') {
		if (q <= 1) q = 1
		else q--
	}
	$('.quantity > input').val(q)
}
