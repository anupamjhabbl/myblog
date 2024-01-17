import { useEffect, useState } from 'react';
import Blog from './Blog'

const UserBlog = () => {
    let [allBlog, setAllBlog] = useState([{"heading":"heading","content":"cindnd"}]);
    let [yourBlog, setYourBlog] = useState([{"heading":"heading","content":"cindnd"}]);

    useEffect(() => {
        const getAllBlog = async () => {
            let data = await fetch('http://127.0.0.1:8000/users/getBlogs', {"method":"GET"});
            data = await data.json();
            setAllBlog(data.response);
        }
        const getYourBlog = async () => {
            let data = await fetch('http://127.0.0.1:8000/users/getMyBlogs', {"method":"GET", "credentials":"include"});
            data = await data.json();
            setYourBlog(data.response);
        }
        getAllBlog();
        getYourBlog(); 
    }, [])

    return (
        <div className="userblog">
            <button><a href="http://127.0.0.1:3000/user/writeBlog">Write a Blog</a></button>
            <h2>Your Blogs</h2>
            {yourBlog.map((blogObj) => {
                return <Blog heading={`${blogObj.heading}`} description={`${blogObj.content}`} status={`${blogObj.status}`} showbutton="none"/>
            })}

            <h2>All Blogs</h2>
            {allBlog.map((blogObj) => {
                return <Blog heading={`${blogObj.heading}`} description={`${blogObj.content}`} status="" showbutton="none"/>
            })}
        </div>
    )
}

export default UserBlog;