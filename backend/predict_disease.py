import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

model = load_model('disease_model.h5')

# class names in the same order as train_generator.class_indices
class_names = ['Apple___Scab', 'Apple___Black_rot', 'Tomato___Early_blight', ...]  # Fill all

def predict(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    return class_names[np.argmax(prediction)]

if __name__ == "__main__":
    img_path = sys.argv[1]
    print(predict(img_path))
