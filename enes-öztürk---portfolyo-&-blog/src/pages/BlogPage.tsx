import React, { useState, useEffect } from 'react';
import { BlogPost, BlogComment } from '../types';
import { BLOG_POSTS, INITIAL_COMMENTS, PERSONAL_INFO } from '../data/portfolioData';
import { 
  ArrowLeft, 
  Search, 
  Heart, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Check, 
  Copy, 
  Calendar, 
  Clock, 
  ArrowRight,
  Send
} from 'lucide-react';

interface BlogPageProps {
  selectedPost: BlogPost | null;
  setSelectedPost: (post: BlogPost | null) => void;
  onOpenContact: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  selectedPost,
  setSelectedPost,
  onOpenContact
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  // Like system with localStorage
  const [likes, setLikes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('enes_blog_likes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    const initial: Record<string, number> = {};
    BLOG_POSTS.forEach(p => { initial[p.id] = p.likesCount; });
    return initial;
  });

  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('enes_blog_user_liked');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  // Comments with localStorage
  const [comments, setComments] = useState<Record<string, BlogComment[]>>(() => {
    try {
      const saved = localStorage.getItem('enes_blog_comments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_COMMENTS as Record<string, BlogComment[]>;
  });

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Copy URL toast
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Bookmark state
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('enes_blog_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  const handleLike = (postId: string) => {
    if (hasLiked[postId]) {
      const updatedLikes = { ...likes, [postId]: (likes[postId] || 1) - 1 };
      const updatedHasLiked = { ...hasLiked, [postId]: false };
      setLikes(updatedLikes);
      setHasLiked(updatedHasLiked);
      localStorage.setItem('enes_blog_likes', JSON.stringify(updatedLikes));
      localStorage.setItem('enes_blog_user_liked', JSON.stringify(updatedHasLiked));
    } else {
      const updatedLikes = { ...likes, [postId]: (likes[postId] || 0) + 1 };
      const updatedHasLiked = { ...hasLiked, [postId]: true };
      setLikes(updatedLikes);
      setHasLiked(updatedHasLiked);
      localStorage.setItem('enes_blog_likes', JSON.stringify(updatedLikes));
      localStorage.setItem('enes_blog_user_liked', JSON.stringify(updatedHasLiked));
    }
  };

  const handleBookmark = (postId: string) => {
    const updated = { ...bookmarked, [postId]: !bookmarked[postId] };
    setBookmarked(updated);
    localStorage.setItem('enes_blog_bookmarks', JSON.stringify(updated));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentContent.trim()) return;

    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      postId,
      author: newCommentName.trim(),
      date: 'Bugün',
      content: newCommentContent.trim()
    };

    const currentPostComments = comments[postId] || [];
    const updated = {
      ...comments,
      [postId]: [newComment, ...currentPostComments]
    };
    setComments(updated);
    localStorage.setItem('enes_blog_comments', JSON.stringify(updated));

    setNewCommentName('');
    setNewCommentContent('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  // Categories list
  const categories = ['Tümü', 'Ön Yüz & Mimari', 'TypeScript & Arka Yüz', 'CSS & Tasarım', 'Bulut & DevOps'];

  // Filtered posts
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // ================= VIEW 2: ARTICLE DETAIL VIEW =================
  if (selectedPost) {
    const postLikes = likes[selectedPost.id] ?? selectedPost.likesCount;
    const postHasLiked = !!hasLiked[selectedPost.id];
    const isBookmarked = !!bookmarked[selectedPost.id];
    const postComments = comments[selectedPost.id] || [];

    const relatedPosts = BLOG_POSTS.filter(p => p.id !== selectedPost.id).slice(0, 2);

    return (
      <article className="max-w-3xl mx-auto space-y-12 pt-6">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedPost(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Tüm Makalelere Geri Dön</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBookmark(selectedPost.id)}
              aria-label="Kaydet"
              className={`p-2 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              aria-label="Bağlantıyı Paylaş"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              {copiedLink && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] bg-slate-900 text-white rounded whitespace-nowrap">
                  Kopyalandı!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          {/* Metadata without pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">{selectedPost.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedPost.date}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedPost.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>Yazar: Enes Öztürk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
            {selectedPost.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {selectedPost.excerpt}
          </p>
        </header>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src={selectedPost.coverImage}
            alt={selectedPost.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {/* Intro */}
          <p className="text-lg font-medium text-slate-900 dark:text-slate-200 leading-relaxed">
            {selectedPost.content.intro}
          </p>

          {/* Sections */}
          {selectedPost.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {section.heading}
              </h2>
              <p>{section.text}</p>

              {section.quote && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 italic">
                  "{section.quote}"
                </div>
              )}

              {section.codeSnippet && (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 text-xs font-mono">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>{section.codeSnippet.language}</span>
                    <button
                      onClick={() => handleCopyCode(section.codeSnippet!.code, `code-${idx}`)}
                      className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCodeId === `code-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Kodu Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto leading-relaxed">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 mt-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sonuç ve Değerlendirme
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedPost.content.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="text-slate-400 font-sans mr-2">Etiketler:</span>
          {selectedPost.tags.map((tag, idx) => (
            <span key={idx}>
              #{tag}
              {idx < selectedPost.tags.length - 1 && <span className="text-slate-300 dark:text-slate-700 ml-2">·</span>}
            </span>
          ))}
        </div>

        {/* Interactive Reaction & Share Bar */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLike(selectedPost.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                postHasLiked
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${postHasLiked ? 'fill-current' : ''}`} />
              <span>{postLikes} Beğeni</span>
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {postHasLiked ? 'Bu yazıyı beğendiniz!' : 'Faydalı bulduysanız beğenin'}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Paylaş</span>
          </button>
        </div>

        {/* Author Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-700">
            <img
              src={PERSONAL_INFO.portraitImage}
              alt="Enes Öztürk"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Enes Öztürk
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Kıdemli Full-Stack Mühendis ve UI Mimarı. Modern web mimarileri, bulut altyapıları ve performans optimizasyonu üzerine çalışıyor.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
          >
            İletişim
          </button>
        </div>

        {/* ================= COMMENTS SECTION ================= */}
        <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-slate-500" />
              <span>Yorumlar ({postComments.length})</span>
            </h3>
          </div>

          {/* Add Comment Form */}
          <form
            onSubmit={(e) => handleAddComment(e, selectedPost.id)}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Yorum Bırakın
            </h4>

            {commentSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Yorumunuz başarıyla eklendi!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Adınız Soyadınız *"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Görüşlerinizi veya sorularınızı yazın... *"
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>Yorumu Gönder</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {postComments.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center">
                Henüz yorum yapılmamış. İlk yorumu siz yapın!
              </p>
            ) : (
              postComments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">{c.author}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{c.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {c.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Diğer Makaleler
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  onClick={() => {
                    setSelectedPost(rPost);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group space-y-2"
                >
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {rPost.category} · {rPost.readTime}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {rPost.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>
    );
  }

  // ================= VIEW 1: BLOG POSTS LIST VIEW =================
  return (
    <div className="space-y-12 max-w-4xl mx-auto pt-6">

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">
          <span>Blog & Düşünceler</span>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
          <span>Enes Öztürk</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Teknik Makaleler, Deneyimler ve Notlar
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Modern web geliştirme, yazılım mimarisi, TypeScript ve bulut teknolojileri üzerine kaleme aldığım derinlemesine yazılar.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4 pt-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Makalelerde ara (başlık, teknoloji, anahtar kelime)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Category Tabs (Buttons with click handlers) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Count Information */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
        <span>{filteredPosts.length} makale listeleniyor</span>
        {selectedCategory !== 'Tümü' && (
          <span>Kategori: {selectedCategory}</span>
        )}
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Aramanızla eşleşen makale bulunamadı.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Farklı bir arama terimi deneyebilir veya kategori filtresini sıfırlayabilirsiniz.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tümü');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => {
                setSelectedPost(post);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0E121B] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Clean metadata without pill boxes */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-slate-500 dark:text-slate-400">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx}>
                      #{tag}
                      {idx < 2 && <span className="text-slate-300 dark:text-slate-700 ml-2">/</span>}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 font-semibold text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">
                  <span>Makaleyi Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
