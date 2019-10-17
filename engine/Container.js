; (function () {
	'use strict'

	// Класс, который хранит в себе список изображений, который нужео отрисовать
	class Container {
		constructor() {
			// Объекты, которые нужно будет рисовать
			this.displayObjects = []
		}


		// Умеет добоавлять объект
		add(displayObject) {
			if (!this.displayObjects.includes(displayObject)) {
				this.displayObjects.push(displayObject)
			}
		}
		remove() { }

		// Вызываем у каждого объекта метод draw
		draw(canvas, context) {
			for (const displayObject of this.displayObjects) {
				displayObject.draw(canvas, context)
			}

		}
	}

	// Создаем глобальный объект GameEngine
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Container = Container;
})();