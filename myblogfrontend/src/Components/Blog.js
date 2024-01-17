const Blog = (props) => {
    return (
        <div className='showblog'>
            <p className='title'>{props.heading}</p>
            <p className='description'>{props.description}</p>
            <p className="status">{props.status}</p>
        </div>
    )
}

export default Blog;