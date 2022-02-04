''' 
Program to convert pdf (.pdf) to text (.txt) files:
1. Extract the file name (need to work on it)
2. Convert it to image
3. Remove watermarks (if any)
4. Extract text from the new image
'''

from pdf2image import convert_from_path
from PIL import Image
import numpy as np
import cv2
import pytesseract
from pytesseract import Output
import pandas as pd
import pyparsing as pp

# location of tesseract OCR
pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract'

def removeWatermark(filename=''):
	'''
	Removes the watermark present in the image
	@param filename: name of image file
	@type filename: string

	'''
	# Load the image
	img = cv2.imread(filename)
	
	# Convert the image to grayscale and make a copy
	gr = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	bg = gr.copy()

	# Apply morphological transformations
	for i in range(5):
		kernel2 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,
							(2 * i + 1, 2 * i + 1))
		bg = cv2.morphologyEx(bg, cv2.MORPH_CLOSE, kernel2)
		bg = cv2.morphologyEx(bg, cv2.MORPH_OPEN, kernel2)

		# Subtract the grayscale image from its processed copy
		dif = cv2.subtract(bg, gr)

		# Apply thresholding
		bw = cv2.threshold(dif, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
		dark = cv2.threshold(bg, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

		# Extract pixels in the dark region
		darkpix = gr[np.where(dark > 0)]

		# Threshold the dark region to get the darker pixels inside it
		darkpix = cv2.threshold(darkpix, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
		
		# Paste the extracted darker pixels in the watermark region
		bw[np.where(dark > 0)] = darkpix.T

		# Save the image
		cv2.imwrite('%s' % filename, bw)

	return 0

def extractText(filename=''):
	'''
	Extracts text from an image through OCR
	@param filename: name of image file
	@type filename: string

	'''
	# # Recognize the text as string in image using pytesserct
	# text = str(((pytesseract.image_to_string(Image.open(filename)))))

	# # # Build boxes around the detected words
	# # text = ((pytesseract.image_to_boxes(Image.open(filename))))

	# ''' String formatting '''
	# # remove '-' in the word due to overflow in a single line
	# text = text.replace('-\n', '')	

	# return text

	img = cv2.imread(filename)
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

	custom_config = r'-l eng --oem 1 --psm 6 '
	d = pytesseract.image_to_data(Image.open("page.png"), config=custom_config, output_type=Output.DICT)
	# d = pytesseract.image_to_string(Image.open("page.png"))

	# print(d)
	df = pd.DataFrame(d)

	df1 = df[(df.conf != '-1') & (df.text != ' ') & (df.text != '')]
	pd.set_option('display.max_rows', None)
	pd.set_option('display.max_columns', None)

	sorted_blocks = df1.groupby('block_num').first().sort_values('top').index.tolist()
	for block in sorted_blocks:
		curr = df1[df1['block_num'] == block]
		sel = curr[curr.text.str.len() > 3]
		# sel = curr
		char_w = (sel.width / sel.text.str.len()).mean()
		prev_par, prev_line, prev_left = 0, 0, 0
		text = ''
		for ix, ln in curr.iterrows():
			# add new line when necessary
			if prev_par != ln['par_num']:
				text += '\n'
				prev_par = ln['par_num']
				prev_line = ln['line_num']
				prev_left = 0
			elif prev_line != ln['line_num']:
				text += '\n'
				prev_line = ln['line_num']
				prev_left = 0

			added = 0  # num of spaces that should be added
			if ln['left'] / char_w > prev_left + 1:
				added = int((ln['left']) / char_w) - prev_left
				text += ' ' * added
			text += ln['text'] + ' '
			prev_left += len(ln['text']) + added + 1
		text += '\n'
		
		''' Text extraction from OCR '''
		# Erase existing text in the file
		open('output.txt', 'w').close()

		# Open the file in append mode
		f = open("output.txt", "a")

		# Write the processed text to the file.
		f.write(text)
		f.close()

	return 0


def parseFile(filename=''):
	'''
	Parses the text file to extract relevant information
	@param filename: name of image file
	@type filename: string

	'''
	grammar = {
	 # grammar rules - conditions to match the strings
	 pp.Word("Product")
	}

	# # Parse the file
	parsed_text = grammar.parse_file(filename)
	print(parsed_text.dump())

	return 0


def main():

	''' Get pdf and extract its name '''
	fname = 'Invoice_wa.pdf'

	''' Conversion of pdf into image and ocr reading '''
	# Store all the pages of the PDF in a variable
	pages = convert_from_path(fname, 500)

	for page in pages:
		# Save the page as image in system
		filename = "page.png"
		page.save(filename, 'PNG')

		# Remove the watermark
		removeWatermark(filename)

		''' Text extraction from OCR '''
		text = extractText(filename)

		''' Parse file '''
		parseFile(filename)

if __name__ == '__main__':
	main()