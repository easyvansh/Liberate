"use client"

import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, 'forumPosts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      setPosts(data);
    });
    return () => unsubscribe();
  }, []);

  const postStory = async () => {
    if (!user) return alert('Please log in first.');
    try {
      await addDoc(collection(db, 'forumPosts'), {
        content,
        userId: user.uid,
        timestamp: new Date(),
      });
      setContent('');
    } catch (error) {
      console.error('Error adding forum post:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Cultural Storytelling Forum</h1>
      <textarea
        className="w-full p-2 border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share a cultural story or insight..."
      />
      <button className="mt-2 px-4 py-2 bg-purple-500 text-white" onClick={postStory}>
        Post
      </button>

      <div className="mt-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-2 mb-2">
            <p>{post.content}</p>
            <span className="text-sm text-gray-500">
              Posted on {post.timestamp?.toDate().toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
