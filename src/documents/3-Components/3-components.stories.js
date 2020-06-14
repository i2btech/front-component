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

import $ from 'jquery';
import { $js } from '../../js/utils';
import iSelect from '../../js/components/i-select';
import iForm from '../../js/components/i-form';

$(function () {
	setTimeout(() => {
		// Form Select
		$js('csel').iSelect();

		const $frm = $js('frm-valid');
		iForm.validate($frm);

		$frm.on('submit', (e) => {
			e.preventDefault();

			if($frm.valid()) {
				console.log('Enviado');
			}
		});
	}, 800);
});
