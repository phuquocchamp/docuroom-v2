
# DocuRoom 📚💻

**DocuRoom** là một ứng dụng chia sẻ tài liệu trực tuyến với chức năng tim kiếm và chia sẻ tài liệu một cách nhanh chóng và hiệu quả.

## 🌟 Mục tiêu của dự án

Mục tiêu chính của **DocuRoom** là tạo ra một nền tảng cho phép người dùng tham gia vào để:

- 📄 Chia sẻ tài liệu (PDF, Word, PPT) theo dạng peer-to-peer.
- 🔍 Tìm kiếm và truy cập tài liệu do các thành viên khác chia sẻ.
- 🔐 Quản lý và đồng bộ tài liệu một cách hiệu quả.

## 🏛️ Kiến trúc tổng quan


### 1. Frontend 🖥️

Frontend của ứng dụng được phát triển bằng **React** và **TypeScript**, khởi tạo với Vite, cung cấp giao diện người dùng mượt mà và dễ sử dụng. Frontend xử lý điều hướng, quản lý trạng thái và kết nối với backend để cung cấp các tính năng thời gian thực.

### 2. Backend Services 🗄️

Backend của DocuRoom được triển khai theo cấu trúc monolithic gồm các chức năng chính sau:

- **Auth function** 🔐:

  - Đảm nhiệm việc đăng ký, đăng nhập và xác thực người dùng bằng JWT, Google (Oauth2).
  - Quản lý hồ sơ và bảo mật cho người dùng.

- **Document Function** 📂:

  - Xử lý tải lên và chia sẻ tài liệu.
  - Lưu trữ tài liệu trong cơ sở dữ liệu hoặc tích hợp với dịch vụ lưu trữ đám mây.
- **Tag Functional** 💬:

  - Hỗ trợ việc đánh hashtag cho tài liệu giúp cho quá trình tìm kiếm diễn ra nhanh chóng.
- **Rating Service** 📞:

  - Highlight các tài liệu hay và bổ ích.
- **Comment Function** 📂:
   
  - Cho phép người dùng đưa ra các câu hỏi hay feedback về tài liệu. 
## 🗂️ Cấu trúc thư mục

```plaintext
DocuRoom/
├── frontend/                     # Frontend application
├── backend/                      # Backend microservices
├── docker/                       # Infrastructure configurations (Docker, K8s, CI/CD)
├── script/                       # Utility scripts for deployment and setup
├── docs/                         # Documentation
└── README.md                     # Project overview
```


## 🛠️ Công nghệ sử dụng

- **Frontend**: React, TypeScript, React Router, Redux Toolkit/Zustand, Tailwind CSS
- **Backend**:
  - **Spring Boot** cho các dịch vụ Auth, File, ...
- **Database**: PostgreSQL hoặc MongoDB để lưu trữ dữ liệu người dùng và tài liệu.
- **Docker và Kubernetes**: Đóng gói và triển khai từng microservice.
- **CI/CD**: GitHub Actions hoặc Jenkins cho quy trình tích hợp và triển khai tự động.

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

1. **Clone dự án**:

   ```bash
   git clone https://github.com/phuquocchamp/docuroom-application.git
   cd docuroom
   ```
2. **Cài đặt các thành phần của Backend và Frontend**:

   - Chạy lần lược các chương trình trong thư mục `backend` và cài đặt frontend từ thư mục `frontend`.
3. **Chạy Docker Compose**:

   ```bash
   cd docker
   docker-compose up -d
   ```
## 🤝 Đóng góp

Mọi đóng góp và phản hồi đều được hoan nghênh. Vui lòng fork repo này, tạo nhánh mới cho tính năng bạn muốn thêm, và gửi pull request!

---

