; (function () {
	'use strict'

	class Loader {
		constructor() {
			// Очередь загрузок
			this.loadOrder = {
				images: [],
				jsons: []
			}
			// Загруженное
			this.resources = {
				images: [],
				jsons: []
			}
		}
		// Добавление изображений в очередь
		addImage(name, src) {
			this.loadOrder.images.push({ name, src })
		}
		// Добавление json данных в очередь
		addJson(name, address) {
			this.loadOrder.jsons.push({ name, address })
		}

		// Получаем изображение по имени
		getImage(name) {
			return this.resources.images[name]
		}
		// Получаем Json по имени
		getJson(name) {
			return this.resources.jsons[name]
		}

		// Загрузка json и картинок
		load(callBack) {
			const promises = []

			for (const imageData of this.loadOrder.images) {
				const { name, src } = imageData;
				const promise = Loader
					.loadImage(src) //loadImage возвращает промис (описан ниже)
					.then(image => { // Когда изображение загружено, оно записывается в resources
						this.resources.images[name] = image;
						// Удаление изображения из очереди loadOrder.images
						if (this.loadOrder.images.includes(imageData)) {
							const index = this.loadOrder.images.indexOf(imageData)
							this.loadOrder.images.splice(index, 1)
						}
					});
				promises.push(promise);

				for (const jsonData of this.loadOrder.jsons) {
					const { name, address } = jsonData;
					const promise = Loader
						.loadJson(address) //loadImage возвращает промис (описан ниже)
						.then(image => {
							// когда записывается индекс в виде строки, записывается свойство.
							// array.a = 'foo'; array['a'] = 'foo'; - записи эквавалентны
							// Эти свойства не являются частью хранилища данных массива, поэтому массив не увеличивается
							this.resources.jsons[name] = image;

							if (this.loadOrder.jsons.includes(jsonData)) {
								const index = this.loadOrder.images.indexOf(jsonData)
								this.loadOrder.jsons.splice(index, 1)
							}
						});
					promises.push(promise);
				}
			}
			Promise.all(promises).then(callBack);
		}
		// Статические метод загрузки картинок
		static loadImage(src) {
			return new Promise((resolve, reject) => {
				// С помощью try catch отлавливаем ошибку
				try {
					const image = new Image //Конструктор элемента Image
					// Когда вызывается resolve, промис считается выполненным
					image.onload = () => resolve(image) // Сработает, когда изображение полностью загружено
					image.src = src
				}
				catch (err) {
					reject(err)
				}
			})
		}

		// Статические метод загрузки json
		static loadJson(address) {
			return new Promise(((resolve, reject) => {
				fetch(address)
					.then(result => result.json()) // then подписывается на результат промиса
					.then(result => resolve(result))
					.catch(err => reject(err)) // catch подписывается на ошибку промиса

			}))
		}
	}

	// Создаем глобальный объект GameEngine
	window.GameEngine = window.GameEngine || {}
	window.GameEngine.Loader = Loader;


})();