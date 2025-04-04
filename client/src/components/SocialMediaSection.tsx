export default function SocialMediaSection() {
  const socialLinks = [
    { icon: "fab fa-facebook-f", url: "#", label: "Facebook" },
    { icon: "fab fa-twitter", url: "#", label: "Twitter" },
    { icon: "fab fa-linkedin-in", url: "#", label: "LinkedIn" },
    { icon: "fab fa-instagram", url: "#", label: "Instagram" }
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-['Comic_Neue',cursive] text-purple-700 mb-4">Follow Microsoft</h2>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              className="text-gray-800 hover:text-pink-500 transition-colors duration-300"
              aria-label={social.label}
            >
              <i className={`${social.icon} text-2xl`}></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
