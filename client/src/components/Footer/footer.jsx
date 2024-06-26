import linkededIn from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import twitter from "../../assets/twitter.png"
import instagram from "../../assets/instagram.png"


function Footer(){
    return (
      
      <div id="footer" className="align-bottom">
        <div className="flex justify-center" >
          <img className="size-8" src="../src/assets/hawknodeLogo.png" />
        </div>

        <div className="flex justify-center pb-2">
          <h3 className="font-logo text-black text-2xl">hawknode</h3>
        </div>
        <div className="pb-5">
          <span className="block text-xs text-center text-gray-500">
            A Denvise Product.
          </span>
          <span className="block text-xs text-center text-gray-500">
            © 2023-2024 hawknode™. All Rights Reserved.
          </span>
        </div>

        <div className="flex justify-center">
          <img
            className="mx-2"
            src={linkededIn}
            href="#"
            height="24"
            width="24"
          />
          <img
            className="mx-2"
            src={github}
            href="#"
            height="24"
            width="24"
          />
          <img
            className="mx-2"
            src={twitter}
            href="#"
            height="24"
            width="24"
          />
          <img
            className="mx-2"
            src={instagram}
            href="#"
            height="24"
            width="24"
          />
        </div>
      </div>
    );
}

export default Footer;