import { useParams } from 'react-router-dom';

const DocDetails = () => {
  const { id } = useParams();  // Lấy id từ URL
  return (
    <div>
      <h1>Details for item {id}</h1>
      {/* Hiển thị thông tin chi tiết của item tại đây */}
    </div>
  );
};

export default DocDetails;
