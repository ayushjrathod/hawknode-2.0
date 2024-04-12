

function Footer(){
    return (
      <div
        id="footer"
        className="inline-flex w-full h-full px-10 py-5 bg-slate-300 justify-between"
      >
        <div className="">
          <h3 className="font-logo text-black py-[5px] text-4xl">hawknode</h3>
          <p className="font-Andada Pro">
            Explore HawkNode: Your hub for insightful blogs. Discover new
            posts, revisit old favorites, and delve into a world of knowledge.
            Join our community of readers and writers today.
          </p>
        </div>

        <div className="flex justify-end px-10 py-5 w-full h-full">
          <img
            className="mx-1"
            src="../src/assets/facebook.png"
            href="#"
            height="40"
            width="40"
          />
          <img
            className="mx-1"
            src="../src/assets/instagram.png"
            href="#"
            height="40"
            width="40"
          />
          <img
            className="mx-1"
            src="../src/assets/twitter.png"
            href="#"
            height="40"
            width="40"
          />
          <img
            className="mx-1"
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