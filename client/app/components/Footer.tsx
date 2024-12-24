export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Branding or App Name */}
            <div className="text-lg font-bold">
              Liberate
            </div>
  
            {/* Navigation Links */}
            <div className="flex space-x-6">
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
              <a href="/journal" className="hover:underline">
                Journal
              </a>
              <a href="/mood-tracker" className="hover:underline">
                Mood Tracker
              </a>
              <a href="/forum" className="hover:underline">
                Forum
              </a>
              <a href="/challenge" className="hover:underline">
                Challenges
              </a>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-700 my-4"></div>
  
          {/* Social Media and Contact */}
          <div className="flex flex-wrap justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                Instagram
              </a>
            </div>
  
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Liberate. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }
  