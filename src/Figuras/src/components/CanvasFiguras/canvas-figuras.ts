import { defineComponent } from 'vue';

// Interfaces
interface CanvasFigurasData {
  figuraSeleccionada: string;
  color: string;
  posX: number;
  posY: number;
  rotacion: number;
  lado: number;
  ancho: number;
  alto: number;
  radio: number;
  base: number;
  altura: number;
  mostrarLado: boolean;
  mostrarAncho: boolean;
  mostrarAlto: boolean;
  mostrarRadio: boolean;
  mostrarBase: boolean;
  mostrarAltura: boolean;
  ctx: CanvasRenderingContext2D | null;
}

// Funciones de utilidad
function actualizarInputs(component: any) {
  // Resetear todos los controles a falso
  component.mostrarLado = false;
  component.mostrarAncho = false;
  component.mostrarAlto = false;
  component.mostrarRadio = false;
  component.mostrarBase = false;
  component.mostrarAltura = false;

  // Mostrar los controles según la figura seleccionada
  switch (component.figuraSeleccionada) {
    case 'cuadrado':
    case 'pentagono':
      component.mostrarLado = true;
      break;
    case 'triangulo':
      component.mostrarBase = true;
      component.mostrarAltura = true;
      break;
    case 'rectangulo':
      component.mostrarAncho = true;
      component.mostrarAlto = true;
      break;
    case 'circulo':
      component.mostrarRadio = true;
      break;
  }
}

function limpiarCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarFigura(component: any, ctx: CanvasRenderingContext2D) {
  if (!component.figuraSeleccionada) return;

  const x = component.posX || 0;
  const y = component.posY || 0;
  const angle = (component.rotacion || 0) * Math.PI / 180;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = component.color;
  ctx.beginPath();

  switch (component.figuraSeleccionada) {
    case 'cuadrado': {
      const size = component.lado || 50;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      break;
    }
    case 'rectangulo': {
      const w = component.ancho || 80;
      const h = component.alto || 40;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      break;
    }
    case 'triangulo': {
      const b = component.base || 60;
      const h = component.altura || 50;
      ctx.moveTo(0, -h / 2);
      ctx.lineTo(-b / 2, h / 2);
      ctx.lineTo(b / 2, h / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'circulo': {
      const r = component.radio || 30;
      ctx.arc(0, 0, r, 0, 2 * Math.PI);
      ctx.fill();
      break;
    }
    case "pentagono": {
      const l = component.lado || 50;
      const angle = Math.PI * 2 / 5;
      ctx.moveTo(0, -l);
      for (let i = 1; i < 5; i++) {
        ctx.lineTo(l * Math.sin(i * angle), -l * Math.cos(i * angle));
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

// Exportar el componente completo
export default defineComponent({
  name: 'CanvasFiguras',
  data(): CanvasFigurasData {
    return {
      figuraSeleccionada: 'cuadrado',
      color: '#000000',
      posX: 100,
      posY: 100,
      rotacion: 0,
      lado: 100,
      ancho: 100,
      alto: 100,
      radio: 50,
      base: 100,
      altura: 100,
      mostrarLado: true,
      mostrarAncho: false,
      mostrarAlto: false,
      mostrarRadio: false,
      mostrarBase: false,
      mostrarAltura: false,
      ctx: null
    }
  },
  mounted() {
    this.inicializarCanvas();
    this.actualizarInputs();
  },
  methods: {
    inicializarCanvas() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      this.ctx = canvas.getContext('2d');
    },
    actualizarInputs() {
      actualizarInputs(this);
    },
    dibujarFigura() {
      if (this.ctx) {
        dibujarFigura(this, this.ctx);
      }
    },
    limpiarCanvas() {
      if (this.ctx && this.$refs.canvas) {
        limpiarCanvas(this.ctx, this.$refs.canvas as HTMLCanvasElement);
      }
    }
  }
});