# process_image.py

import sys

def main(image_path):
    # Thực hiện các xử lý với ảnh
    print(f"Processing image at: {image_path}")

if __name__ == "__main__":
    # Nhận tham số từ dòng lệnh
    image_path = sys.argv[1]
    main(image_path)
