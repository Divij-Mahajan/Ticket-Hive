

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center bottom-0">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ticket Hive. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Disclaimer: This website is for demonstration of Ticket Hive and does not represent real services or offers. It is intended solely for showcasing the capabilities of the Ticket Hive platform. Any resemblance to actual products, services, or events is purely coincidental
        </p>
        <div className="mt-4">
          <a href="#" className="text-gray-300 hover:text-white mr-4">About Us</a>
          <a href="#" className="text-gray-300 hover:text-white mr-4">Contact Us</a>
          <a href="#" className="text-gray-300 hover:text-white mr-4">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
