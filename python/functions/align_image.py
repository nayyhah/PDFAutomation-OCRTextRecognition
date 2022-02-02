from turtle import width
import numpy as np
import imutils
import cv2

def align_img(img, template, maxFeatures=500, keepPercent=0.2, debug=False):
# convert both the input image and template to grayscale
    (height,width) = template.shape[:2]
    image = imutils.resize(img,width,height)
    imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    templateGray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

    orb = cv2.ORB_create()
    
    (kpsA, descsA) = orb.detectAndCompute(imageGray, None)
    (kpsB, descsB) = orb.detectAndCompute(templateGray, None)	
    
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    
    matches = bf.match(descsA, descsB, None)
    
    matches = sorted(matches,key= lambda x : x.distance)
    
    keep = int(len(matches)*keepPercent)
    
    matches = matches[:keep]

    ptsA = np.zeros((len(matches),2),dtype="float")
    ptsB = np.zeros((len(matches),2),dtype="float")
    
    for (i,m) in enumerate(matches):
        ptsA[i] = kpsA[m.queryIdx].pt
        ptsB[i] = kpsB[m.trainIdx].pt
        
    (H,mask) = cv2.findHomography(ptsA,ptsB,method=cv2.RANSAC)
    
    (h,w) = template.shape[:2]

    cv2.imwrite("Image.jpg",img)
    (image_h,image_w) = image.shape[:2]
    (img_h,img_w) = img.shape[:2]

    s = np.array(([img_w/image_w,0,0],[0,img_h/image_h,0],[0,0,1]))
    s_inv = np.linalg.inv(s)
    H_s = np.matmul(H,s_inv)
    aligned = cv2.warpPerspective(img,H_s,(w,h))

    # cv2.imwrite("Image_post.jpg",aligned)
    return(aligned)