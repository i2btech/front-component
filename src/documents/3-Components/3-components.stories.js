import ButtonsHtml from './buttons.html';
import FormHtml from './form.html';
import ModalHtml from './modal.html';
import DropdownHtml from './dropdown.html';
import PanelsHtml from './panels.html';
import CardHtml from './cards.html';
import BreadcrumHtml from './breadcrumb.html';
import CollapseHtml from './collapse.html';
import TooltipsHtml from './tooltips.html';
import TableHtml from './tables.html';

export default { title: '3 Componentes' };

export const Buttons = () => ButtonsHtml;
Buttons.story = { name: 'Botones' }

export const Form = () => FormHtml;
Form.story = { name: 'Formulario' }

export const Modal = () => ModalHtml;
Modal.story = { name: 'Modal' }

export const Dropdown = () => DropdownHtml;
Dropdown.story = { name: 'Dropdown' }

export const Panels = () => PanelsHtml;
Panels.story = { name: 'Panels' }

export const Card = () => CardHtml;
Card.story = { name: 'Cards' }

export const Breadcrumb = () => BreadcrumHtml;
Breadcrumb.story = { name: 'Breadcrumb'};

export const Collapse = () => CollapseHtml;
Collapse.story = { name: 'Collapse'};

export const Tooltips = () => TooltipsHtml;
Tooltips.story= { name: 'Tooltips'};

export const Table = () => TableHtml;
Table.story= { name: 'Table'};

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
import iModal from '../../js/components/i-modal';
import iDropdown from '../../js/components/i-dropdown';

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

		// Modal
		$js('modal').iModal();

		// DropDown
		$js('dropdown').iDropdown();
		$js('ddoverlay').iDropdown({
			overlay: '.overlay'
		});
	}, 800);
});
