import { data } from './data.js'

const sectionCenter = document.querySelector('.section-center')
const btnContainer = document.querySelector('.btn-container')

// initial date from menu
window.addEventListener('DOMContentLoaded', () => {
	displayMenuItems(data)
	displayMenuButtons()
})

function displayMenuItems(menuItems) {
	let displayMenu = menuItems.map(item => {
		return `<article class="menu-item">
          <img src=${item.img} alt=${item.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`
	})
	displayMenu = displayMenu.join('')
	sectionCenter.innerHTML = displayMenu
}

function displayMenuButtons() {
	const categories = data.reduce(
		function (values, items) {
			if (!values.includes(items.category)) {
				values.push(items.category)
			}
			return values
		},
		['all']
	)
	categoryBtns(categories)
}

function categoryBtns(categories) {
	const categoryBtns = categories
		.map(category => {
			return `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`
		})
		.join('')

	btnContainer.innerHTML = categoryBtns

	filterBtns()
}

function filterBtns() {
	const filterBtns = document.querySelectorAll('.filter-btn')
	filterBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			const category = e.currentTarget.dataset.id
			const menuCategory = data.filter(item => {
				if (item.category === category) {
					return item
				}
			})
			if (category === 'all') {
				displayMenuItems(data)
			} else {
				displayMenuItems(menuCategory)
			}
		})
	})
}
