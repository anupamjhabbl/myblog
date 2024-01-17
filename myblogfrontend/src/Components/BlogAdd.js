const BlogAdd = () => {
    return (
        <div className='addblog'>
            <form>
            <label for="Title">Title</label>
            <input type='text' name='Title' placeholder='Enter the title for your blog'></input><br></br>

            <label for="Description">Description</label>
            <textarea name='Description' placeholder='Write description for your blog '></textarea><br></br>

            <button type='submit'>Add blog </button>
            </form>
        </div>
    )
}

export default BlogAdd;