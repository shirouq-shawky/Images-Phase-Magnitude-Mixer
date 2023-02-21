from flask import Flask, render_template, request, session
import numpy as np
import matplotlib.pyplot as plt
from werkzeug.utils import secure_filename
import os
from ImageClass import Image
import random
import copy

app = Flask(__name__)
app.secret_key = 'Highly secure key // random'

mydict={"img1":0,"img2":0,"img1mag":0,"img2mag":0,"img1phase":0,"img2phase":0}


def merge(img1mode, img2mode, high):

    
    img1_mag = copy.copy(mydict['img1mag'])
    img1_phase = copy.copy(mydict['img1phase'])
    img2_mag = copy.copy(mydict['img2mag'])
    img2_phase = copy.copy(mydict['img2phase'])

    mydict['img1'].crop_pos(session['x1'], session['y1'],
                  session['w1'], session['h1'])

    mydict['img2'].crop_pos(session['x2'], session['y2'],
                  session['w2'], session['h2'])

    
    if high == "true":
        if img1mode == 'mag':
            img1_mag = mydict['img1'].crop_high(img1mode,img1_mag,img1_phase)
            img2_phase = mydict['img2'].crop_high(img2mode,img2_mag,img2_phase)

        elif img1mode == 'phase':
            img1_phase = mydict['img2'].crop_high(img1mode,img1_mag,img1_phase)
            img2_mag = mydict['img2'].crop_high(img2mode,img2_mag,img2_phase)

    else:
        if img1mode == 'mag':
            img1_mag = mydict['img1'].crop_low(img1mode,img1_mag,img1_phase)
            img2_phase = mydict['img2'].crop_low(img2mode,img2_mag,img2_phase)

        elif img1mode == 'phase':
            img1_phase =mydict['img1'].crop_low(img1mode,img1_mag,img1_phase)
            img2_mag = mydict['img2'].crop_low(img2mode,img2_mag,img2_phase)


    if img1mode == 'mag' and img2mode == 'phase':
        img = np.multiply(img1_mag, np.exp(1j * img2_phase))
    elif img2mode == 'mag' and img1mode == 'phase':
        img = np.multiply(img2_mag, np.exp(1j * img1_phase))

    result = np.real(np.fft.ifft2(np.fft.ifftshift(img)))
    rand = random.randint(0, 1000)
    resultPath = f'static/images/results/result{rand}.jpg'
    plt.imsave(resultPath, result, cmap="gray")
    return resultPath

def request_cropdata(choice):
        session['x'+choice] = int(float(request.form['x']))
        session['y'+choice] = int(float(request.form['y']))
        session['w'+choice] = int(float(request.form['w']))
        session['h'+choice] = int(float(request.form['h']))

def request_file(choice):
    image=request.files['image'+choice]
    session['image'+choice+'name'] = secure_filename(image.filename)  # save file
    session['image'+choice+'path'] = os.path.join(
            'static/images', session['image1name'])
    print(session['image1path'])
    image.save(session['image'+choice+'path'])
    imageobj=Image(session['image'+choice+'name'],session['image'+choice+'path'])
    mydict["img"+choice]=imageobj
    fft=imageobj.getfft()
    mag_path, mydict["img"+choice+"mag"] = imageobj.getmag(fft)
    print(type(mydict["img"+choice+"mag"] ))
    phase_path, mydict["img"+choice+"phase"]  = imageobj.getphase(fft)
    return mag_path + "|" + phase_path





@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST' and request.form['requestinfo'] == 'image1':
       

        return request_file("1")

    elif request.method == 'POST' and request.form['requestinfo'] == 'image2':
     

        return request_file("2")

    elif request.method == 'POST' and request.form['requestinfo'] == 'crop1pos':
   
        request_cropdata("1")
        print(session['x1'], session['y1'], session['w1'], session['h1'])

        return("crop pos recieved")

    elif request.method == 'POST' and request.form['requestinfo'] == 'crop2pos':
        
        request_cropdata("2")
        print(session['x2'], session['y2'], session['w2'], session['h2'])

        return("crop pos2 recieved")

    elif request.method == 'POST' and request.form['requestinfo'] == 'merge':
        # all session variables are updated to the latest post request
        print(session['image1name'], session['image2path'],
              session['x1'], session['y2'], session['y1'])
        img1mode = request.form['img1mode']
        img2mode = request.form['img2mode']
        high = request.form['high']
        print(high, type(high))
        # mode is either mag'' or 'phase' __ case sensitive
        # call merge here

        resultnewpath = merge(img1mode, img2mode, high)

        return(resultnewpath)

    else:
        return (render_template('index.html'))


if __name__ == "__main__":
    app.run(debug=True)
