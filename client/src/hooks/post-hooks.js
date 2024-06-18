import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from "../utils/apiCalls";
import useStore from "../store";

export const UserPosts = ({ writerId }) => {
  const { setIsLoading } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [category, setCategory] = useState(searchParams.get('cat') || '');
  const [posts, setPosts] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  const updateURL = ({ page, navigate, location, cat }) => {
    const params = new URLSearchParams();
    if (cat) {
      params.set('cat', cat);
    }
    if (page && page > 1) {
      params.set('page', page);
    }
    const newURL = `${location.pathname}${location.search !== '' ? location.search + '&' : '?'}${params.toString()}`;
    navigate(newURL, { replace: true });
    return newURL;
  };

  useEffect(() => {
    let isMounted = true; // Variable to track component mount state

    const fetchPosts = async () => {
      setIsLoading(true); // Set loading state before fetching posts
      
      try {
        const { data } = await axios.get(
          `${API_URL}/posts?cat=${category}&page=${page}&writerId=${writerId || ''}`,
        );
        if (isMounted) { // Check if component is mounted before setting state
          setPosts(data?.data || []);
          setNumOfPages(data.numOfPages);
        }
      } catch (error) {
        const err = error?.response?.data || error?.response;
        console.error("Error fetching posts:", error);
        toast(err);
      } finally {
        if (isMounted) { // Check if component is mounted before setting loading state
          setIsLoading(false);
        }
      }
    };
    
    fetchPosts();

    return () => {
      isMounted = false; // Cleanup function to set mounted state to false
    };
  }, [page, category, writerId, setIsLoading]); // Update dependency array

  useEffect(() => {
    const updatedURL = updateURL({ page, navigate, location, cat: category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]); // Only trigger when page or category change

  return { posts, numOfPages, setPage, setCategory };
};

export const usePopularPosts = () => {
  const [popular, setPopular] = useState({ posts: [], writers: [] });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/posts/popular`);
        setPopular(data?.data || { posts: [], writers: [] });
      } catch (error) {
        console.error("Error fetching popular posts:", error);
        toast.error("Something went wrong");
      }
    };

    fetchPosts();
  }, []);

  return popular;
};
