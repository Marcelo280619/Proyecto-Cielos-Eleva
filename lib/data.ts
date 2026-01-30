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
    image: "/img/prod-cielo.jpg",
    category: "Cielos",
  },
  {
    id: "p2",
    name: "Perfilería T-24",
    description: "Estructura metálica para montaje de cielo americano.",
    priceRef: 8990,
    stock: 10,
    image: "/img/prod-perfil.jpg",
    category: "Estructuras",
  },
  {
    id: "p3",
    name: "Revestimiento PVC",
    description: "Revestimiento interior para muros, fácil limpieza.",
    priceRef: 15990,
    stock: 0,
    image: "/img/prod-pvc.jpg",
    category: "Revestimientos",
  },
];

export const projects: Project[] = [
  { id: "t1", title: "Cielo Americano Oficina", location: "Talca", image: "/img/proy-1.jpg" },
  { id: "t2", title: "Remodelación Local Comercial", location: "Curicó", image: "/img/proy-2.jpg" },
  { id: "t3", title: "Revestimiento Interior", location: "Linares", image: "/img/proy-3.jpg" },
  { id: "t4", title: "Terminaciones y Pintura", location: "San Javier", image: "/img/proy-4.jpg" },
];
