import Blog from './Blog'
import { useEffect, useState } from 'react';

const AdminPage = () => {
    let [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogsToApprove = async () => {
            let data = await fetch("http://127.0.0.1:8000/admin/adminBlogs", {"method":"GET"});
            data = await data.json();
            setBlogs(data.response);
        }
        getBlogsToApprove();
    }, []);
    
    return (
        <div className="adminpage">
            {blogs.map((blogObj) => {
                return <>
                    <Blog heading={`${blogObj.heading}`} description={`${blogObj.content}`} showbutton="inline" status=""/>
                </>
            })}
        </div>
    )
}

export default AdminPage;