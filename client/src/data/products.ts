export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  links: {
    text: string;
    url: string;
  }[];
}

export const products: Product[] = [
  {
    id: 1,
    title: "Microsoft 365",
    description: "Premium Office apps, extra cloud storage, advanced security, and more—all in one convenient subscription.",
    image: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?q=80&w=2070&auto=format&fit=crop",
    badge: {
      text: "Kawaii",
      color: "bg-pink-500"
    },
    links: [
      {
        text: "For 1 person",
        url: "#"
      },
      {
        text: "For up to 6 people",
        url: "#"
      }
    ]
  },
  {
    id: 2,
    title: "Surface Pro 9",
    description: "The tablet flexibility you want and the laptop performance you need in one ultra-portable device.",
    image: "https://images.unsplash.com/photo-1563770660941-10a2b36e9e01?q=80&w=2070&auto=format&fit=crop",
    badge: {
      text: "Sugoi",
      color: "bg-purple-600"
    },
    links: [
      {
        text: "Learn more",
        url: "#"
      }
    ]
  },
  {
    id: 3,
    title: "Xbox Series X",
    description: "The fastest, most powerful Xbox ever, designed for a console generation that has you at its center.",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2071&auto=format&fit=crop",
    badge: {
      text: "Leveled Up",
      color: "bg-green-500"
    },
    links: [
      {
        text: "Shop Xbox Series X",
        url: "#"
      }
    ]
  },
  {
    id: 4,
    title: "Windows 11",
    description: "Designed for hybrid work and learning with enhanced productivity features and a fresh new look.",
    image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop",
    badge: {
      text: "Senpai",
      color: "bg-blue-400"
    },
    links: [
      {
        text: "See if your PC is ready",
        url: "#"
      }
    ]
  }
];
