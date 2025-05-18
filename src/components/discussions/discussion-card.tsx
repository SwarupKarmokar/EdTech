import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Discussion } from '../../types';
import { formatDate } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(discussion.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex">
        <Avatar className="h-10 w-10">
          <AvatarImage src={discussion.userAvatar} alt={discussion.userName} />
          <AvatarFallback>{discussion.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="ml-3 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{discussion.userName}</h4>
              <p className="text-xs text-gray-500">{formatDate(discussion.createdAt)}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-700">{discussion.message}</p>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center text-xs ${
                liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
              } transition-colors`}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>{likesCount > 0 ? likesCount : ''} Like{likesCount !== 1 ? 's' : ''}</span>
            </button>
            
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="mr-1 h-4 w-4" />
              <span>{discussion.replies.length > 0 ? discussion.replies.length : ''} Reply{discussion.replies.length !== 1 ? 'ies' : 'y'}</span>
            </button>
            
            <button className="flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors">
              <Share2 className="mr-1 h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
          
          {showReplies && discussion.replies.length > 0 && (
            <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
              {discussion.replies.map((reply) => (
                <div key={reply.id} className="flex">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.userAvatar} alt={reply.userName} />
                    <AvatarFallback>{reply.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{reply.userName}</h5>
                        <p className="text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-1">
                      <p className="text-sm text-gray-700">{reply.message}</p>
                    </div>
                    
                    <div className="mt-2">
                      <button className="flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        <span>{reply.likes > 0 ? reply.likes : ''} Like{reply.likes !== 1 ? 's' : ''}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex mt-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Your profile" />
                  <AvatarFallback>YP</AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <textarea
                    placeholder="Write a reply..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                  />
                  <div className="mt-2 flex justify-end">
                    <button className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}