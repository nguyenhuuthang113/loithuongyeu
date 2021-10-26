$(document).ready(function () {
	$('.form-dangnhap').submit(function (e) { 
		e.preventDefault();
		var noidung = $('textarea[name="noidung"]').val();
		var flag = 0;
		var erro;
		if(noidung.length < 1){
			erro = 'Hãy gửi 1 lời yêu thương với người mình thương nha. <br> Ví dụ: Anh yêu em 💖💖💖';
			flag= 1;
		}else if(noidung.length > 200 ){
			erro = 'Hãy gửi 1 lời yêu thương ngắn gọn đầy ý nghĩa với 200 ký tự bạn nhé 💖💖.';
			flag= 1;
		}

		if(flag == 1){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				html: erro
			})
		}else{
			$.ajax({
				url: 'ajax.php',
				type: 'POST',
				method: 'POST',
				data: {noidung: noidung},
				beforeSend: function(){
					$('.btn-send').attr('disabled', 'true').html('Loading...');
				}
			})
			.done(function(event) {
				$('.btn-send').removeAttr('disabled').html('Lưu lại');
				var obj = JSON.parse(event);
				if(obj.status == 99 ){
					Swal.fire({
						icon: 'success',
						title: 'Thành công...',
						html: obj.messages
					})
				}else{

					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						html: obj.messages
					})
				}

			})
			.fail(function() {
				$('.btn-send').removeAttr('disabled').html('Lưu lại');

				console.log("error");
			});
			
		}


	});
});

function myFunction() {
	/* Get the text field */
	var copyText = document.getElementById("noidung");

	/* Copy the text inside the text field */
	navigator.clipboard.writeText(copyText.innerHTML);

	/* Alert the copied text */
	Swal.fire({
		icon: 'success',
		title: 'Thông báo !',
		html: 'Copy link thành công ! Hãy gửi ngay cho người bạn thương nha 😍'
	});
}
