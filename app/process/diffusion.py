# process_image.py

import os
import shutil
import sys

def main(image_path):
    # Thực hiện các xử lý với ảnh
    print(f"Processing image at: {image_path}")
    source_path = 'D:\ForChi\do-an-chi\chi-do-an\public\images\\result_example.png'
    destination_path = os.path.join(os.path.dirname(source_path), os.path.basename(image_path).split('.')[0] + '_diffusion.png')
    
    try:
        # Sao chép ảnh
        shutil.copy(source_path, destination_path)
        print(f"Image copied to: {destination_path}")
    except Exception as e:
        print(f"Failed to copy image: {e}")

if __name__ == "__main__":
    # Nhận tham số từ dòng lệnh
    image_path = sys.argv[1]
    main(image_path)