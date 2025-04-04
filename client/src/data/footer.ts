export interface FooterColumn {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "What's new",
    links: [
      { text: "Surface Pro 9", url: "#" },
      { text: "Surface Laptop 5", url: "#" },
      { text: "Surface Studio 2+", url: "#" },
      { text: "Surface Laptop Go 2", url: "#" },
      { text: "Windows 11 apps", url: "#" },
      { text: "Microsoft Store", url: "#" }
    ]
  },
  {
    title: "Microsoft Store",
    links: [
      { text: "Account profile", url: "#" },
      { text: "Download Center", url: "#" },
      { text: "Returns", url: "#" },
      { text: "Order tracking", url: "#" },
      { text: "Microsoft Store Support", url: "#" }
    ]
  },
  {
    title: "Education",
    links: [
      { text: "Microsoft in education", url: "#" },
      { text: "Devices for education", url: "#" },
      { text: "Microsoft Teams for Education", url: "#" },
      { text: "Microsoft 365 Education", url: "#" },
      { text: "Office Education", url: "#" },
      { text: "Educator training", url: "#" }
    ]
  },
  {
    title: "Business",
    links: [
      { text: "Microsoft Cloud", url: "#" },
      { text: "Microsoft Security", url: "#" },
      { text: "Dynamics 365", url: "#" },
      { text: "Microsoft 365", url: "#" },
      { text: "Microsoft Power Platform", url: "#" },
      { text: "Microsoft Teams", url: "#" }
    ]
  },
  {
    title: "Developer & IT",
    links: [
      { text: "Azure", url: "#" },
      { text: "Developer Center", url: "#" },
      { text: "Documentation", url: "#" },
      { text: "Microsoft Learn", url: "#" },
      { text: "Microsoft Tech Community", url: "#" },
      { text: "Azure Marketplace", url: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { text: "Careers", url: "#" },
      { text: "About Microsoft", url: "#" },
      { text: "Company news", url: "#" },
      { text: "Privacy at Microsoft", url: "#" },
      { text: "Investors", url: "#" },
      { text: "Sustainability", url: "#" }
    ]
  }
];

export const footerBottomLinks = [
  { text: "Sitemap", url: "#" },
  { text: "Contact Microsoft", url: "#" },
  { text: "Privacy", url: "#" },
  { text: "Terms of Use", url: "#" },
  { text: "Trademarks", url: "#" },
  { text: "Safety & Eco", url: "#" },
  { text: "About our ads", url: "#" }
];
