

const Blog = (props) => {


    const approveBlog = async (e) => {
        const heading = e.target.parentElement.parentElement.firstChild.innerHTML;
        const content = e.target.parentElement.parentElement.firstChild.nextSibling.innerHTML;
        await fetch("http://127.0.0.1:8000/admin/approveBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set content type to JSON
            },
            body: JSON.stringify({ heading, content }), // Serialize the body as JSON
        });
        window.location.reload();
    }

    const rejectBlog = async (e) => {
        const heading = e.target.parentElement.parentElement.firstChild.innerHTML;
        await fetch("http://127.0.0.1:8000/admin/rejectBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set content type to JSON
            },
            body: JSON.stringify({ heading }), // Serialize the body as JSON
        });
        window.location.reload();
    }

    return (
        <div className='showblog'>
            <div className="showblog_content">
                <p className='title'>{props.heading}</p>
                <p className='description'>{props.description}</p>
                <p className="status">{props.status}</p>
                <div className="ApproveReject">
                    <button onClick={approveBlog} style={{ "display": `${props.showbutton}`, "width": "100px", "height": "40px", "backgroundColor": "Green", "margin": "10px" }}>Approve</button>
                    <button onClick={rejectBlog} style={{ "display": `${props.showbutton}`, "width": "100px", "height": "40px", "backgroundColor": "Red", "margin": "10px" }}>Reject</button>
                </div>
            </div>
        </div>
    )
}

export default Blog;