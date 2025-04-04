export interface BusinessProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  link: {
    text: string;
    url: string;
  };
}

export const businessProducts: BusinessProduct[] = [
  {
    id: 1,
    title: "Microsoft 365 for business",
    description: "Powerful apps that help your team stay connected and productive from anywhere.",
    image: "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?q=80&w=2039&auto=format&fit=crop",
    link: {
      text: "Shop now",
      url: "#"
    }
  },
  {
    id: 2,
    title: "Microsoft Teams",
    description: "Connect and collaborate with anyone from anywhere on one platform.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop",
    link: {
      text: "Learn more",
      url: "#"
    }
  },
  {
    id: 3,
    title: "Windows 11 for business",
    description: "Designed for hybrid work with intuitive tools to help people collaborate more effectively.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    link: {
      text: "Learn more",
      url: "#"
    }
  },
  {
    id: 4,
    title: "Microsoft Cloud",
    description: "Deliver innovation with secure, seamless cloud solutions that help you build the future.",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0d07?q=80&w=2032&auto=format&fit=crop",
    link: {
      text: "Learn more",
      url: "#"
    }
  }
];
