
import '../../../dev/assets/css/main.css';
import ContainerHtml from './descarga-instalacion.html';
import ContainerHtmlEstructura from './estructura-archivos.html';
import ContainerHtmlGuia from './guia-desarrollo.html';
import ContainerHtmlMetodologia from './metodologia-trabajo.html';

export default { title: '1 Inicio' };

export const Container = () => ContainerHtml;
Container.story = { name: 'Descarga e instalación' }

export const Estructura = () => ContainerHtmlEstructura;
Estructura.story = { name: 'Estructura de archivos' }

export const Metodologia = () => ContainerHtmlMetodologia;
Metodologia.story = { name: 'Metodología de trabajo' }

export const Guia = () => ContainerHtmlGuia;
Guia.story = { name: 'Guía para el desarrollo de código Frontend' }

