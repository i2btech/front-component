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
