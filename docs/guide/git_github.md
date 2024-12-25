## GIT CHEAT SHEET


### 1. **Thiết lập Git**

| Lệnh                                                | Giải thích                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| `git init`                                         | Khởi tạo một repository Git mới trong thư mục hiện tại.    |
| `git clone [URL]`                                  | Tải về repository từ URL và tạo bản sao trên máy cục bộ. |
| `git config --global user.name "Tên của bạn"`   | Thiết lập tên người dùng toàn cầu cho Git.                 |
| `git config --global user.email "Email của bạn"` | Thiết lập email người dùng toàn cầu cho Git.                |

---

### 2. **Các lệnh cơ bản**

| Lệnh                          | Giải thích                                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `git status`                 | Kiểm tra trạng thái của repository, hiển thị file đã thay đổi, staged, hoặc chưa commit.            |
| `git add [file]`             | Thêm file cụ thể vào staging area để chuẩn bị commit.                                                   |
| `git add .`                  | Thêm tất cả file đã thay đổi vào staging area.                                                          |
| `git commit -m "message"`    | Commit các thay đổi trong staging area với thông điệp commit.                                            |
| `git commit -a -m "message"` | Commit tất cả các thay đổi đã chỉnh sửa mà không cần `git add` (không áp dụng với file mới). |
| `git log`                    | Hiển thị lịch sử commit của repository, từ mới nhất đến cũ nhất.                                    |
| `git show [commit-hash]`     | Xem chi tiết một commit cụ thể.                                                                             |
| `git diff`                   | So sánh thay đổi giữa working directory và staged changes.                                                 |

---

### 3. **Làm việc với nhánh**

| Lệnh                             | Giải thích                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `git branch`                    | Liệt kê tất cả các nhánh trong repository, với nhánh hiện tại được đánh dấu sao `*`. |
| `git branch [branch-name]`      | Tạo một nhánh mới.                                                                                 |
| `git checkout [branch-name]`    | Chuyển sang nhánh cụ thể.                                                                          |
| `git checkout -b [branch-name]` | Tạo nhánh mới và chuyển sang nhánh đó.                                                         |
| `git branch -d [branch-name]`   | Xóa nhánh đã hợp nhất vào nhánh khác.                                                         |
| `git branch -D [branch-name]`   | Buộc xóa nhánh (dù chưa hợp nhất).                                                              |
| `git merge [branch-name]`       | Hợp nhất nhánh chỉ định vào nhánh hiện tại.                                                  |
| `git rebase [branch-name]`      | Áp dụng các commit từ nhánh hiện tại lên trên nhánh chỉ định.                             |

---

### 4. **Làm việc với remote repository**

| Lệnh                                    | Giải thích                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| `git remote add origin [URL]`          | Thêm remote repository với tên `origin`.                                   |
| `git remote -v`                        | Hiển thị các URL remote hiện có.                                           |
| `git fetch [remote-name]`              | Tải về các cập nhật từ remote nhưng không merge vào nhánh hiện tại. |
| `git pull [remote-name] [branch-name]` | Lấy về và merge các thay đổi từ remote branch vào nhánh hiện tại.    |
| `git push [remote-name] [branch-name]` | Gửi commit từ nhánh hiện tại lên remote branch.                           |
| `git push -u origin [branch-name]`     | Gửi nhánh mới lên remote và thiết lập theo dõi.                         |

---

### 5. **Làm việc với stash**

| Lệnh                              | Giải thích                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| `git stash`                      | Lưu các thay đổi chưa commit vào stash để làm việc khác mà không commit. |
| `git stash list`                 | Liệt kê các stash hiện có.                                                       |
| `git stash apply`                | Áp dụng lại thay đổi từ stash gần nhất mà không xóa stash.                 |
| `git stash pop`                  | Áp dụng lại thay đổi từ stash gần nhất và xóa stash đó.                   |
| `git stash drop [stash@{index}]` | Xóa stash theo chỉ mục cụ thể.                                                   |

---

### 6. **Kiểm tra và sửa lỗi**

| Lệnh                              | Giải thích                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| `git reset [file]`               | Hủy các thay đổi ở staging area nhưng giữ thay đổi trong thư mục làm việc.   |
| `git reset --hard [commit-hash]` | Hoàn tác toàn bộ repository về trạng thái của commit chỉ định.                 |
| `git revert [commit-hash]`       | Tạo commit đảo ngược (undo) của commit chỉ định mà không thay đổi lịch sử. |
| `git clean -f`                   | Xóa các file không được theo dõi trong thư mục làm việc.                       |
| `git cherry-pick [commit-hash]`  | Áp dụng commit chỉ định vào nhánh hiện tại.                                      |

---

### 7. **Các thao tác nâng cao**

| Lệnh                                  | Giải thích                                                                             |
| -------------------------------------- | ---------------------------------------------------------------------------------------- |
| `git rebase -i [commit-hash]`        | Mở interactive rebase từ một commit cụ thể, cho phép chỉnh sửa lịch sử commit. |
| `git tag [tag-name]`                 | Gắn nhãn (tag) cho commit hiện tại.                                                  |
| `git tag -a [tag-name] -m "message"` | Tạo annotated tag với thông điệp mô tả.                                           |
| `git reflog`                         | Hiển thị lịch sử của các thao tác Git (bao gồm cả thao tác chưa commit).      |

---

### 8. **Quy trình làm việc Git mẫu**

#### 8.0 Một số quy ước khi đặt tên nhánh, commit

Với mỗi công ty, project thì có cách đặt tên nhánh khác nhau. Trong project có một số quy ước để việc đặt tên nhánh cho các dev được nhất quán:

- Với các chứng năng con trong nhánh dev thì bắt đầu bằng ***feature***:
  - feature/add-frontend-library
- Tên của các các nhánh nên viết thường.


- Tên của commit nên bắt đầu bằng một động từ và viết thường.

#### 8.1 Bắt đầu một nhánh mới

Bắt đầu nhánh mới tại nhánh dev

```bash
git checkout dev # chuyển sang nhánh dev
git pull origin develop # update nhanh dev với code mới nhất
git checkout -b feature/new-feature # tạo nhanh mới với chức năng cụ thể
```

#### 8.2 Làm việc, commit, và push

```bash
git add <tên file>
git commit -m "Add new feature"
git push origin feature/new-feature
```

#### 8.3 Tạo Pull Request

- Trên GitHub/GitLab: Tạo PR từ `feature/new-feature` vào `develop`.

#### 8.4 Hợp nhất và xóa nhánh

```bash
git checkout develop
git pull origin develop
git merge feature/new-feature
git push origin develop
git branch -d feature/new-feature
```

---

Các lệnh này sẽ giúp bạn thực hiện các thao tác Git phổ biến, hỗ trợ quản lý mã nguồn một cách hiệu quả.
