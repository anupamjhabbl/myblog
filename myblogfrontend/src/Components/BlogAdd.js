const BlogAdd = () => {
    return (
        <div className='addblog'>
            <form action="http://127.0.0.1:8000/users/postBlog" method="POST">
                <label htmlFor="Title">Title</label>
                <input type='text' name='heading' placeholder='Enter the title for your blog' /><br />

                <label htmlFor="Description">Description</label>
                <textarea name='content' placeholder='Write description for your blog'></textarea><br />

                <button type='submit'>Add blog</button>
            </form>
        </div>

    )
}

export default BlogAdd;