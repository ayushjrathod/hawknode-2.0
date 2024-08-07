

function Newsletter(){
    return (
      <div className="">
        <div className="flex justify-center">
          <h1 className="pt-10 flex font-Akshar text-3xl justify-center font-bold">
            Subscribe to my Newsletter
          </h1>
        </div>
        <div>
          <form className="flex px-10 w-full justify-center">
            <div className="inline-flex flex-1 justify-center mt-4">
              <input
                type="text"
                name="email"
                className="border-solid border-2 h-[50px] w-[400px] border-slate-950 rounded-3xl pl-5 font-Kanit font-bold"
              />
              <button className="bg-black text-white font-Akshar font-extrabold px-10 py-3 rounded-3xl ml-[20%] h-[50px] absolute text-xl tracking-wider">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Newsletter;