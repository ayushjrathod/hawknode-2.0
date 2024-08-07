import linkededIn from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";

function Footer() {
  return (
    <div id="footer" className="">
      <div className="flex justify-between">
        <div className="flex">
          <img className="size-8 mr-2" src="../src/assets/hawknodeLogo.png" />
          <h3 className="font-logo text-black text-2xl">hawknode</h3>
        </div>
        <div className="flex">
          <img
            className="mx-2 size-8"
            src={linkededIn}
            href="#"
            height="24"
            width="24"
          />
          <img className="mx-2 size-8" src={twitter} href="#" />
          <img
            className="mx-2 size-8"
            src={instagram}
            href="#"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <span className="block text-xs text-center text-gray-500">
          A Denvise Product.
        </span>
        <span className="block text-xs text-center text-gray-500">
          © 2024 hawknode.
        </span>
      </div>
    </div>
  );
}

export default Footer;
