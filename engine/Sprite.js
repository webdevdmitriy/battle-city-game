; (function () {
	'use strict'

	// Самая элементарное изображение в игровом движке
	// графический объект в компьютерной графике
	class Sprite {

		constructor(texture, args = {}) {
			// texture - то что загрузили с клиента (какое то изображение)
			this.texture = texture
			// frame - кусочек этого изображение, которое нужно отрисовать
			const frame = args.frame || {}
			// Создаем фрейм, который хотим отрисовать и присваиваем его значения
			this.frame = {
				// Координаты х и у изображение
				x: frame.x || 0,
				y: frame.y || 0,
				// ширина и высота отрисовываемого изображения
				width: frame.width || texture.width,
				height: frame.height || texture.height

			}
			//Присваиваем координаты данному экземпляру спрайта
			this.x = args.x || 0
			this.y = args.y || 0,

				// Якоря(анкор)
				this.anchorX = args.anchorX || 0
			this.anchorY = args.anchorY || 0,
				// Присваиваем ширину и высоту данному экземпляру спрайта, по умолчанию равна ширине и высоте фрейма
				this.width = args.width || this.frame.width
			this.height = args.width || this.frame.height

			if (args.scale !== undefined) {
				this.setScale(args.scale)
			}
		}
		setScale(value) {
			this.scaleX = value
			this.scaleY = value

		}

		// Абсолютные координаты. Верхняя левая точка изображения (начало отрисовки)
		get absoluteX() {
			return this.x - this.anchorX * this.width
		}
		set absoluteX(value) {
			this.x = value + this.anchorX * this.width
			return value
		}
		get absoluteY() {
			return this.y - this.anchorY * this.height

		}
		set absoluteY(value) {
			this.y = value + this.anchorY * this.height
			return value


		}

		// get - Вычисляямое налету свойство. Изменим ширину, сразу же измнеится scaleX
		// Обращаемся как к свойству объекта
		//sprite.ScaleX
		get scaleX() {
			return this.width / this.frame.width
		}
		// Когда устаналиваем значение
		set scaleX(value) {
			this.width = this.frame.width * value
			return value
		}
		get scaleY() {
			return this.height / this.frame.height
		}
		set scaleY(value) {
			this.height = this.frame.height * value
			return value
		}
		//Отрисовываем изображение
		draw(canvas, context) {
			context.drawImage(
				// Передаем картинку, которую нужно отрисовать
				this.texture,

				// Координаты участка изображения, которое нужно отобразить
				this.frame.x,
				this.frame.y,
				this.frame.width,
				this.frame.height,


				// Координаты, где нужно изобразить на канвасе
				this.absoluteX,
				this.absoluteY,
				this.width,
				this.height

			)
		}
	}

	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Sprite = Sprite

})();