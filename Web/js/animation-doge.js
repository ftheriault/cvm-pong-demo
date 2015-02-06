function dogeAnimation() {
	$("#doge-ma").fadeIn("normal", function() {
		setTimeout(function () {
			$("#doge-face").fadeIn("fast", function() {
				setTimeout(function () {
					$("#doge-much").fadeIn(150, function () {
						setTimeout(function () {
							$("#doge-wow").fadeIn(150, function () {
								setTimeout(function () {
									$("#doge-very").fadeIn(150, function () {
										setTimeout(function () {
											$("#doge-such").fadeIn(150, function () {
												setTimeout(function () {
													$("#doge-question").fadeIn(150);
												}, 500);
											});
										}, 500);
									});
								}, 500);
							});
						}, 500);			
					});
				}, 2000);
			});
		}, 4000);		
	});
}