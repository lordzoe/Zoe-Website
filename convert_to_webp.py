import os
from PIL import Image, ExifTags
import subprocess

def get_file_size(file_path):
    return os.path.getsize(file_path) / (1024 * 1024)  # Convert to MB

def convert_image_to_webp(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            # Correct orientation using EXIF metadata if available
            exif = img._getexif()
            if exif:
                for tag, value in exif.items():
                    tag_name = ExifTags.TAGS.get(tag, tag)
                    if tag_name == "Orientation":
                        if value == 3:
                            img = img.rotate(180, expand=True)
                        elif value == 6:
                            img = img.rotate(270, expand=True)
                        elif value == 8:
                            img = img.rotate(90, expand=True)
                        break
            img.save(output_path, 'webp')
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def convert_video_to_webp(video_path, output_path):
    try:
        subprocess.run([
            'ffmpeg', '-i', video_path, 
            '-vf', 'fps=24,scale=640:-1:flags=lanczos',  # Adjust fps and resolution
            '-c:v', 'libwebp', 
            '-lossless', '0',  # Enable lossy compression
            '-compression_level', '6',  # Compression level (0-6, higher is better compression)
            '-q:v', '100',  # Quality level (lower = higher quality, larger size)
            '-loop', '0',  # Infinite loop
            output_path
        ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error converting video {video_path} to WebP: {e}")


def convert_media_to_webp(directory):
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return

    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            file_ext = file.lower().split('.')[-1]

            if file_ext in ['png', 'jpg', 'jpeg']:
                output_path = os.path.splitext(file_path)[0] + '.webp'
                original_size = get_file_size(file_path)
                
                try:
                    convert_image_to_webp(file_path, output_path)
                    new_size = get_file_size(output_path)

                    print(f"Image: {file_path}")
                    print(f"  Original size: {original_size:.2f} MB")
                    print(f"  New size: {new_size:.2f} MB")
                except Exception as e:
                    print(f"Error converting {file_path} to WebP: {e}")

            elif file_ext == 'mp4':
                output_path = os.path.splitext(file_path)[0] + '.webp'
                original_size = get_file_size(file_path)
                
                try:
                    convert_video_to_webp(file_path, output_path)
                    new_size = get_file_size(output_path)

                    print(f"Video: {file_path}")
                    print(f"  Original size: {original_size:.2f} MB")
                    print(f"  New size: {new_size:.2f} MB")
                except Exception as e:
                    print(f"Error converting {file_path} to WebP: {e}")

if __name__ == "__main__":
    directory = input("Enter the directory containing media files: ")
    convert_media_to_webp(directory)