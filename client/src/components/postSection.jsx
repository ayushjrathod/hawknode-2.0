import posts from "../posts"; 

function PostCard() {
    return (
        <div id="postSection" className="w-[60%] flex-col justify-center mx-[20%]">
            <h4 className=" mt-10 font-Akshar text-3xl">Posts</h4>
            {posts.map((postData) => (
                <div className="flex  justify-center" key={postData.id}>
                    <div className="shrink-0 w-[308px] h-[213px]">
                    <img className="m-5" src={postData.img} alt='img of post' />
                    </div>
                    <div className="m-10">
                    <h2 className=" font-Andada Pro text-2xl ">{postData.heading}</h2>
                    <p className="font-Andada Pro text-xm ">{postData.des}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}



export default PostCard;


