import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, LogIn, LogOut, Send } from 'lucide-react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, where } from 'firebase/firestore';

interface Comment {
  id: string;
  uid: string;
  user: string;
  photoURL: string;
  text: string;
  createdAt: Timestamp;
}

const CommentsSection: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to Comments
  useEffect(() => {
    const oneWeekAgo = Timestamp.fromMillis(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const q = query(
      collection(db, "comments"),
      where("createdAt", ">", oneWeekAgo),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(loadedComments);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Error signing in with Google", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError(t('login_domain_error') || "This domain is not authorized for authentication. Please add it in Firebase Console.");
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError(t('login_cancelled') || "Login cancelled.");
      } else {
        setError(err.message || "Failed to sign in.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await addDoc(collection(db, "comments"), {
        uid: user.uid,
        user: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
        text: newComment,
        createdAt: Timestamp.now()
      });
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  // Helper to format timestamp
  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full max-w-4xl mt-20 mb-20">
      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
        <MessageCircle />
        {t('community')}
      </h2>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
        {/* Auth / Input Area */}
        <div className="p-6 border-b border-white/10 bg-[#222]">
          {!user ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-6">{t('login_msg')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  <LogIn size={20} />
                  {t('login_google')}
                </button>
              </div>
              {error && (
                <p className="text-red-500 mt-4 bg-red-500/10 p-2 rounded-lg inline-block">
                  {error}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border border-white/20"
                  />
                  <span className="font-bold text-white">{user.displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('write_comment')}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 pr-12 text-white focus:outline-none focus:border-blue-500 min-h-[80px] resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="absolute bottom-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Comments List */}
        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No comments yet. Be the first!</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <img
                  src={comment.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`}
                  alt={comment.user}
                  className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"
                />
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-white">{comment.user}</span>
                    <span className="text-xs text-gray-500">{formatTime(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed break-words">{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
