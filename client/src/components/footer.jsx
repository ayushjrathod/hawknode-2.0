
function Footer(){
    return (
      
      <div id="footer" className="flex-col justify-center m-1">
        <div className="flex justify-center" >
          <img className="w-22 h-20" src="../src/assets/hawknodeLOGO.png" />
        </div>

        <div className="flex justify-center pb-2">
          <h3 className="font-logo text-black text-4xl">hawknode</h3>
        </div>
        <div className="pb-5">
          <span className="block text-sm text-center text-gray-500">
            A Denvise Product.
          </span>
          <span className="block text-sm text-center text-gray-500">
            © 2023-2024 hawknode™. All Rights Reserved.
          </span>
        </div>

        <div className="flex justify-center pb-5">
          <img
            className="mx-10"
            src="../src/assets/facebook.png"
            href="#"
            height="40"
            width="40"
          />
          <img
            className="mx-10"
            src="../src/assets/instagram.png"
            href="#"
            height="40"
            width="40"
          />
          <img
            className="mx-10"
            src="../src/assets/twitter.png"
            href="#"
            height="40"
            width="40"
          />
          <img
            className="mx-10"
            src="../src/assets/linkedin.png"
            href="#"
            height="40"
            width="40"
          />
        </div>
      </div>
    );
}

export default Footer;