$(document).ready(function () {
    hide_show_checkbox()
})

function hide_show_checkbox() {
    // hide
    let tgg_btn = '<div class="more">Xem thêm &darr;</div>';
    let check_box_ctn = $('.filter-box-colection > .checkboxes');
    for (let i = 0; i < check_box_ctn.length; i++) {
        var ele = check_box_ctn[i];
        // console.log(ele.querySelectorAll(':nth-child(3)').style.display =  'none');
        let checkbox_child_length = ele.querySelectorAll('*').length;
        if (checkbox_child_length > 7) {
            for (let j = 9; j <= checkbox_child_length ; j+=2) {                
                ele.querySelector(':nth-child('+(j) +')').style.display =  'none';
            }
            ele.innerHTML += tgg_btn;
        }
    }

    // show
    $('.filter-box-colection > .checkboxes > .more').click(function (e) { 
        e.target.parentElement.children[e.target.parentElement.children.length - 1] = null
        
        let box_ele_child = e.target.parentElement.children;
        
        for (let i = 9; i < box_ele_child.length; i+=2) {
                e.target.parentElement.querySelector(':nth-child('+(i) +')').style.display =  'block';
            }
        
        e.target.parentElement.removeChild(e.target.parentElement.lastChild);
    });
}