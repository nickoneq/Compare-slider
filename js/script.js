function imageComparison(sel) {
	let comparison = $(sel)
		.addClass('image-comparison')
		.prepend('<div class="image-comparison__before"></div>')
		.append('<button class="image-comparison__slider"></button>')

	let images = comparison
		.find('img')
		.addClass('image-comparison__image')
		.css('max-width', comparison.width())

	let before = comparison
		.find('.image-comparison__before')
		.append(images.eq(0))

	comparison
		.find('.image-comparison__slider')
		.on('dragstart', () => false)
		.on('mousedown', function (e) {
			let slider = $(this)
			let doc = $(document).on('mousemove', (e) => {
				let offset = e.pageX - comparison.position().left
				let width = comparison.width()

				if (offset < 0) { offset = 0}
				if (offset > width) { offset = width}

				slider.css('left', offset + 'px')
				before.css('width', offset + 'px')
			})

			doc.on('mouseup', () => doc.off('mousemove'))
		})
		.on('keydown', function(e) {
			let slider = $(this)
			let offset = parseInt(slider.css('left'))
			let width  = comparison.width()

			if (e.keyCode == 37) {offset = offset - 10}
			if (e.keyCode == 39) {offset = offset + 10}
			if (offset < 0) {offset = 0}
			if (offset > width) {offset = width}

			slider.css('left', offset + 'px')
			before.css('width', offset + 'px')
		})
}

imageComparison('#image-comparison')