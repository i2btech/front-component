//import hljs from 'highlight.js/lib/core';
//import 'highlight.js/styles/github.css';

export default { title: '2 Layout' };

import '../../../dev/assets/css/main.css';
import ContainerHtml from './2.1-container.html';

export const Container = () => ContainerHtml;

/*export const Container = () => `
	<div class="p-30">
		<pre>
			<code class="html">
				&#60;div class="message-success success message"&#62;
					&#60;div&#62;
						Esto es codigo de prueba
					&#60;/div&#62;
				&#60;/div&#62;
			</code>
		</pre>

		<div class="container p-20 bg-primary mt-20">
			<h2 class="text text-white">Container</h2>
		</div>

		<div class="container-fluid p-20 bg-default mt-30">
			<h2 class="text text-white">Container Fluid</h2>
		</div>
	</div>
`;*/

export const Grid = () => `
	<div class="p-30">
		<h2>Grid</h2>
		<div class="row mt-10 text-white">
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
			<div class="col-8 offset-2 text-center bg-default p-10"><span class="fz-md">.col-8</span></div>
		</div>
		<div class="row mt-20 text-white">
			<div class="col-7 mx-auto text-center bg-default p-10"><span class="fz-md">.col-7</span></div>
		</div>
		<div class="row mt-20 text-white">
			<div class="text-center bg-default p-10 md:col-5 md:offset-1"><span class="fz-md">.md:col-5</span></div>
			<div class="text-center bg-default p-10 md:col-5 md:offset-1"><span class="fz-md">.col-md-5</span></div>
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
`;

/*document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('pre code').forEach((block) => {
		console.log('pre code', block, hljs);
		hljs.highlightBlock(block);
	});
});*/
