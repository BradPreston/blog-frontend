import { useState } from 'react'

export async function getStaticProps() {
    const res = await fetch('http://localhost:8080/v1/api/posts');
    const data = await res.json();

    return {
        props: {
            posts: data.data
        },
        revalidate: 30
    }
}

export default function Posts({ posts }) {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8080/v1/api/posts', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                md_body: body,
                author_id: 4
            })
        })

        return res.json().then(() => {
            window.location.reload();
        })
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Body:
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <input type="submit" value="submit" />
        </form>
        <div>
            {posts && posts.map(post => {
                return (
                    <div key={post.id} style={{ marginBottom: '50px' }}>
                        <h2>{post.title}</h2>
                        <p>{post.author_id === 4 ? 'Brad Preston' : 'unknown'}</p>
                        <p>{post.md_body}</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}