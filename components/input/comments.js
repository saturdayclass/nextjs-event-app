import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from './../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isAddComment, setIsAddComment] = useState();
  const [isFetchingComment, setIsFetchingComment] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored in to database',
      status: 'pending',
    });
    try {
      // send data to API
      const req = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let res;
      if (req.ok) {
        res = await req.json();
      } else {
        throw new Error(res.message || 'something went wrong');
      }
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Your comment was successfully saved',
        status: 'success',
      });
      setIsAddComment(Math.random());
    } catch (err) {
      notificationCtx.showNotification({
        title: 'Error',
        message: err.message || 'Someting went wrong',
        status: 'error',
      });
    }
  }

  useEffect(() => {
    if (showComments) {
      setIsFetchingComment(true);
      fetch(`/api/comments/${eventId}`)
        .then((comment) => comment.json())
        .then((res) => setComments(res.comments));
      setIsFetchingComment(false);
    }
  }, [showComments, isAddComment]);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetchingComment && <p>Loading...</p>}
      {showComments && !isFetchingComment && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
