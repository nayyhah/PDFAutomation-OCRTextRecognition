import cv2
import numpy as np

def removeWatermark(img):
	'''
	Removes the watermark present in the image
	@param filename: name of image file
	@type filename: string

	'''
	# Load the image
	# if type(filename) == 'str':
	# 	img = cv2.imread(filename)
	# else:
	# 	img = filename
	
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
		# cv2.imwrite('%s' % filename, bw)
		return img