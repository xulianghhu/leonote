/**
 * Created by Leo on 14-11-5.
 */
$(function () {
	var front = document.getElementById('front')
			, back_content = document.getElementById('back').innerHTML
			, back;

	var ajax = new Ajax();

	$('#register').click(function () {
		if (navigator.appName.indexOf("Microsoft") == -1) {
			var timeout = 400;
			back = flippant.flip(front, back_content, 'card', 'login-bg-back', timeout);

			back.close();
			window.setTimeout(function () {
				$('#front').hide();
				$('#back').show();
				$('#loginEmail').popover('hide');
				$('#loginPassword').popover('hide');
			}, timeout);
		} else {
			$('#front').hide();
			$('#back').show();
		}
	});

	$('#loginEmail').blur(function () {
		validateLoginEmail();
	});
	$('#registerEmail').blur(function () {
		validateRegisterEmail();
	});
	$('#registerUsername').blur(function () {
		validateRegisterUsername();
	});
	$('#registerPassword').blur(function () {
		validateRegisterPassword();
	});

	$('#loginSubmit').click(function () {
		if (validateLogin()) {
			var data = {
				email: $('#loginEmail').val(),
				password: $('#loginPassword').val()
			};
			ajax.post('/signin', data, function (result) {
				if (result.code == 0) {
					location.href = result.message;
				} else {
					$('#loginError').text(result.message);
				}
			});
		}
		return false;
	});

	$('#registerSubmit').click(function () {
		if (validateRegister()) {
			var data = {
				email: $('#registerEmail').val(),
				username: $('#registerUsername').val(),
				password: $('#registerPassword').val()
			};
			ajax.post('/signup', data, function (result) {
				if (result.code == 0) {
					location.href = result.url || '/';
				} else {
					$('#registerError').text(result.message);
				}
			});
		}
		return false;
	});
});

function validateLoginEmail() {
	var reg = /\w@\w*\.\w/;
	var email = $('#loginEmail').val();
	if (email == null || email == '' || !reg.test(email)) {
		$('#loginEmail').popover('show');
		return false;
	}
	return true;
}

function validateLoginPassword() {
	var password = $('#loginPassword').val();
	if (password == null || password == '') {
		$('#loginPassword').popover('show');
		return false;
	}
	return true;
}

/**
 * 登录验证
 * @returns {*}
 */
function validateLogin() {
	return validateLoginEmail() && validateLoginPassword();
}

function validateRegisterEmail() {
	var reg = /\w@\w*\.\w/;
	var email = $('#registerEmail').val();
	if (email == null || email == '' || !reg.test(email)) {
		$('#registerEmail').popover('show');
		return false;
	}
	return true;
}

function validateRegisterUsername() {
	var username = $('#registerUsername').val();
	if (username == null || username == '') {
		$('#registerUsername').popover('show');
		return false;
	}
	return true;
}

function validateRegisterPassword() {
	var password = $('#registerPassword').val();
	if (password == null || password == '') {
		$('#registerPassword').popover('show');
		return false;
	}
	return true;
}

function validateRegisterPasswordAgain() {
	var password = $('#registerPassword').val();
	var passwordAgain = $('#registerPasswordAgain').val();

	if (passwordAgain == null || passwordAgain == '') {
		$('#registerPasswordAgain').popover('show');
		return false;
	} else if (passwordAgain != password) {
		$('#registerPasswordAgain').attr("data-content", "<span style='color:red'>两次输入的密码不一致</span>");
		$('#registerPasswordAgain').popover('show');
		return false;
	}
	return true;
}

/**
 * 注册验证
 * @returns {*}
 */
function validateRegister() {
	return validateRegisterEmail()
			&& validateRegisterUsername()
			&& validateRegisterPassword()
			&& validateRegisterPasswordAgain();
}