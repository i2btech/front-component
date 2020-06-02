"use strict";

/**
  Opciones para inicializar:
  {
    open:    'none',  // none: No seleccionar item, first: Seleccionar primer item
    active:  'active' // Class para seleccionar al elemento actual
  }

  Opciones por data atributo html:
  <a class="tab-link" data-open="#id" data-group="tab-cont"></a>
  **/

const component = {
	iTabs: Vue.component('i-tabs', {
		template: `
			<div :class="[align == 'vertical'? 'tabs-vtl': 'tabs', 'bd clear']">
				<div class="tabs__link">
					<div v-for="tab in tabs" class="tab__link" :class="{ 'tab--active': tab.isActive }" @click="selectTab(tab)">{{ tab.title }}</div>
				</div>
				<slot />
			</div>
		`,
		props: {
			align: String
		},
		data() {
			return {
				tabs: []
			}
		},
		created() {
			this.tabs = this.$children
		},
    methods: {
			selectTab(tabSel) {
				this.tabs.forEach(tab => tab.isActive = (tab.title == tabSel.title))
			}
    }
	}),

	iTab: Vue.component('i-tab', {
		template: `
			<div class="tab__content" :class="{ 'tab--active': isActive }">
				<slot />
			</div>
		`,
		props: {
			title: { required: true },
			selected: { default: false }
		},
		data() {
			return {
				isActive: false
			};
		},
		computed: {
			/* href() {
				return '#' + this.title.toLowerCase().replace(/ /g, '-')
			}, */
		},
		mounted() {
			this.isActive = this.selected
		}
	})
};

export {
	component
};
