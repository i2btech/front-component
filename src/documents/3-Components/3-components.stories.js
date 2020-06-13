import ButtonsHtml from './buttons.html';
import FormHtml from './form.html';

export default { title: '3 Componentes' };

export const Buttons = () => ButtonsHtml;
Buttons.story = { name: 'Botones' }

export const Form = () => FormHtml;
Form.story = { name: 'Formulario' }

/*export const withEmoji = () => {
	const button = document.createElement('button');
	button.classList = ['btn bg-primary'];
  button.innerText = '😀 😎 👍 💯';
  return button;
};*/

/*var script = document.createElement('script');
script.src = '../../../dev/assets/js/libs/libs.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$(function () {
	console.log('Select', $js('csel'));
	// Form Select
	$js('csel').i2bSelect();
});*/
