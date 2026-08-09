/**
 * Todo el contenido editable del sitio vive aquí.
 * Las piezas de la galería están clasificadas según lo que muestra
 * cada fotografía original del taller.
 */

export const marca = {
  nombre: "Amigurupi Crochet",
  lema: "Tú lo imaginas, yo lo tejo.",
  anios: 3,
  /** Cómo se muestra el número en pantalla. */
  telefono: "+52 962 119 2249",
  /** El mismo número en formato E.164, para `tel:` y datos estructurados. */
  telefonoE164: "+529621192249",
  whatsappUrl:
    "https://wa.me/529621192249?text=" +
    encodeURIComponent(
      "Hola, me gustaría información sobre un amigurumi personalizado.",
    ),
  email: "lugalvez00@gmail.com",
  direccion: {
    calle: "Calle Central Oriente 510-B",
    ciudad: "Motozintla",
    estado: "Chiapas",
    pais: "México",
    /** Cómo se lee la ubicación en una sola línea. */
    corta: "Motozintla, Chiapas",
  },
  /** Localidades desde las que llegan la mayoría de los encargos. */
  zonas: [
    "Motozintla",
    "Huixtla",
    "Tapachula",
    "Comitán",
    "San Cristóbal de las Casas",
    "Tuxtla Gutiérrez",
  ],
  instagram: "https://www.instagram.com/amigurupicrochet",
  facebook: "https://www.facebook.com/amigurupicrochet",
} as const;

export const navegacion = [
  { id: "inicio", etiqueta: "Inicio" },
  { id: "galeria", etiqueta: "Galería" },
  { id: "proceso", etiqueta: "Cómo encargar" },
  { id: "creaciones", etiqueta: "Creaciones" },
  { id: "sobre-mi", etiqueta: "Sobre mí" },
  { id: "faq", etiqueta: "Preguntas frecuentes" },
  { id: "contacto", etiqueta: "Contacto" },
] as const;

export type CategoriaId =
  | "mascotas"
  | "personajes"
  | "flores"
  | "parejas"
  | "especiales";

export const categorias: { id: CategoriaId | "todas"; etiqueta: string }[] = [
  { id: "todas", etiqueta: "Todas" },
  { id: "mascotas", etiqueta: "Mascotas" },
  { id: "personajes", etiqueta: "Personajes" },
  { id: "flores", etiqueta: "Flores" },
  { id: "parejas", etiqueta: "Parejas" },
  { id: "especiales", etiqueta: "Especiales" },
];

export type Pieza = {
  archivo: string;
  titulo: string;
  descripcion: string;
  categorias: CategoriaId[];
  /** Relación de aspecto real del archivo, para reservar espacio y evitar CLS. */
  ancho: number;
  alto: number;
  /**
   * Altura del mosaico. Todas las fotos son 4:5, así que la variedad del
   * collage se decide aquí a propósito en vez de dejarla al azar.
   */
  tramo?: "alto";
};

export const piezas: Pieza[] = [
  {
    archivo: "42",
    titulo: "Graduado personalizado",
    descripcion:
      "Toga, birrete y estola tejidos punto por punto para que el recuerdo del día más importante no se guarde en un cajón.",
    categorias: ["personajes", "especiales"],
    ancho: 1080,
    alto: 1350,
    tramo: "alto",
  },
  {
    archivo: "44",
    titulo: "Spider graduado",
    descripcion:
      "Su héroe favorito con la toga de su generación: el regalo de graduación que nadie más va a tener.",
    categorias: ["personajes", "especiales"],
    ancho: 1080,
    alto: 1350,
  },
  {
    archivo: "52",
    titulo: "Fisioterapeuta",
    descripcion:
      "Uniforme, pelota y toalla en miniatura. Cada profesión merece su propia figura hecha a mano.",
    categorias: ["personajes"],
    ancho: 1080,
    alto: 1350,
  },
  {
    archivo: "55",
    titulo: "Pareja personalizada",
    descripcion:
      "Su ropa, sus accesorios, hasta los anillos. Dos figuras que cuentan la historia de dos personas reales.",
    categorias: ["parejas", "personajes"],
    ancho: 1080,
    alto: 1350,
    tramo: "alto",
  },
  {
    archivo: "57",
    titulo: "Snoopy graduado",
    descripcion:
      "Tejido en hilo chenille sobre su luna amarilla. Suave, abrazable y listo para acompañar la celebración.",
    categorias: ["personajes", "especiales"],
    ancho: 1080,
    alto: 1350,
  },
  {
    archivo: "59",
    titulo: "Bolígrafos de graduación",
    descripcion:
      "Detalles pequeños para regalar en grande: recuerdos tejidos para toda la generación.",
    categorias: ["especiales"],
    ancho: 1080,
    alto: 1350,
  },
  {
    archivo: "60",
    titulo: "Enfermera tipo funko",
    descripcion:
      "Estilo funko con capa de heroína, porque hay trabajos que merecen ese homenaje.",
    categorias: ["personajes"],
    ancho: 1080,
    alto: 1350,
  },
  {
    archivo: "61",
    titulo: "Abogada personalizada",
    descripcion:
      "Traje rojo, aretes de oro y su melena exacta. El detalle es lo que la hace idéntica.",
    categorias: ["personajes"],
    ancho: 1080,
    alto: 1350,
  },
  {
    archivo: "62",
    titulo: "Ingeniera agrónoma",
    descripcion:
      "Con casco, lentes y su plantita tejida. Una figura que cuenta a qué dedica su vida.",
    categorias: ["personajes"],
    ancho: 1080,
    alto: 1350,
    tramo: "alto",
  },
  {
    archivo: "63",
    titulo: "Snoopy coquette",
    descripcion:
      "Moños rosas y un corazón entre las manos, en hilo chenille con destellos.",
    categorias: ["mascotas", "especiales"],
    ancho: 1080,
    alto: 1350,
    tramo: "alto",
  },
  {
    archivo: "64",
    titulo: "Tulipán en maceta",
    descripcion:
      "Flores que nunca se marchitan, con su tarjeta lista para dedicar.",
    categorias: ["flores"],
    ancho: 1080,
    alto: 1350,
  },
];

/** Piezas destacadas del carrusel, con narrativa emocional. */
export const destacadas = [
  {
    archivo: "55",
    titulo: "Parejas",
    frase: "Dos figuras. Una historia que ya estaban escribiendo.",
    texto:
      "Aniversarios, pedidas de mano, bodas. Recreamos su ropa, sus accesorios y esos detalles que sólo ustedes reconocen.",
  },
  {
    archivo: "42",
    titulo: "Graduaciones",
    frase: "El día que tanto costó, hecho para quedarse.",
    texto:
      "Toga, birrete y los colores de su facultad. Un recuerdo que se queda en el librero, no en la caja de fotos.",
  },
  {
    archivo: "63",
    titulo: "Mascotas",
    frase: "Con su manchita en el ojito, tal como es.",
    texto:
      "Tejemos a tu compañero de vida a partir de tus fotos: su pelaje, su postura, esa marca que lo hace único.",
  },
  {
    archivo: "62",
    titulo: "Profesiones",
    frase: "Lo que hace, tejido en sus propias manos.",
    texto:
      "Enfermeras, abogadas, ingenieras, maestros. Con su uniforme y las herramientas de su oficio en miniatura.",
  },
  {
    archivo: "64",
    titulo: "Flores",
    frase: "Un ramo que no se marchita nunca.",
    texto:
      "Tulipanes, girasoles y ramos completos en crochet, con tarjeta dedicada para la ocasión.",
  },
];

export const pasos = [
  {
    numero: "01",
    titulo: "Cuéntanos tu idea",
    texto:
      "Nos escribes por WhatsApp y nos mandas la foto de la persona, mascota o personaje, junto con los detalles que quieres que aparezcan.",
  },
  {
    numero: "02",
    titulo: "Recibes tu propuesta",
    texto:
      "Te decimos qué se puede hacer con esa referencia, el tamaño, el precio y el tiempo estimado de entrega.",
  },
  {
    numero: "03",
    titulo: "Cerramos los detalles",
    texto:
      "Confirmamos juntas colores, ropa y accesorios, y apartas tu lugar. Todos los ajustes se hacen en este punto, antes de empezar.",
  },
  {
    numero: "04",
    titulo: "Comenzamos a tejer",
    texto:
      "Tu pieza se teje a mano, punto por punto, con hilo de algodón de calidad y relleno hipoalergénico. Cada figura lleva su tiempo.",
  },
  {
    numero: "05",
    titulo: "Lo recibes en casa",
    texto:
      "Empaquetado con cuidado, listo para regalar. Envíos a todo México y entrega directa en Motozintla.",
  },
];

export const valores = [
  {
    titulo: "100% personalizado",
    texto:
      "Tu pieza se hace a partir de tus fotos y tus ideas, no de un catálogo.",
    icono: "chispa",
  },
  {
    titulo: "Hecho a mano",
    texto:
      "Sin máquinas ni moldes. Punto por punto, con las horas que cada figura necesite.",
    icono: "mano",
  },
  {
    titulo: "Materiales de calidad",
    texto:
      "Hilo de algodón y chenille de buena marca, relleno hipoalergénico y ojos de seguridad.",
    icono: "ovillo",
  },
  {
    titulo: "Atención cercana",
    texto:
      "Tratas directamente con quien teje tu pieza, de principio a fin. Sin intermediarios y sin bots.",
    icono: "chat",
  },
  {
    titulo: "Regalos únicos",
    texto:
      "Piezas pensadas para emocionar: cumpleaños, graduaciones, aniversarios y días que no se olvidan.",
    icono: "regalo",
  },
  {
    titulo: "Personajes favoritos",
    texto:
      "¿Un personaje que le encanta? También lo tejemos, con el mismo cuidado que una pieza a la medida.",
    icono: "corona",
  },
] as const;

/**
 * Comentarios generales sobre el tipo de encargo, sin fotos ni personas
 * concretas: son ejemplos del tipo de pedido, no reseñas verificadas.
 */
export const testimonios = [
  {
    tipo: "Amigurumi personalizado",
    texto:
      "Quedé enamorada del resultado, superó mis expectativas. Mil gracias por tanto amor en cada detalle.",
  },
  {
    tipo: "Pareja personalizada",
    texto:
      "El mejor regalo que pude darle a mi novio. Le encantó su versión en amigurumi, ¡está idéntico!",
  },
  {
    tipo: "Mascota tejida",
    texto:
      "Mi perrita quedó perfecta, hasta su manchita en el ojito tejida con tanto amor. Volveré a pedir.",
  },
  {
    tipo: "Regalo de graduación",
    texto:
      "Pedí el amigurumi de graduación de mi hermana y lloró al abrirlo. La calidad del tejido es impecable.",
  },
];

export const preguntas = [
  {
    p: "¿Cuánto tarda en estar listo mi amigurumi?",
    r: "Una figura personalizada tarda entre 1 y 3 semanas, según el detalle y la cantidad de piezas. En temporadas altas (graduaciones, 14 de febrero, 10 de mayo y diciembre) te confirmamos la fecha exacta antes de apartar tu lugar. Si lo necesitas para una fecha específica, avísanos desde el primer mensaje.",
  },
  {
    p: "¿Cómo se hace un diseño personalizado?",
    r: "Nos envías fotos de la persona, mascota o personaje junto con los detalles importantes: peinado, ropa, colores favoritos, accesorios. Con esa referencia te confirmamos qué se puede lograr, el tamaño y el precio. Cuando lo apruebas y apartas tu lugar, comenzamos a tejer.",
  },
  {
    p: "¿Cuáles son las formas de pago?",
    r: "Se aparta con el 50% del total y el resto se cubre al terminar la pieza, antes del envío. Aceptamos transferencia bancaria, depósito y pago en efectivo si estás en Motozintla.",
  },
  {
    p: "¿Hacen envíos a todo México?",
    r: "Sí. Enviamos a toda la República por paquetería con número de guía para que puedas rastrear tu pedido. El costo depende del destino y del tamaño de la caja. En Motozintla puedes recoger directamente o coordinamos entrega local.",
  },
  {
    p: "¿Puedo pedir cambios?",
    r: "Sí, y el mejor momento es antes de empezar a tejer: cuando revisamos la propuesta ajustamos colores, ropa, accesorios y tamaño hasta que sea lo que imaginabas. Una vez que la figura está en proceso ya no es posible modificarla, porque cada pieza se arma completa desde el primer punto. Por eso vale la pena mandarnos todas las referencias desde el principio.",
  },
  {
    p: "¿Qué materiales usan?",
    r: "Hilo de algodón y chenille de buena calidad, relleno siliconado hipoalergénico y ojos de seguridad. Para figuras destinadas a menores de 3 años tejemos los ojos y detalles con hilo, sin piezas pequeñas.",
  },
  {
    p: "¿Cómo cuido mi amigurumi?",
    r: "Lávalo a mano con agua fría y jabón neutro, presionando sin retorcer, y déjalo secar a la sombra sobre una toalla. Para el polvo del día a día basta con un cepillado suave o aire frío de secadora.",
  },
];
