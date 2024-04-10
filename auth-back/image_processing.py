# image_processing.py
import re
import pytesseract
from PIL import Image


def extract_information_from_image(image_filename):
    try:
        extracted_information = pytesseract.image_to_string(Image.open(image_filename))
        run_number = re.search(r'RUN\s+(\S+)', extracted_information)
        if run_number:
            return run_number.group(1)
        else:
            return "Run number not found."
    except Exception as e:
        print(f"Error extracting information: {e}")
        return "Error"