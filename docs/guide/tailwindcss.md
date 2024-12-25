## TAILWINDCSS CHEAT SHEET

### 1. **Thiết lập cơ bản**

- `container`: Đặt phần tử vào một khung chứa với độ rộng tối đa.
  ```html
  <div class="container mx-auto">...</div>
  ```

  > **Giải thích**: `mx-auto` căn giữa phần tử theo chiều ngang và tự động điều chỉnh độ rộng theo kích thước màn hình.
  >

### 2. **Màu sắc (Colors)**

- `bg-color-{mã_màu}`: Thiết lập màu nền cho phần tử.

  ```html
  <div class="bg-blue-500">...</div>
  ```

  > **Giải thích**: Màu nền `blue-500` sẽ đậm hơn các sắc thái khác, như `blue-100` hoặc `blue-700`.
  >
- `text-color-{mã_màu}`: Đặt màu cho văn bản.

  ```html
  <p class="text-red-600">Văn bản màu đỏ</p>
  ```

  > **Giải thích**: Sử dụng `red-600` để tô màu đỏ cho văn bản.
  >
- `border-color-{mã_màu}`: Đặt màu cho đường viền.

  ```html
  <div class="border border-green-400">...</div>
  ```

  > **Giải thích**: `border-green-400` áp dụng màu xanh lá cây nhạt cho đường viền.
  >

### 3. **Khoảng cách (Spacing)**

- `m-{kích_thước}`: Khoảng cách bên ngoài (margin).

  ```html
  <div class="m-4">...</div>
  ```

  > **Giải thích**: `m-4` áp dụng margin 1rem (16px) cho tất cả các cạnh.
  >
- `p-{kích_thước}`: Khoảng cách bên trong (padding).

  ```html
  <div class="p-2">...</div>
  ```

  > **Giải thích**: `p-2` thêm padding 0.5rem (8px) cho tất cả các cạnh.
  >
- `mx-{kích_thước}`, `my-{kích_thước}`, `px-{kích_thước}`, `py-{kích_thước}`: Margin và padding theo chiều dọc (y) và ngang (x).

  ```html
  <div class="px-6 py-4">...</div>
  ```

  > **Giải thích**: `px-6` thêm padding 1.5rem (24px) cho hai cạnh trái-phải, `py-4` thêm 1rem (16px) cho trên-dưới.
  >

### 4. **Kiểu chữ (Typography)**

- `text-{kích_thước}`: Kích thước chữ.

  ```html
  <p class="text-lg">Chữ lớn</p>
  ```

  > **Giải thích**: `text-lg` áp dụng kích thước chữ lớn (1.125rem).
  >
- `font-{weight}`: Độ đậm của chữ.

  ```html
  <p class="font-bold">Chữ đậm</p>
  ```

  > **Giải thích**: `font-bold` tạo hiệu ứng chữ đậm, `font-light` sẽ tạo hiệu ứng chữ mỏng.
  >
- `text-{alignment}`: Căn lề văn bản.

  ```html
  <p class="text-center">Căn giữa</p>
  ```

  > **Giải thích**: `text-center` căn giữa văn bản, `text-left` căn lề trái và `text-right` căn lề phải.
  >

### 5. **Kích thước (Sizing)**

- `w-{kích_thước}`: Chiều rộng của phần tử.

  ```html
  <div class="w-1/2">Nửa chiều rộng</div>
  ```

  > **Giải thích**: `w-1/2` áp dụng độ rộng 50%, `w-full` là 100%.
  >
- `h-{kích_thước}`: Chiều cao của phần tử.

  ```html
  <div class="h-20">...</div>
  ```

  > **Giải thích**: `h-20` đặt chiều cao là 5rem (80px).
  >

### 6. **Hiển thị (Display)**

- `flex`, `grid`, `inline`, `block`: Điều chỉnh cách hiển thị của phần tử.

  ```html
  <div class="flex">...</div>
  ```

  > **Giải thích**: `flex` kích hoạt Flexbox cho phần tử, `grid` kích hoạt Grid layout.
  >
- `flex-col`, `flex-row`: Đặt hướng hiển thị cho các phần tử con trong Flexbox.

  ```html
  <div class="flex flex-col">...</div>
  ```

  > **Giải thích**: `flex-col` xếp các phần tử con theo chiều dọc, `flex-row` xếp theo chiều ngang.
  >

### 7. **Định vị (Positioning)**

- `absolute`, `relative`, `fixed`, `sticky`: Kiểu định vị phần tử.

  ```html
  <div class="absolute top-0 left-0">...</div>
  ```

  > **Giải thích**: `absolute` định vị phần tử theo một phần tử cha có `position: relative`.
  >
- `top-{kích_thước}`, `left-{kích_thước}`, `right-{kích_thước}`, `bottom-{kích_thước}`: Điều chỉnh vị trí.

  ```html
  <div class="absolute top-4 right-4">...</div>
  ```

  > **Giải thích**: Đặt phần tử ở vị trí cách 1rem từ phía trên và phải.
  >

### 8. **Bo góc (Border Radius)**

- `rounded-{kích_thước}`: Tạo bo góc cho phần tử.
  ```html
  <div class="rounded-lg">...</div>
  ```

  > **Giải thích**: `rounded-lg` áp dụng bo góc lớn, `rounded-full` bo tròn hoàn toàn.
  >

### 9. **Hiệu ứng (Effects)**

- `shadow-{kích_thước}`: Đổ bóng cho phần tử.

  ```html
  <div class="shadow-lg">...</div>
  ```

  > **Giải thích**: `shadow-lg` tạo đổ bóng lớn cho phần tử, có thể dùng `shadow-sm` cho đổ bóng nhỏ.
  >
- `opacity-{mức độ}`: Điều chỉnh độ trong suốt của phần tử.

  ```html
  <div class="opacity-50">...</div>
  ```

  > **Giải thích**: `opacity-50` giảm độ trong suốt của phần tử xuống 50%.
  >
- `hover:{class}`: Áp dụng hiệu ứng khi người dùng di chuột.

  ```html
  <button class="hover:bg-blue-700">Hover me</button>
  ```

  > **Giải thích**: `hover:bg-blue-700` thay đổi màu nền khi di chuột vào.
  >

Đây là tổng hợp các class thường gặp trong Tailwind CSS để bạn áp dụng nhanh chóng vào các dự án của mình.

### 10. **Chuyển động (Animations & Transitions)**

- `transition`, `transition-{property}`, `duration-{thời_gian}`, `ease-{type}`: Thiết lập chuyển động mượt cho phần tử.

  ```html
  <button class="transition duration-500 ease-in-out transform hover:scale-105">
    Nhấn vào
  </button>
  ```

  > **Giải thích**: `transition` giúp chuyển động mượt, `duration-500` thiết lập thời gian 500ms, `ease-in-out` điều chỉnh chuyển động vào-ra mượt, và `hover:scale-105` phóng to phần tử 105% khi di chuột.
  >
- `transform`: Kích hoạt các hiệu ứng chuyển đổi hình dạng cho phần tử.

  ```html
  <div class="transform rotate-45">...</div>
  ```

  > **Giải thích**: `rotate-45` xoay phần tử 45 độ.
  >

### 11. **Bố cục (Layout)**

- `grid-cols-{n}`, `grid-rows-{n}`: Định nghĩa số cột và dòng trong Grid layout.

  ```html
  <div class="grid grid-cols-3">...</div>
  ```

  > **Giải thích**: `grid-cols-3` chia vùng lưới thành ba cột.
  >
- `gap-{kích_thước}`: Khoảng cách giữa các phần tử trong Flex hoặc Grid.

  ```html
  <div class="grid grid-cols-2 gap-4">...</div>
  ```

  > **Giải thích**: `gap-4` tạo khoảng cách giữa các phần tử là 1rem.
  >
- `place-items-{position}`, `place-content-{position}`: Căn chỉnh tất cả các phần tử trong lưới.

  ```html
  <div class="grid place-items-center">...</div>
  ```

  > **Giải thích**: `place-items-center` căn giữa các phần tử trong lưới theo cả trục ngang và dọc.
  >

### 12. **Z-Index và Hiển thị (Z-Index & Visibility)**

- `z-{mức độ}`: Thiết lập thứ tự hiển thị của phần tử.

  ```html
  <div class="z-10">...</div>
  ```

  > **Giải thích**: `z-10` đặt phần tử lên trên các phần tử có `z` nhỏ hơn.
  >
- `hidden`, `block`, `inline-block`, `inline-flex`: Thiết lập chế độ hiển thị.

  ```html
  <div class="hidden md:block">...</div>
  ```

  > **Giải thích**: `hidden` ẩn phần tử, `block` hiển thị phần tử theo dạng khối, `md:block` chỉ hiển thị phần tử trên màn hình kích thước trung bình.
  >

### 13. **Phản hồi (Responsiveness)**

- Tailwind cho phép sử dụng các prefix như `sm:`, `md:`, `lg:`, `xl:`, `2xl:` để điều chỉnh hiển thị trên các kích thước màn hình khác nhau.
  ```html
  <div class="text-sm md:text-lg lg:text-xl">...</div>
  ```

  > **Giải thích**: `text-sm` áp dụng trên màn hình nhỏ, `md:text-lg` áp dụng trên màn hình trung bình và lớn hơn, `lg:text-xl` cho màn hình lớn.
  >

### 14. **Độ Trong Suốt và Nền (Opacity & Backgrounds)**

- `bg-opacity-{mức độ}`: Điều chỉnh độ trong suốt của màu nền.

  ```html
  <div class="bg-blue-500 bg-opacity-50">...</div>
  ```

  > **Giải thích**: `bg-opacity-50` tạo nền màu xanh nhạt với độ trong suốt 50%.
  >
- `bg-gradient-to-{side}` và `from-{màu}`, `via-{màu}`, `to-{màu}`: Tạo nền gradient.

  ```html
  <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">...</div>
  ```

  > **Giải thích**: `bg-gradient-to-r` tạo gradient từ trái sang phải, bắt đầu với màu xanh và chuyển sang màu tím rồi đỏ.
  >

### 15. **Đường Viền (Borders)**

- `border-{kích_thước}`: Thiết lập độ dày của đường viền.

  ```html
  <div class="border-2">...</div>
  ```

  > **Giải thích**: `border-2` tạo đường viền dày 2px.
  >
- `rounded-t-{kích_thước}`, `rounded-b-{kích_thước}`, `rounded-l-{kích_thước}`, `rounded-r-{kích_thước}`: Bo góc chỉ một phía.

  ```html
  <div class="rounded-t-lg">...</div>
  ```

  > **Giải thích**: `rounded-t-lg` bo góc trên của phần tử lớn.
  >

### 16. **Khung (Outline)**

- `outline-{kích_thước}`, `outline-{color}`, `outline-none`: Thiết lập khung cho phần tử (thường dùng cho các phần tử tương tác).
  ```html
  <button class="outline-none focus:outline-blue-500">...</button>
  ```

  > **Giải thích**: `outline-none` bỏ viền mặc định khi nhấn vào phần tử và `focus:outline-blue-500` chỉ hiển thị viền màu xanh khi có tiêu điểm.
  >

### 17. **Đổ Bóng Văn Bản (Text Shadow)**

- Tailwind không hỗ trợ đổ bóng văn bản mặc định, nhưng bạn có thể mở rộng tùy chỉnh qua `@apply`.
  ```css
  .text-shadow {
    @apply shadow-lg;
  }
  ```

  > **Giải thích**: Tạo một lớp đổ bóng riêng cho văn bản, áp dụng bằng cách thêm `class="text-shadow"` vào phần tử.
  >

### 18. **Bộ Lọc (Filters)**

- `filter`, `blur-{mức_độ}`, `brightness-{mức_độ}`, `contrast-{mức_độ}`, `grayscale`, `invert`, `sepia`: Thêm hiệu ứng bộ lọc vào phần tử.
  ```html
  <img src="image.jpg" class="filter blur-sm brightness-75"> 
  ```

  > **Giải thích**: `filter` kích hoạt hiệu ứng lọc, `blur-sm` làm mờ ảnh một chút, và `brightness-75` giảm độ sáng xuống 75%.
  >

### 19. **Dùng Biến Tailwind (CSS Variables)**

   Tailwind CSS hỗ trợ biến CSS cho một số phần tử như kích thước hay màu sắc, giúp bạn tuỳ chỉnh nhanh các thành phần UI.

```html
   <div style="--tw-bg-opacity: 0.5" class="bg-blue-500">...</div>
```

> **Giải thích**: Sử dụng `--tw-bg-opacity: 0.5` để điều chỉnh độ trong suốt của nền.

Đây là một số class Tailwind CSS nâng cao giúp bạn mở rộng và tối ưu hóa thiết kế UI nhanh chóng và hiệu quả.
