; (function () {
	'use strict'


	class Renderer {
		constructor(args = {}) {
			this.canvas = document.createElement('canvas')
			this.context = this.canvas.getContext('2d')

			// Если аргументы будут отсутствовать, то по умолчанию будут значения 50
			this.background = args.background || 'black'
			this.canvas.width = args.width || 50
			this.canvas.height = args.height || 50
			this.update = args.update || (() => { })

			// Экземпляр контейнера
			this.stage = new GameEngine.Container()

			// Выполнение функции  при первой возможности, , а не с заданным интервалом. 
			// Обычно примерно 60 раз в секунду. Зависит от частоты экрана 
			requestAnimationFrame(timestamp => this.tick(timestamp))
		}

		//
		get displayObjects() {
			return _getDisplayObjects(this.stage)
			function _getDisplayObjects(container, result = []) {
				for (const displayObject of container.displayObjects) {
					if (displayObject instanceof GameEngine.Container) {
						_getDisplayObjects(displayObject, result)
					}

					else {
						result.push(displayObject)
					}
				}
				return result
			}
		}



		// вызывается при каждом обновлении фрейма 
		tick(timestamp) {

			this.update(timestamp) // вызываем метод обновления и передаем ему время (скорость отрисовки - частоту обновления)
			this.clear()
			this.render()
			requestAnimationFrame(timestamp => this.tick(timestamp))
		}


		render(callback) {
			this.stage.draw(this.canvas, this.context)
		}

		// Очищение поля canvas
		clear() {
			this.context.fillStyle = this.background
			this.context.beginPath()
			this.context.rect(0, 0, this.canvas.width, this.canvas.height)
			this.context.fill()


		}
	}





	// Создаем глобальный объект GameEngine
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Renderer = Renderer;


})();