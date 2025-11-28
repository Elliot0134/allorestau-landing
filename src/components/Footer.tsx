const Footer = () => {
  return (
    <footer className="relative py-16 px-6 glass">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <h3 className="text-3xl font-bold text-universal mb-4">AlloRestau</h3>
            <p className="text-universal/80">
              L'assistant IA vocal qui révolutionne la gestion des appels dans les restaurants.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xl font-bold text-universal mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-universal/80 hover:text-universal transition">À propos</a></li>
              <li><a href="#" className="text-universal/80 hover:text-universal transition">Contact</a></li>
              <li><a href="#" className="text-universal/80 hover:text-universal transition">CGV</a></li>
              <li><a href="#" className="text-universal/80 hover:text-universal transition">Mentions légales</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold text-universal mb-4">Contact</h4>
            <ul className="space-y-2 text-universal/80">
              <li>📧 contact@allorestau.fr</li>
              <li>📞 01 23 45 67 89</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-universal/60">
          <p>&copy; 2025 AlloRestau. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
