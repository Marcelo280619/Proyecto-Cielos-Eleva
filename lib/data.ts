export type Product = {
  id: string;
  name: string;
  description: string;
  priceRef?: number;
  stock: number;
  image: string;
  category: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Cielo Americano 60x60",
    description: "Placa estándar para cielo americano, terminación limpia y rápida instalación.",
    priceRef: 12990,
    stock: 24,
    image: "/img/productos/panel-blanco.jpg",
    category: "Cielos Americanos",
  },
  {
    id: "p2",
    name: "Perfilería T-24",
    description: "Estructura metálica para montaje de cielo americano.",
    priceRef: 8990,
    stock: 10,
    image: "/img/productos/panel-beige.jpg",
    category: "Estructuras",
  },
  {
    id: "p3",
    name: "Revestimiento PVC",
    description: "Revestimiento interior para muros, fácil limpieza.",
    priceRef: 15990,
    stock: 0,
    image: "/img/productos/panel-pvc.jpg",
    category: "Revestimientos",
  },
  {
    id: "p4",
    name: "Panel de Cielo Acústico Blanco",
    description: "Panel acústico de alta calidad para reducción de ruido.",
    priceRef: 15500,
    stock: 45,
    image: "/img/productos/panel-blanco.jpg",
    category: "Cielos Americanos",
  },
  {
    id: "p5",
    name: "Panel de Cielo Acústico Beige",
    description: "Panel acústico en tono beige para ambientes cálidos.",
    priceRef: 16500,
    stock: 32,
    image: "/img/productos/panel-beige.jpg",
    category: "Cielos Americanos",
  },
  {
    id: "p6",
    name: "Panel de Cielo Acanalado",
    description: "Diseño acanalado moderno y elegante.",
    priceRef: 15200,
    stock: 28,
    image: "/img/productos/panel-acanalado.jpg",
    category: "Cielos Americanos",
  },
  {
    id: "p7",
    name: "Panel PVC Revestimiento Techo",
    description: "Panel PVC resistente para techos y revestimientos.",
    priceRef: 12900,
    stock: 0,
    image: "/img/productos/panel-pvc.jpg",
    category: "Revestimientos",
  },
];

export const projects: Project[] = [
  { 
    id: "t1", 
    title: "Edificio de Oficinas", 
    subtitle: "Cielos Acústicos",
    location: "Talca", 
    image: "/img/proyectos/proyecto-1.jpg" 
  },
  { 
    id: "t2", 
    title: "Oficinas Corporativas", 
    subtitle: "Cielos Americanos",
    location: "Curicó", 
    image: "/img/proyectos/proyecto-2.jpg" 
  },
  { 
    id: "t3", 
    title: "Centro Comercial", 
    subtitle: "Revestimientos",
    location: "Linares", 
    image: "/img/proyectos/proyecto-3.jpg" 
  },
];