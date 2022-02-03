''' 
1. Take image input from cloudinary
2. Take input from node code
3. Call Parsing Function
4. Upload the result in MongoDB
'''

import pdf2image
import cv2
from parsing import parse
import sys
from PIL import Image
import requests
from io import BytesIO
import numpy as np
import json
from bson.objectid import ObjectId

# pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract'

'''
Dictinary Storing Template Deatils
'''
template_dict = {0 : ["template1.jpg","template1"],1 : ["template2.png","template2"]}

def main():

	'''
	Input taken from backend
	'''
	url = sys.argv[1] #url of image
	# type of applicatino ie, "applications/pdf" or "image/jpg"
	filetype = sys.argv[2]
	# ID of template used by user
	templateID = int(sys.argv[3])

	#convert link into image
	response = requests.get(url)

	if( filetype.find("/pdf") == -1 ):
		'''If input file is PDF, Conversion of pdf into image'''
		image = Image.open(BytesIO(response.content))
	else:
		image = pdf2image.convert_from_bytes(response.content)[0]

		
	filename = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
	# cv2.imwrite("test.jpg",filename)

	#get template details from dictionary
	template = cv2.imread(template_dict[templateID][0])
	className = template_dict[templateID][1]
	

	''' Image Alignment, Watermark Removal, Bounding Box, Text extraction '''
	finaloutput = json.loads(parse(filename, template, className))

	print(finaloutput)



if __name__ == '__main__':
	main()