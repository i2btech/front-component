"use strict";

/**
Opciones para inicializar:
{
	open:    '#id',     // Identificador el elemento al para abrir
	time:    800, 			// Tiempo efecto slide contenido
	active:  'selected' // Class para agrear al elemento actual y el elemento a abrir
}

Opciones por data atributo html:
<button data-open="#id" data-close=".close, .search" overlay=".overlay" active="selected"></button>
**/

const component = {
	iCollapses:  Vue.component('i-collapses', {
		template: `
			<div class="collapse">
				<slot />
			</div>
		`,
		data() {
			return {
				Collapse: {
					count: 0,
					active: null
				}
			};
		},
		provide() {
			return { Collapse: this.Collapse }
		}
	}),

	iCollapse:  Vue.component('i-collapse', {
		template: `
			<div class="collapse__item">
				<h3 :class="['collapse__title', { 'collapse__title--active': isActive }]" @click="onOpen">{{ title }}</h3>
				<div :class="['collapse__content', { 'collapse__content--active': isActive }]">
					<slot />
				</div>
			</div>
		`,
		props: {
			title: { required: true }
		},
		inject: ["Collapse"],
		data() {
			return {
				index: null
			};
		},
		computed: {
			isActive() {
				return this.index == this.Collapse.active
			}
		},
		methods: {
			onOpen() {
				if (this.isActive) {
					this.Collapse.active = null
				} else {
					this.Collapse.active = this.index
				}
			}/*,
			start(el) {
				el.style.height = el.scrollHeight + "px"
			},
			end(el) {
				el.style.height = ""
			}*/
		},
		created() {
			this.index = this.Collapse.count++
		}
	})
}

export {
	component
}
