import React from "react";
import { Container, PostForm } from "../components";
import PostCard from "../components/PostCard";

function AddPost(){
    return (
        <div className="py-8">
            <Container>
                <PostForm/>
            </Container>
        </div>
    )
}

export default AddPost;