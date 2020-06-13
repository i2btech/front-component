//import hljs from 'highlight.js/lib/core';
//import 'highlight.js/styles/github.css';

export default { title: '2 Layout' };

//import '../../../dev/assets/css/main.css';
import ContainerHtml from './container.html';

export const Container = () => ContainerHtml;
Container.story = { name: 'Contenedor' }

export const Grid = () => `
	<div class="p-30">
		<h2 class="text fz-28">Grid</h2>

		<p class="mt-20">El sistema de grilla utiliza una serie de contenedores, filas y columnas para diseñar y alinear el contenido. Está construido con flexbox y es totalmente receptivo. A continuación se muestra un ejemplo y una mirada en profundidad sobre cómo se une la cuadrícula:</p>

		<table class="table-all mt-20">
			<thead>
				<tr>
					<th></th>
					<th>Extra small < 640px</th>
					<th>Small ≥ 640px</th>
					<th>Medium ≥ 768px</th>
					<th>Large ≥ 1024px</th>
					<th>Extra large ≥ 1280px</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Max container width</th>
					<td>None (auto)</td>
					<td>640px</td>
					<td>768px</td>
					<td>1024px</td>
					<td>1280px</td>
				</tr>
				<tr>
					<th>Class prefix</th>
					<td class="text-default">.col-</td>
					<td class="text-default">.sm:col-</td>
					<td class="text-default">.md:col-</td>
					<td class="text-default">.lg:col-</td>
					<td class="text-default">.xl:col-</td>
				</tr>
				<tr>
					<th># of columns</th>
					<td colspan="5">12</td>
				</tr>
				<tr>
					<th>Gutter width</th>
					<td colspan="5">20px (10px a cada lado de una columna)</td>
				</tr>
				<tr>
					<th>Nestable</th>
					<td colspan="5">Si</td>
				</tr>
				<tr>
					<th>Column ordering</th>
					<td colspan="5">Si</td>
				</tr>
			</tbody>
		</table>

		<div class="container-fluid mt-20">
			<div class="row text-white">
				<div class="col-2 text-center bg-default p-10"><span class="fz-md">.col-2</span></div>
				<div class="col-2 text-center bg-primary p-10"><span class="fz-md">.col-2</span></div>
				<div class="col-2 text-center bg-default p-10"><span class="fz-md">.col-2</span></div>
				<div class="col-2 text-center bg-primary p-10"><span class="fz-md">.col-2</span></div>
				<div class="col-2 text-center bg-default p-10"><span class="fz-md">.col-2</span></div>
				<div class="col-2 text-center bg-primary p-10"><span class="fz-md">.col-2</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="text-center bg-default p-10 sm:col-3"><span class="fz-md">.sm:col-3</span></div>
				<div class="text-center bg-primary p-10 sm:col-3"><span class="fz-md">.sm:col-3</span></div>
				<div class="text-center bg-default p-10 sm:col-3"><span class="fz-md">.sm:col-3</span></div>
				<div class="text-center bg-primary p-10 sm:col-3"><span class="fz-md">.sm:col-3</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="text-center bg-default p-10 md:col-4"><span class="fz-md">.md:col-4</span></div>
				<div class="text-center bg-primary p-10 md:col-4"><span class="fz-md">.md:col-4</span></div>
				<div class="text-center bg-default p-10 md:col-4"><span class="fz-md">.md:col-4</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="text-center bg-default p-10 lg:col-6"><span class="fz-md">.lg:col-6</span></div>
				<div class="text-center bg-primary p-10 lg:col-6"><span class="fz-md">.lg:col-6</span></div>
			</div>
			<div class="row p-10 mt-20 text-white">
				<div class="text-center sm:col-3"><span class="fz-md p-10 d-block bg-default">.sm:col-3</span></div>
				<div class="text-center sm:col-3"><span class="fz-md p-10 d-block bg-primary">.sm:col-3</span></div>
				<div class="text-center sm:col-3"><span class="fz-md p-10 d-block bg-default">.sm:col-3</span></div>
				<div class="text-center sm:col-3"><span class="fz-md p-10 d-block bg-primary">.sm:col-3</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="col-8 offset-2 text-center bg-default p-10"><span class="fz-md">.col-8 .offset-2</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="col-7 mx-auto text-center bg-default p-10"><span class="fz-md">.col-7 .mx-auto</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="text-center bg-default p-10 md:col-5 md:offset-1"><span class="fz-md">.md:col-5 .md:offset-1</span></div>
				<div class="text-center bg-default p-10 md:col-5 md:offset-1"><span class="fz-md">.col-md-5 .md:offset-1</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="col-auto text-center bg-default p-10" style="width:300px;"><span class="fz-md">.col-auto width
						300px</span></div>
				<div class="col text-center bg-primary p-10"><span class="fz-md">.col</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="col-auto text-center bg-default p-10" style="width:200px;"><span class="fz-md">col-auto width
						200px</span></div>
				<div class="col text-center bg-primary p-10"><span class="fz-md">.col</span></div>
				<div class="col-auto text-center bg-default p-10" style="width:200px;"><span class="fz-md">col-auto width
						200px</span></div>
			</div>
			<div class="row mt-20 text-white">
				<div class="col-auto text-center bg-default p-10" style="width:20%;"><span class="fz-md">.col-auto width 20%</span>
				</div>
				<div class="col text-center bg-primary p-10"><span class="fz-md">.col</span></div>
				<div class="col-auto text-center bg-default p-10" style="width:30%;"><span class="fz-md">.col-auto width 30%</span>
				</div>
			</div>
			<div class="ctr">
				<div class="row mt-20 text-white">
					<div class="col text-center bg-primary p-10"><span class="fz-md">.col</span></div>
					<div class="col-auto text-center bg-default p-10" style="width:300px;"><span class="fz-md">.col-auto width
							300px</span></div>
				</div>
			</div>
		</div>
	</div>
`;
Grid.story = { name: 'Grilla' }
/*document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('pre code').forEach((block) => {
		console.log('pre code', block, hljs);
		hljs.highlightBlock(block);
	});
});*/
