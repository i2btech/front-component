import ButtonsHtml from './3.1-buttons.html';
import FormHtml from './3.2-form.html';

export default { title: '3 Componentes' };

export const Buttons = () => ButtonsHtml;
Buttons.story = { name: '3.1 Botones' }

export const Form = () => FormHtml;
Form.story = { name: '3.2 Formulario' }

/*export const withEmoji = () => {
	const button = document.createElement('button');
	button.classList = ['btn bg-primary'];
  button.innerText = '😀 😎 👍 💯';
  return button;
};*/
