import ButtonWithModal from "./button-with-modal";

export default function NavbarNew() {
  return (
    <header className="bg-black shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <img src="./landing/logo.png" alt="logo" className="w-1/12"/>
    <nav>
      <ul className="flex space-x-6">
        <li>
          <a href="#" className="text-gray-800 hover:text-blue-600 ">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-800 hover:text-blue-600">
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-800 items-center hover:text-blue-600"
          >
            Features
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-800 hover:text-blue-600">
            Contact
          </a>
        </li>
        <li>
          <ButtonWithModal buttonText="Login"/>
        </li>
      </ul>
    </nav>
    </div>
    </header>
  );
}
