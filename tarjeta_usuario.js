// Definimos un nuevo componente personalizado llamado <tarjeta-usuario>
class TarjetaUsuario extends HTMLElement {
    constructor() {
      super();
  
      // Activamos Shadow DOM para encapsular estilos y estructura
      this.attachShadow({ mode: 'open' });
  
      // Insertamos el contenido del componente en el Shadow DOM
      this.shadowRoot.appendChild(this.plantilla().content.cloneNode(true));
    }
  
    // Escuchamos cambios en el atributo "tema" para cambiar el color de fondo
    static get observedAttributes() {
      return ['tema'];
    }
  
    attributeChangedCallback(nombre, valorAntiguo, nuevoValor) {
      if (nombre === 'tema') {
        this.shadowRoot.querySelector('.tarjeta').style.setProperty('--color-fondo', nuevoValor);
      }
    }
  
    // Creamos la plantilla del componente con estilos y slots
    plantilla() {
      const plantilla = document.createElement('template');
      plantilla.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: 'Segoe UI', Tahoma, sans-serif;
          }
  
          .tarjeta {
            background-color: var(--color-fondo, #ffffff);
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 600px;
            margin: 2rem auto;
            transition: transform 0.3s;
          }
  
          .tarjeta:hover {
            transform: translateY(-5px);
          }
  
          .encabezado {
            font-size: 1.6em;
            font-weight: bold;
            color: #222;
            margin-bottom: 10px;
          }
  
          .descripcion {
            font-size: 1em;
            color: #555;
            line-height: 1.6;
          }
        </style>
  
        <section class="tarjeta">
          <!-- Slot para el nombre o título -->
          <div class="encabezado">
            <slot name="titulo">[Nombre por defecto]</slot>
          </div>
  
          <!-- Slot para la descripción o contenido -->
          <div class="descripcion">
            <slot name="contenido">[Descripción por defecto]</slot>
          </div>
        </section>
      `;
      return plantilla;
    }
  }
  
  // Registramos el componente para que pueda usarse como <tarjeta-usuario>
  customElements.define('tarjeta-usuario', TarjetaUsuario);
  