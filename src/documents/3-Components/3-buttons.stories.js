export default { title: '3 Components' };

export const Button = () => `
	<div class="p-30">
		<h2 class="text fz-28">Botones</h2>

		<p class="mt-20">Incluye varios estilos de botones predefinidos, cada uno con su propio propósito semántico, con algunos extras para mayor control.</p>


		<h3 class="text fz-24 mt-30">Colores</h3>

		<p class="mt-20">Agregado <b>bg-default</b>, <b>bg-primary</b>, <b>bg-secondary</b>, <b>bg-danger</b>, <b>bg-black</b>, <b>disabled</b></p>

		<div class="mt-15 text-white">
			<button class="btn bg-default">Defecto</button>
			<button class="btn bg-primary ml-5">Primario</button>
			<button class="btn bg-secondary ml-5">Secundario</button>
			<button class="btn bg-danger ml-5">Danger</button>
			<button class="btn bg-black ml-5">Negro</button>
			<button class="btn bg-black ml-5" disabled="">Deshabilitado</button>
		</div>

		<h3 class="text fz-24 mt-30">Tamaños</h3>

		<p class="mt-20">Agregado <b>btn--sm</b>, <b>btn--md</b>, <b>btn--lg</b>, <b>btn--xl</b></p>

		<div class="mt-15 text-white">
			<button class="btn bg-black btn--sm">Pequeño</button>
			<button class="btn bg-black ml-5">Defecto</button>
			<button class="btn bg-black btn--md ml-5">Medio</button>
			<button class="btn bg-black btn--lg ml-5">Grande</button>
			<button class="btn bg-black btn--xlg ml-5">Extra grande</button>
		</div>
	</div>
`;

/*export const withEmoji = () => {
	const button = document.createElement('button');
	button.classList = ['btn bg-primary'];
  button.innerText = '😀 😎 👍 💯';
  return button;
};*/
