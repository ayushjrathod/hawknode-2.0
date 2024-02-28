

function Footer(){
    return(
        
        <div id="footer" className="inline-flex w-full h-full py-10 px-10 bg-slate-300 justify-between">
            <div className=""> 
            <h3 className="font-logo text-black py-[5px] text-4xl">hawknode</h3>
            <p>what is hawknode <br/> and what it does will be <br/>explained here</p>
            </div>

            <div className="flex justify-end p-10 w-full h-full">
                <img className="mx-1" src="../src/assets/facebook.png" href="" height="40" width="40"/>
                <img className="mx-1" src="../src/assets/instagram.png" href="" height="40" width="40"/>
                <img className="mx-1" src="../src/assets/twitter.png" href="" height="40" width="40"/>
                <img className="mx-1" src="../src/assets/linkedin.png" href="" height="40" width="40"/>

            </div>
        </div>
    );
}

export default Footer;