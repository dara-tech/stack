import axios from "axios";
 export const API_URL = "http://localhost:8800";
 //export const API_URL = "https://darastack.onrender.com";

export const getGoogleSignUp = async (accessToken) => {
    try {
        const user = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        ).then((res) => res.data);

        if (user?.sub) {
            const data = {
                name: user.name,
                email: user.email,
                emailVerified: user.email_verified,
                image: user.picture,
            };
            const result = await axios.post(`${API_URL}/auth/google-signup`, data);
            console.log(result.data);
            return result.data;
        }
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
}

export const emailSignUp = async (data) => {
    try {
        const result = await axios.post(`${API_URL}/auth/register`, data);
        return result?.data;
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
}
export const googleSignin = async (accessToken) => {
    try {
        const user = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        ).then((res) => res.data);

        if (user?.sub) {
            const data = {
                email: user.email,
            };
            const result = await axios.post(`${API_URL}/auth/login`, data);
            console.log(result.data);
            return result.data;
        }
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
}
export const emailLogin = async (data) => {
    try {
        const result = await axios.post(`${API_URL}/auth/login`, data);
        return result?.data;
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
}
export const getSinglePost = async(id)=>{
    try {
        const{data} = await axios.get(`${API_URL}/posts/${id}`);
        return data?.data;
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
        
    }
}

export const getPostComments = async (postId) => {
    try {
        const { data } = await axios.get(`${API_URL}/posts/comments/${postId}`);
        return data?.data;
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
};

// Post a comment
export const postComments = async (postId, token, commentData) => {
    try {
        const result = await axios.post(
            `${API_URL}/posts/comment/${postId}`,
            commentData,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return result?.data;
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
};

// Delete a comment
export const deletePostComments = async (commentId, postId, token) => {
    try {
        const result = await axios.delete(
            `${API_URL}/posts/comment/${commentId}/${postId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return result?.data;
    } catch (error) {
        const err = error?.response?.data || error?.response;
        console.log(err);
        return err;
    }
};


export const getWriterInfo = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/users/get-user/${id}`);
        return data?.data;
    } catch (error) {
        console.error("Error fetching writer information:", error);
        return null; // or handle error accordingly
    }
};

export const followWriter = async (id, token) => {
    try {
        const res = await axios.post(
            `${API_URL}/users/follower/${id}`,
            null,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return res?.data;
    } catch (error) {
        console.error("Error following writer:", error);
        return null; // or handle error accordingly
    }
};



