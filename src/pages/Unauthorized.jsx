import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      Unauthorized <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default Unauthorized;
