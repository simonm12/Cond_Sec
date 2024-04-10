# run_number_extractor.py
from image_processing import extract_information_from_image

if __name__ == "__main__":
    image_filename = "EC.jpg"
    print(f"Processing image: {image_filename}")
    run_number = extract_information_from_image(image_filename)
    if run_number == "Error":
        print("Error extracting information.")
    else:
        print(f"Run Number: {run_number}")