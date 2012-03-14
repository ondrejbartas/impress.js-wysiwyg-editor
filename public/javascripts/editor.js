$(document).ready(function(){	

	function move_position_x(object, value) {
		$(object).attr('data-x', parseInt($(object).attr('data-x')) - value);
		$(object).css('transform', $(object).css('transform').replace(/translate3d\([a-z0-9\s,.-]*\)/,'')+ 'translate3d('+$(object).attr('data-x')+'px,'+$(object).attr('data-y')+'px,'+$(object).attr('data-z')+'px)');
	}
	function move_position_y(object, value) {
		$(object).attr('data-y', parseInt($(object).attr('data-y')) - value);
		$(object).css('transform', $(object).css('transform').replace(/translate3d\([a-z0-9\s,.-]*\)/,'')+ 'translate3d('+$(object).attr('data-x')+'px,'+$(object).attr('data-y')+'px,'+$(object).attr('data-z')+'px)');
	}
	function move_position_z(object, value) {
		$(object).attr('data-z', parseInt($(object).attr('data-z')) - value);
		$(object).css('transform', $(object).css('transform').replace(/translate3d\([a-z0-9\s,.-]*\)/,'')+ 'translate3d('+$(object).attr('data-x')+'px,'+$(object).attr('data-y')+'px,'+$(object).attr('data-z')+'px)');
	}

	
	function set_position_x(object, value) {
		$(object).attr('data-x', value);
		$(object).css('transform', 'translate('+$(object).attr('data-x')+'px,'+$(object).attr('data-y')+'px)');
	}

	function set_position_y(object, value) {
		$(object).attr('data-y', value);
		$(object).css('transform', 'translate('+$(object).attr('data-x')+'px,'+$(object).attr('data-y')+'px)');
	}
	
	function set_position(object) {
		set_position_x(object,$(object).css('left'));
		set_position_y(object,$(object).css('top'));
	}
		
	var mouse_down = false;
	var hovered_object_x = 0;
	var hovered_object_y = 0;
	var hovered_object = undefined;
	$('.step').hover(
		function(){ hovered_object = this; },
		function(){ if(mouse_down == false) { hovered_object = undefined; }} )
	$(window).mousedown(function(){mouse_down = true});
	$(window).mouseup(function(){mouse_down = false});
	$(window).mousemove(function(event){
		dif_x = hovered_object_x - event.clientX;
		dif_y = hovered_object_y - event.clientY;
		hovered_object_x = event.clientX;
		hovered_object_y = event.clientY;
		if(mouse_down == true && hovered_object != undefined) {
			move_position_x(hovered_object, dif_x/$('#zoom').attr('zoom'));
			move_position_y(hovered_object, dif_y/$('#zoom').attr('zoom'));
		}else if(mouse_down == true) {
			move_position_x($('#zoom'), dif_x/$('#zoom').attr('zoom'));
			move_position_y($('#zoom'), dif_y/$('#zoom').attr('zoom'));
		}
	});
		
	$('#zoom').attr('zoom', 1);
	$('#zoom').attr('data-x', 0);
	$('#zoom').attr('data-y', 0);
	$('#zoom').attr('rotation_x', 0);
	$('#zoom').attr('rotation_y', 0);
	$('#zoom').attr('rotation_z', 0);
	$('.zoom-in').click(function(){
		zoom = $('#zoom').attr('zoom')*1.5;
		$('#zoom').attr('zoom', zoom);
		$('#zoom').css('transform', $('#zoom').css('transform').replace(/scale\([a-z0-9\s,.-]*\)/,'')+ 'scale('+zoom+')');
	})
	$('.zoom-out').click(function(){
		zoom = $('#zoom').attr('zoom')/1.5;
		$('#zoom').attr('zoom', zoom);
		$('#zoom').css('transform', $('#zoom').css('transform').replace(/scale\([a-z0-9\s,.-]*\)/,'')+ ' scale('+zoom+')');
	})

	function rotate_zoom(direction){
		rotation_x = parseInt($('#zoom').attr('rotation_x'));
		rotation_y = parseInt($('#zoom').attr('rotation_y'));
		rotation_z = parseInt($('#zoom').attr('rotation_z'));
		if(direction == "top") { rotation_x += 20}
		else if (direction == "bottom") { rotation_x -= 20}
		else if (direction == "left") { rotation_y += 20}
		else if (direction == "right") { rotation_y -= 20}
		$('#zoom').attr('rotation_x', rotation_x)
		$('#zoom').attr('rotation_y', rotation_y)
		$('#zoom').attr('rotation_z', rotation_z)
		$('#zoom').css('transform', $('#zoom').css('transform').replace(/rotateX\([a-z0-9\s,.-]*\)/,'')+ ' rotateX('+rotation_x+'deg)');
		$('#zoom').css('transform', $('#zoom').css('transform').replace(/rotateY\([a-z0-9\s,.-]*\)/,'')+ ' rotateY('+rotation_y+'deg)');
	}

	$('.home').click(function(){
		$('#zoom').attr('rotation_y', "-20");
		$('#zoom').attr('data-x', 0);
		$('#zoom').attr('data-y', 0);
		$('#zoom').attr('zoom', 1);
		$('#zoom').css('transform', $('#zoom').css('transform').replace(/scale\([a-z0-9\s,.-]*\)/,'')+ 'scale('+1+')');
		rotate_zoom("left");
		move_position_y($('#zoom'), 0);
	})
	$('.rotate-rigth').click(function(){rotate_zoom("right")})
	$('.rotate-left').click(function(){rotate_zoom("left")})
	$('.rotate-top').click(function(){rotate_zoom("top")})
	$('.rotate-bottom').click(function(){rotate_zoom("bottom")})


	$('#zoom').css('position', 'absolute');
	$('#zoom').css('-webkit-transform-style','preserve-3d');
	$('.step').css('position', 'absolute');
	$('.step').css('-webkit-transform-style','preserve-3d');
})