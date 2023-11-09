import { useState } from "react";
import { useParams } from "react-router-dom";

const PostUpdateForm = () => {
  let { id } = useParams();
  const [post, setPost] = useState();

  return (
    <>
      <div class="modal-dialog modal-dialog-centered">...</div>

      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        ...
      </div>
    </>
  );
};

export default PostUpdateForm;
